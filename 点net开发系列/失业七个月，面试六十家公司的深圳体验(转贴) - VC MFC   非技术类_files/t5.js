try { document.domain = "csdn.net" } catch (ex) { };

function bodyCopy() {
	var username = getCookie("UserName");
	if (!username || (/^guest$/i).test(username)) {
		showWindow({ html: "<a href='http://passport.csdn.net/UserLogin.aspx'>登录</a>",
			width: 680, height: 250, title: '请登录后再复制。'
		});
		return false;
	}
}

if (!window.attachEvent && window.addEventListener) {
	window.attachEvent = document.attachEvent = function(en, func, cancelBubble) {
		var cb = cancelBubble ? true : false;
		this.addEventListener(en.toLowerCase().substr(2), func, cb);
	};
	window.detachEvent = document.detachEvent = function(en, func, cancelBubble) {
		var cb = cancelBubble ? true : false;
		this.removeEventListener(en.toLowerCase().substr(2), func, cb);
	};
}

function $(id) { return document.getElementById(id); }

function GetScrollXY() {
	var x = 0, y = 0
	if (document.documentElement.scrollTop) {
		x = document.documentElement.scrollLeft;
		y = document.documentElement.scrollTop;
	}
	else {
		x = document.body.scrollLeft;
		y = document.body.scrollTop;
	}
	return { x: x, y: y }
}

function getEventXY(e) {
	var posx = 0, posy = 0;
	if (e == null) e = window.event;
	if (e.pageX || e.pageY) {
		posx = e.pageX; posy = e.pageY;
	}
	else if (e.clientX || e.clientY) {
		posx = e.clientX + GetScrollXY().x;
		posy = e.clientY + GetScrollXY().y;
	}
	return { "x": posx, "y": posy };
}

function realOffset(o) {
	if (!o) return null; var e = o, x = y = l = t = 0;
	do { l += e.offsetLeft || 0; t += e.offsetTop || 0; e = e.offsetParent; } while (e);
	do { x += o.scrollLeft || 0; y += o.scrollTop || 0; o = o.parentNode; } while (o);
	var xy = GetScrollXY();
	return { "x": l - x + xy.x, "y": t - y + xy.y };
};

function getCookie(name) {
	var re = new RegExp("(\;|^)[^;]*(" + name + ")\=([^;]*)(;|$)");
	var match = re.exec(document.cookie);
	return match != null ? unescape(match[3]) : null;
}

function updateReplyItems() {
	if (!window.reply_items) {
		var imgs = document.getElementsByTagName("img");
		window.reply_items = {};
		for (var i = 0; i < imgs.length; i++) {
			var match = (/^grade\s+(\w+)$/i).exec(imgs[i].className);
			if (match) {
				var table = imgs[i].parentNode;
				while (table && !(/^table$/i).test(table.tagName))
					table = table.parentNode;
				if (!table) continue;
				grade = match[1];
				var as = table.getElementsByTagName("a");
				var username = "";
				for (var j = 0; j < as.length; j++) {
					match = (/^http\:\/\/hi\.csdn\.net\/(\w+)\/?$/i).exec(as[j].href);
					if (match) {
						username = match[1].toLowerCase();
						break;
					}
				}
				var dfns = table.getElementsByTagName("dfn");
				var point = 0;
				var layer = 0;
				for (j = 0; j < dfns.length; j++) {
					var p = /#(\d+)楼\s+得分：(\d+)/.exec(dfns[j].innerHTML);
					if (p) {
						layer = parseInt(p[1]);
						point = parseInt(p[2]);
						break;
					}
				}

				var ls = table.getElementsByTagName("li");
				var honor = null;
				for (j = 0; j < ls.length; j++) {
					if (ls[j].getAttribute("name") == "honor") {
						honor = ls[j];
						break;
					}
				}
				var tds = table.getElementsByTagName("td");
				var body = null;
				var replyId = "";
				var isdeleted = false;
				for (j = 0; j < tds.length; j++) {
					if (/^r?body/.test(tds[j].getAttribute("csdnid"))) {
						body = tds[j];
						var match = /(\d+)/.exec(tds[j].getAttribute("csdnid"));
						if (match) replyId = match[1];
					} else if (/^rmodify_/.test(tds[j].getAttribute("csdnid"))) {
						isdeleted = /删除/.test(tds[j].innerHTML);
					}
				}
				var divs = table.getElementsByTagName("div");
				var recommend = null;
				for (j = 0; j < divs.length; j++) {
					if (divs[j].className == "rt") {
						recommend = divs[j];
						break;
					}
				}
				reply_items[layer] = {
					"grade": grade
					, "table": table
					, "body": body
					, "username": username
					, "point": point
					, "honor": honor
					, "recommend": recommend
					, "replyId": replyId
					, "isdeleted": isdeleted
				};
			}
		}
	}
}

function ReplyBoxFocus() {
	var replyframe = $("replyframe");
	if (replyframe)
		replyframe.contentWindow.document.getElementById("tb_ReplyBody___Editor").focus();
}

function changeViewMode(select) {
	updateReplyItems();
	var myname = ("" + getCookie("UserName")).toLowerCase();
	for (var i = 0 in reply_items) {
		if (!reply_items[i].replyId) continue; // 非回复
		reply_items[i].table.className = "mframe"; // 去掉隐藏属性
		switch (select.value) {
			case "0": // 全部显示
				reply_items[i].table.style.display = "";
				break;
			case "1": // 星级回复
				reply_items[i].table.style.display = !(/^user/i).test(reply_items[i].grade) ? "" : "none";
				break;
			//case "2": // 楼主回复 
			//	reply_items[i].table.style.display = xxx == reply_items[i].username ? "" : "none"; 
			//	break; 
			case "3": // 得分回复
				reply_items[i].table.style.display = reply_items[i].point > 0 ? "" : "none";
				break;
			case "4": // 自己回复
				reply_items[i].table.style.display = myname == reply_items[i].username ? "" : "none";
				break;
			case "5": // 隐藏删除
				reply_items[i].table.style.display = reply_items[i].isdeleted ? "none" : "";
				break;
		}
	}
}

function displayVisitor() {
	var username = getCookie("UserName");
	if (!username || (/^guest$/i).test(username)) username = "游客";
	if ($("exit")) $("exit").style.display = username == "游客" ? "none" : "";
	if ($("login")) $("login").style.display = username == "游客" ? "" : "none";
	if ($("vName")) $("vName").innerHTML = username;
}

function Search(ev, type) {
	var element = ev.srcElement || ev.target;
	if (!element.parentNode) return;
	var inputs = element.parentNode.getElementsByTagName("input");
	var url = "";
	for (var i = 0; i < inputs.length; i++) {
		if ((/^key$/i).test(inputs[i].name)) {
			url = inputs[i].value;
			break;
		}
	}
	var searchPage;
	if (type == "advanced") searchPage = "http://so.csdn.net/advanced_search.aspx";
	else searchPage = "http://so.csdn.net/bbsSearchResult.aspx";
	if ((url == "") || (url == "这里也许就有您要的答案")) {
		if (type == "advanced")
			url = "http://so.csdn.net/advanced_search.aspx";
		else
			url = "http://so.csdn.net/bbs.aspx";
	}
	else if (encodeURIComponent) url = searchPage + "?q=" + encodeURIComponent(url);
	else url = searchPage + "?q=" + escape(url);
	if (document.all && typeof (document.all) == "object") {
		var a = document.createElement("A");
		a.target = "_blank";
		a.href = url;
		document.body.appendChild(a);
		a.click();
		setTimeout(function() { a.parentNode.removeChild(a); }, 50);
	}
	else window.open(url, "_blank");
}

function GoKeyDown(ev) { if (ev.keyCode == 13) Search(ev, ""); }

window._stopMouseOver = function(e) { (window.event || e).cancelBubble = true; }

function showMenu(event, panel, modifyUrl, deleteUrl) {
	if (panel) {
		_stopMouseOver(event);
		var bt = event.srcElement || event.target;
		panel.style.display = "block";
		panel.style.left = realOffset(bt).x - 5 + "px";
		panel.style.top = realOffset(bt).y + bt.offsetHeight - 8 + "px";

		var btns = panel.getElementsByTagName("a");
		if (btns.length > 0 && modifyUrl) {
			btns[0].onclick = function() {
				try {
					showWindow({ url: modifyUrl, width: 660, height: 645, title: '修改' });
				} catch (ex) { }
				return false;
			};
		}
		if (btns.length > 1 && deleteUrl) {
			btns[1].onclick = function() {
				try {
					showWindow({ url: deleteUrl, width: 460, height: 325, title: '删除' });
				} catch (ex) { }
				return false;
			};
		}
	}
}

function addToWZ() {
	u = location.href;
	t = document.title;
	c = '' + (window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection() : document.selection.createRange().text);
	var link = 'http://wz.csdn.net/storeit.aspx?noui=yes&jump=close&u=' + escape(u) + '&t=' + escape(t) + '&c=' + escape(c).replace(/ /g, '+');
	showWindow({ url: link, width: 650, height: 400, title: '放进我的网摘' });
}

function getElementText(element) {
	var result = "";
	for (var i = 0; i < element.childNodes.length; i++) {
		switch (element.childNodes[i].nodeType) {
			case 1:
				result += element.childNodes[i].tagName == "BR" ? "\r\n" : getElementText(element.childNodes[i]);
				break;
			case 3:
				result += element.childNodes[i].nodeValue.replace(/$\s+|\s+$/g, "");
				break;
		}
	}
	return result;
}

//引用
function Quote(layer) {
	var replyframe = $("replyframe");
	if (!replyframe) return;
	var editor = replyframe.contentWindow.document.getElementById("tb_ReplyBody___Editor");
	updateReplyItems();
	var text = reply_items[layer].body.innerHTML;
	text = text.replace(/<pre>[\s\S]*?<\/pre>/g, function($0) {
		return $0.replace(/ /g, "&nbsp;");
	});
	text = text.replace(/<\/dt>/ig, "\r\n").replace(/\s*<br\s*\/?>\s*/ig, "\r\n")
		.replace(/<[^>]+>/g, "").replace(/&(lt|gt|quoted|nbsp);/ig, function($0, $1) { 
			return { "lt": "<", "gt": ">", "quoted": "\"", "nbsp": " "}[$1.toLowerCase()];
		});
	text = text.replace(/^(\s+\r?\n)+/, "").replace(/^([\s\S]{200})([\s\S]*)$/, "$1……").replace(/\s+$/, "");
	editor.value = "[Quote=" + (layer > 0 ? "\u5F15\u7528 " + layer + " \u697C " : "\u5F15\u7528\u697C\u4E3B ") +
		reply_items[layer].username + " \u7684\u56DE\u590D:]\r\n" + text + "\r\n[/Quote]";
	window.location.href = "#replyachor";
	editor.focus();
}

function getUrl(tinfo, content, replyid) {
	var url = $("hf_cardUrl").value.replace(/UserCard.ashx\?user=/i, "report.ashx");
	url += "?s=" + encodeURI(content) + "&sid=" + tinfo.sid + "&pdate=" + tinfo.pdate + "&tid=" + tinfo.tid;
	if (replyid) url += "&rid=" + replyid;
	return url;
}

function report(layer) {
	var url = $("a_head_recreate").href.replace(/BuildTopic.aspx.*$/i, "Forum/Report.aspx");
	url += '?topicId=' + tinfo.tid + '&postDate=' + tinfo.pdate;
	var from = ("" + document.location).replace(/(\?.*)$/, "");
	if (layer <= 0) {
		content = document.title;
		dialogTitle = "举报";
		content = content.replace(/<img\s+src="(.*?)".*?>/, "$1").replace(/<.*?>/ig, "").replace(/^([\s\S]{1,100})[\s\S]*$/g, "$1").replace(/^\s+|\s$/g, "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	} else {
		updateReplyItems();
		url += '&type=1&replyId=' + reply_items[layer].replyId;
		from += "#r_" + reply_items[layer].replyId;
		content = getElementText(reply_items[layer].body);
		dialogTitle = "举报";
		content = content.replace(/<img\s+src="(.*?)".*?>/, "$1").replace(/<.*?>/ig, "").replace(/^([\s\S]{1,100})[\s\S]*$/g, "$1").replace(/^\s+|\s$/g, "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	}
	url += '&url=' + encodeURIComponent(from);
	url += '&content=' + encodeURIComponent(content);
	try {
		showWindow({ url: url, width: 620, height: 400, title: dialogTitle });
	} catch (ex) {
		alert(ex.message);
	}
}

function modifyWindow(opts) {
	if (opts['url']) {
		currentDialog.div_html.innerHTML = "";
		currentDialog.iframe = document.createElement("iframe");
		currentDialog.iframe.width = (opts.width - currentDialog.edgeWidth * 2) + "px";
		currentDialog.iframe.height = (opts.height - 40 - 25) + "px";
		currentDialog.iframe.style.margin = "0";
		currentDialog.iframe.frameBorder = "0";
		currentDialog.iframe.src = opts.url;
		currentDialog.div_html.appendChild(currentDialog.iframe);
	}
	if (opts['html']) {
		currentDialog.div_html.innerHTML = opts['html'];
	}
}

function SendReport(url) {
	modifyWindow({ html: "<br/><br/><br/><br/><div style='text-align:center'><b>正在发送消息...</b><br />请不要关闭此窗口</div>" });
	callScript(url);
}

function reportCallBack(info) {
	modifyWindow({ html: "<br/><br/><br/><br/><div style='text-align:center'><b>" + info + "</b><br />点击右上角的关闭按钮关闭此窗口</div>" });
}

function estimateCallback(result) {
	if (result.error) {
		alert(result.error);
		return;
	}
	if (!window.currEstimateElement) return;
	var sender = window.currEstimateElement;
	for (var j = 0; j < sender.parentNode.childNodes.length; j++) {
		var node = sender.parentNode.childNodes[j];
		if (/^span$/i.test(node.tagName)) {
			node.title = node.title.replace(/\d+/, result.count);
			node.innerHTML = result.count;
			break;
		}
	}
	window.currEstimateElement.onclick = function() { alert("您已经评价过了。"); };
	window.currEstimateElement = null;
	alert("评价成功。");
}

function Estimate(sender, url) {
	window.currEstimateElement = sender;
	callScript(url + "&fcb=estimateCallback&_t=" + Math.random(), null, function() {
		alert("评价失败。");
	});
}

//关闭对话框
function closeDialog(needRefresh) {
	closeWindow();
	if (needRefresh) {
		var url = location.href;
		if ((/\?/g).test(url))
			url = url.replace(/\?.*$/g, ("?" + Math.random()).replace(/\./g, ""));
		else url += ("?" + Math.random()).replace(/\./g, "");
		location.href = url;
	}
}

/// <summary>
/// 添加事件
/// </summary>
/// <param name="target">载体</param>
/// <param name="type">事件类型</param>
/// <param name="func">事件函数</param>
function addEventHandler(target, type, func) {
	if (target.addEventListener)
		target.addEventListener(type, func, false);
	else if (target.attachEvent)
		target.attachEvent("on" + type, func);
	else target["on" + type] = func;
}

/// <summary>
/// 移除事件
/// </summary>
/// <param name="target">载体</param>
/// <param name="type">事件类型</param>
/// <param name="func">事件函数</param>
function removeEventHandler(target, type, func) {
	if (target.removeEventListener)
		target.removeEventListener(type, func, false);
	else if (target.detachEvent)
		target.detachEvent("on" + type, func);
	else delete target["on" + type];
}

/// <summary>
/// 获得元素的绝对坐标
/// </summary>
/// <param name="element">HTML元素</param>
function absolutePoint(element) {
	var result = { x: element.offsetLeft, y: element.offsetTop };
	element = element.offsetParent;
	while (element) {
		result.x += element.offsetLeft;
		result.y += element.offsetTop;
		element = element.offsetParent;
	}
	return result;
}

/// <summary>
/// 调用脚本
/// </summary>
/// <param name="url">脚本地址</param>
/// <param name="loaded">载入后调用的方法</param>
/// <param name="loaded">异常后调用的方法</param>
/// <param name="charset">脚本字节编码</param>
function callScript(url, loaded, error, charset) {
	var script = document.createElement("script");
	script.type = "text/javascript";
	if (typeof charset == "string") script.charset = charset;
	script.src = url;
	script.onreadystatechange = function() {
		switch (this.readyState) {
			case "complete":
			case "loaded":
				if (typeof loaded == "function") loaded();
				if (script.parentNode) script.parentNode.removeChild(script);
				break;
		}
	}
	script.onload = function() {
		if (typeof loaded == "function") loaded();
		if (script.parentNode) script.parentNode.removeChild(script);
	}
	script.onerror = function() {
		if (typeof error == "function") error();
		if (script.parentNode) script.parentNode.removeChild(script);
	}
	if (window.opera)
		document.getElementsByTagName("HEAD")[0].appendChild(script);
	else document.body.parentNode.appendChild(script);
}

function requestHttp(url, type, data, loaded, error) {
	if (typeof loaded != "function") return;
	var xmlhttp = typeof XMLHttpRequest == "undefined" ?
	    new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4)
			if (xmlhttp.status == 200)
			loaded(xmlhttp);
		else if (parseFloat(xmlhttp.status) > 300 && typeof error == "function")
			error(xmlhttp);
	}
	xmlhttp.open(typeof type == "string" ? type : "GET", url, true);
	if (typeof data == "string") {
		xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xmlhttp.setRequestHeader("Content-Length", data.length);
	}
	xmlhttp.send(data);
}

/// <summary>
/// 获得HTML元素当前的样式
/// </summary>
/// <param name="element">HTML元素</param>
function currentStyle(element) {
	return element.currentStyle || document.defaultView.getComputedStyle(element, null);
}

/// <summary>
/// 构造拖拽引擎
/// </summary>
/// <param name="target">拖拽元素</param>
/// <param name="drag">移动元素</param>
/// <parem name="bounds">拖拽范围 left: 左边界 right: 右边界 top: 上边界 bottom: 下边界 (-1 表示不限制)
function DragEngine(target, drag, bounds) {
	this.target = target;
	this.drag = typeof drag != "undefined" ? drag : traget;
	this.drag.style.position = "absolute";
	this.downPoint = {}; // 鼠标按下的坐标
	this.offset = {
		x: parseInt(currentStyle(this.drag).marginLeft) || 0,
		y: parseInt(currentStyle(this.drag).marginTop) || 0
	};
	this.bounds = typeof bounds != "undefined" ? bounds : { left: 0, top: 0, right: -1, bottom: -1 };
	var dragEngine = this;
	this.documentMousemove = function(e) {
		if (window.getSelection)
			getSelection().removeAllRanges();
		else if (document.selection && document.selection.empty)
			document.selection.empty();
		var left = e.clientX - dragEngine.downPoint.x + dragEngine.offset.x;
		var top = e.clientY - dragEngine.downPoint.y + dragEngine.offset.y;
		if (parseInt(dragEngine.bounds.right) >= 0)
			left = Math.min(left, dragEngine.bounds.right - dragEngine.drag.offsetWidth);
		if (parseInt(dragEngine.bounds.bottom) >= 0)
			top = Math.min(top, dragEngine.bounds.bottom - dragEngine.drag.offsetHeight);
		if (parseInt(dragEngine.bounds.left) >= 0)
			left = Math.max(left, dragEngine.bounds.left);
		if (parseInt(dragEngine.bounds.top) >= 0)
			top = Math.max(top, dragEngine.bounds.top);
		dragEngine.drag.style.left = left + "px";
		dragEngine.drag.style.top = top + "px";
		if (typeof dragEngine.onmove == "function") dragEngine.onmove(dragEngine);
	};
	this.documentMouseup = function(e) {
		var iframes = dragEngine.drag.getElementsByTagName("iframe");
		for (var i = 0; i < iframes.length; i++) {
			iframes[i].style.display = "";
			//removeEventHandler(iframes[i], "mouseover", dragEngine.documentMouseup);
		}
		removeEventHandler(document, "mousemove", dragEngine.documentMousemove);
		removeEventHandler(document, "mouseup", dragEngine.documentMouseup);
		removeEventHandler(dragEngine.target, "losecapture", dragEngine.documentMouseup);
		if (dragEngine.target.releaseCapture) dragEngine.target.releaseCapture();
		removeEventHandler(window, "blur", dragEngine.documentMouseup);
		if (typeof dragEngine.onstop == "function") dragEngine.onstop(dragEngine);
	};
	this.targetMousedown = function(e) {
		// which: 1 == left; 2 == middle; 3 == right
		if (!e.which && e.button)
			e.which = e.button & 1 ? 1 : (e.button & 2 ? 3 : (e.button & 4 ? 2 : 0));
		if (e.which != 1) return;
		var iframes = dragEngine.drag.getElementsByTagName("iframe");
		for (var i = 0; i < iframes.length; i++) {
			iframes[i].style.display = "none";
			//addEventHandler(iframes[i], "mouseover", dragEngine.documentMouseup);
		}

		dragEngine.downPoint.x = e.clientX - dragEngine.drag.offsetLeft;
		dragEngine.downPoint.y = e.clientY - dragEngine.drag.offsetTop;
		addEventHandler(document, "mousemove", dragEngine.documentMousemove);
		addEventHandler(document, "mouseup", dragEngine.documentMouseup);
		addEventHandler(dragEngine.target, "losecapture", dragEngine.documentMouseup);
		if (dragEngine.target.setCapture) dragEngine.target.setCapture();
		addEventHandler(window, "blur", dragEngine.documentMouseup);
		if (e.preventDefault) e.preventDefault();
		if (typeof dragEngine.onstart == "function") dragEngine.onstart(dragEngine);
	};
	addEventHandler(this.target, "mousedown", this.targetMousedown);
}

/// <summary>
/// 释放拖拽引擎
/// </summary>
DragEngine.prototype.dispose = function() {
	removeEventHandler(this.target, "mousedown", this.targetMousedown);
}

/*//
标题:对话框
设计:ZswangY37
版权:CSDN.NET
版本:2008103101
//*/

var globalZIndex = 1001; // 对话框层次
var imagePath = "/u/ui/styles/default/dialog/"; // 图片路径

/// <summary>
/// 获取文档的边界信息
/// </summary>
function getDocumentBounds() {
	if (document.documentElement && document.compatMode == "CSS1Compat") {
		return {
			st: document.documentElement.scrollTop,
			sl: document.documentElement.scrollLeft,
			sw: document.documentElement.scrollWidth,
			sh: document.documentElement.scrollHeight,
			cw: document.documentElement.clientWidth,
			ch: document.documentElement.clientHeight
		}
	} else if (document.body) {
		return {
			st: document.body.scrollTop,
			sl: document.body.scrollLeft,
			sw: document.body.scrollWidth,
			sh: document.body.scrollHeight,
			cw: document.body.clientWidth,
			ch: document.body.clientHeight
		}
	}
}

function CsdnDialog(title, left, top, width, height, closefree, fixup) {
	this.closefree = closefree;
	this.div_dialog = document.createElement("div");
	this.div_dialog.style.textAlign = "left";
	this.div_dialog.style.display = "none";
	this.div_dialog.style.position = "absolute";
	this.div_dialog.style.borderStyle = "none";
	this.div_dialog.style.borderWidth = "0px";
	this.div_dialog.style.zIndex = globalZIndex;
	this.edgeWidth = 25; // 边宽
	document.body.appendChild(this.div_dialog);

	this.table_dialog = document.createElement("table");
	this.table_dialog.cellPadding = "0px";
	this.table_dialog.cellSpacing = "0px";
	this.div_dialog.appendChild(this.table_dialog);

	this.tr_top = this.table_dialog.insertRow(-1);
	this.tr_top.style.height = "40px";

	this.tr_middle = this.table_dialog.insertRow(-1);

	this.tr_bottom = this.table_dialog.insertRow(-1);
	this.tr_bottom.style.height = "25px";

	this.td_top_left = this.tr_top.insertCell(-1);
	this.td_top_left.style.backgroundImage = "url(" + imagePath + "corner.png)";
	this.td_top_left.style.backgroundPosition = "0px -100px";
	this.td_top_left.style.backgroundRepeat = "no-repeat";
	this.td_top_left.style.width = this.edgeWidth + "px";

	/*
	this.img_icon = document.createElement("img");
	this.img_icon.src = imagePath + "icon.gif";
	this.img_icon.style.marginTop = "10px";
	this.img_icon.style.marginLeft = "17px";
	this.td_top_left.appendChild(this.img_icon);
	*/

	this.td_top_center = this.tr_top.insertCell(-1);

	this.td_top_center.style.backgroundImage = "url(" + imagePath + "vertical.png)";
	this.td_top_center.style.width = (width - this.edgeWidth * 2) + "px";
	this.td_top_center.style.backgroundPosition = "0px -100px";
	this.td_top_center.style.backgroundRepeat = "repeat-x";

	this.div_title = document.createElement("div");
	this.div_title.style.styleFloat = "left";
	this.div_title.style.cssFloat = "left";
	this.div_title.style.fontWeight = "bold";

	if (!fixup) {
		this.div_title.style.cursor = "move";
		this.dragEngine = new DragEngine(this.div_title, this.div_dialog);
	}
	this.div_title.style.height = "29px";
	this.div_title.style.verticalAlign = "middle";
	this.div_title.style.lineHeight = "29px";
	this.div_title.style.marginTop = "11px";
	this.div_title.dialog = this;
	this.td_top_center.appendChild(this.div_title);

	this.div_close = document.createElement("div");
	this.div_close.style.styleFloat = "right";
	this.div_close.style.cssFloat = "right";
	this.td_top_center.appendChild(this.div_close);

	this.img_close = document.createElement("img");
	this.img_close.src = imagePath + "blank.gif";
	this.img_close.style.backgroundImage = "url(" + imagePath + "closebtn.gif)";
	this.img_close.style.width = "44px";
	this.img_close.style.height = "19px";
	this.img_close.style.backgroundRepeat = "no-repeat";
	this.img_close.style.marginTop = "12px";
	try {
		this.img_close.style.cursor = "pointer";
	}
	catch (e) {
		this.img_close.style.cursor = "hand";
	}
	this.img_close.onmouseover = function() {
		this.hot = true;
		this.doChange();
	}
	this.img_close.onmouseout = function() {
		this.down = false;
		this.hot = false;
		this.doChange();
	}
	this.img_close.onmousedown = function() {
		this.down = true;
		this.doChange();
	}
	this.img_close.onmouseup = function() {
		this.down = false;
		this.doChange();
	}
	this.img_close.onclick = function() {
		if (!this.dialog) return;
		this.dialog.close();
	}
	this.img_close.dialog = this;
	this.img_close.hot = false;
	this.img_close.down = false;
	this.img_close.doChange = function() {
		if (this.disabled)
			this.style.backgroundPosition = "-132px 0px";
		else if (this.down)
			this.style.backgroundPosition = "-88px 0px";
		else if (this.hot)
			this.style.backgroundPosition = "-44px 0px";
		else this.style.backgroundPosition = "0px 0px";
	}
	this.div_close.appendChild(this.img_close)

	this.td_top_right = this.tr_top.insertCell(-1);
	this.td_top_right.style.backgroundImage = "url(" + imagePath + "corner.png)";
	this.td_top_right.style.backgroundRepeat = "no-repeat";
	this.td_top_right.style.backgroundPosition = "-75px -100px";
	this.td_top_right.style.width = this.edgeWidth + "px";

	this.td_middle_left = this.tr_middle.insertCell(-1);
	this.td_middle_left.style.backgroundImage = "url(" + imagePath + "horizontal.png)";
	this.td_middle_left.style.backgroundPosition = "-100px 0px";
	this.td_middle_left.style.backgroundRepeat = "repeat-y";

	this.td_middle_center = this.tr_middle.insertCell(-1);
	this.td_middle_center.style.backgroundColor = "White";

	this.div_html = document.createElement("div");
	this.td_middle_center.appendChild(this.div_html);

	this.td_middle_right = this.tr_middle.insertCell(-1);
	this.td_middle_right.style.backgroundImage = "url(" + imagePath + "horizontal.png)";
	this.td_middle_right.style.backgroundPosition = "-175px 0px";
	this.td_middle_right.style.backgroundRepeat = "repeat-y";

	this.td_bottom_left = this.tr_bottom.insertCell(-1);
	this.td_bottom_left.style.backgroundImage = "url(" + imagePath + "corner.png)";
	this.td_bottom_left.style.backgroundRepeat = "no-repeat";
	this.td_bottom_left.style.backgroundPosition = "0px -175px";

	this.td_bottom_center = this.tr_bottom.insertCell(-1);
	this.td_bottom_center.style.backgroundImage = "url(" + imagePath + "vertical.png)";
	this.td_bottom_center.style.backgroundPosition = "0px -175px";
	this.td_bottom_center.style.backgroundRepeat = "repeat-x";

	this.td_bottom_right = this.tr_bottom.insertCell(-1);
	this.td_bottom_right.style.backgroundImage = "url(" + imagePath + "corner.png)";
	this.td_bottom_right.style.backgroundRepeat = "no-repeat";
	this.td_bottom_right.style.backgroundPosition = "-75px -175px";
	this.resize(left, top, width, height);
	this.setTitle(title);
}

CsdnDialog.prototype.hide = function() {
	this.div_dialog.style.display = "none";
}

CsdnDialog.prototype.resize = function(left, top, width, height) {
	var bounds = getDocumentBounds();
	if (typeof top == "undefined" || top < 0) top = Math.max((bounds.ch - height) / 2 + bounds.st, 10);
	if (typeof left == "undefined" || left < 0) left = Math.max((bounds.cw - width) / 2 + bounds.sl, 10);
	this.left = left;
	this.top = top;
	this.width = width;
	this.height = height;
	this.div_dialog.style.left = this.left + "px";
	this.div_dialog.style.top = this.top + "px";
	this.div_dialog.style.width = width + "px";
	this.div_dialog.style.height = height + "px";
	this.table_dialog.style.width = width + "px";
	this.table_dialog.style.height = height + "px";
	this.tr_middle.style.height = (height - 40 - 25) + "px";
	this.td_top_center.style.width = (width - this.edgeWidth * 2) + "px";
	this.div_title.style.width = (width - this.edgeWidth * 2 - 50) + "px";
	this.td_middle_center.style.height = (height - 40 - 25) + "px";
	this.div_html.style.width = (width - this.edgeWidth * 2) + "px";
	this.div_html.style.height = (height - 40 - 25) + "px";

	if (typeof this.onresize == "function") this.onresize(this);
}

CsdnDialog.prototype.setTitle = function(title) {
	if (this.title == title) return;
	this.title = title;
	this.div_title.innerHTML = title;
}

CsdnDialog.prototype.show = function() {
	this.div_dialog.style.left = this.left + "px";
	this.div_dialog.style.top = this.top + "px";
	this.div_dialog.style.display = "";
	this.bodyStyleOverflow = document.body.style.overflowX;
	document.body.style.overflowX = "hidden";
	if ((/(msie)\s*(\d+(\.\d+)?)/i).exec(navigator.userAgent)) {
		document.createStyleSheet("javascript:'html{overflow-x:hidden;}'");
		document.createStyleSheet().addRule("html", "overflow-x:hidden;");
		document.createStyleSheet().addRule("body", "overflow-x:hidden;");
	}
}

CsdnDialog.prototype.close = function() {
	if (typeof this.onclose == "function") this.onclose(this);
	if (typeof (this.closefree) != "undefined" && this.closefree)
		this.dispose();
	else this.hide();
	document.body.style.overflowX = this.bodyStyleOverflow;
	if ((/(msie)\s*(\d+(\.\d+)?)/i).exec(navigator.userAgent)) {
		document.createStyleSheet("javascript:'html{overflow-x:auto;}'");
		document.createStyleSheet().addRule("html", "overflow-x:auto;");
		document.createStyleSheet().addRule("body", "overflow-x:auto;");
	}
}

CsdnDialog.prototype.dispose = function() {
	if (typeof this.ondispose == "function") this.ondispose(this);
	if (!fixup) this.dragEngine.dispose();
	this.td_middle_center.removeChild(this.div_html);
	this.div_close.removeChild(this.img_close)
	this.td_top_center.removeChild(this.div_close);
	this.td_top_center.removeChild(this.div_title);
	//this.td_top_left.removeChild(this.img_icon);
	this.div_dialog.removeChild(this.table_dialog);
	document.body.removeChild(this.div_dialog);
}

// 调用封装
var currentDialog = null;
function showWindow(opts) {
	if (!currentDialog) {
		if (typeof opts.width == "undefined")
			opts.width = 200;
		if (typeof opts.height == "undefined")
			opts.height = 200;

		var bounds = getDocumentBounds();
		currentDialog = new CsdnDialog(opts.title, opts.left, opts.top,
			opts.width, opts.height, false, false);
		currentDialog.div_black = document.createElement("div");
		currentDialog.div_black.style.position = "absolute";
		currentDialog.div_black.style.borderStyle = "none";
		currentDialog.div_black.style.zIndex = "1000";
		currentDialog.div_black.style.left = "0";
		currentDialog.div_black.style.top = bounds.st + "px";
		currentDialog.div_black.style.height = "3000px";
		currentDialog.div_black.style.width = "3000px";
		currentDialog.div_black.style.filter = "alpha(opacity = 40)";
		currentDialog.div_black.style.opacity = "0.55857";
		currentDialog.div_black.style.backgroundColor = "#999999";
		document.body.appendChild(currentDialog.div_black);
		currentDialog.onresize = function() {
			var bounds = getDocumentBounds();
			currentDialog.div_black.style.top = bounds.st - 1000 + "px";
		}
		currentDialog.onclose = function() {
			currentDialog.div_black.style.display = "none";
		}
		currentDialog.ondispose = function() {
			document.body.removeChild(currentDialog.div_black);
			currentDialog = null;
		}
	} else {
		currentDialog.div_black.style.display = "block";
		currentDialog.resize(opts.left, opts.top, opts.width, opts.height);
		currentDialog.setTitle(opts.title);
	}
	if (typeof opts.url == "string") {
		if (/\/Manage\/Top\/AddTop\.aspx/.test(opts.url))
			opts.url = opts.url.replace(/%3e/ig, "%uFF1E").replace(/%3c/ig, "%uFF1C")
		currentDialog.div_html.innerHTML = "";
		currentDialog.iframe = document.createElement("iframe");
		currentDialog.iframe.width = (opts.width - currentDialog.edgeWidth * 2) + "px";
		currentDialog.iframe.height = (opts.height - 40 - 25) + "px";
		currentDialog.iframe.style.margin = "0";
		currentDialog.iframe.frameBorder = "0";
		currentDialog.iframe.src = opts.url;
		currentDialog.div_html.appendChild(currentDialog.iframe);
	} else if (typeof opts.html == "string") {
		currentDialog.div_html.innerHTML = opts.html;
	}
	currentDialog.show();
}

function closeWindow() {
	if (currentDialog) currentDialog.close();
}

/*//
标题:用户资料
设计:ZswangY37
版权:CSDN.NET
版本:2008103101
//*/

function CsdnUserCard() {
	this.hot = false;

	this.div_card = document.createElement("div");
	with (this.div_card.style) {
		borderStyle = "none";
		borderWidth = "0";
		display = "none";
		width = "357px";
		height = "194px";
		position = "absolute";
		textAlign = "left";
		background = "transparent url(/u/ui/styles/default/topic/bgUserCard.gif) no-repeat scroll 0 0";
		fontFamily = "Verdana,Arial,Helvetica,sans-serif";
	}
	this.div_card.card = this;
	document.body.appendChild(this.div_card);

	this.table_card = document.createElement("table");
	with (this.table_card.style) {
		top = "12px";
		left = "56px";
		position = "relative";
		width = "290px";
	}
	this.table_card.cellSpacing = "0";
	this.table_card.cellPadding = "0";
	this.table_card.border = "0";
	this.div_card.appendChild(this.table_card);

	this.tr_card = this.table_card.insertRow(-1);
	this.td_left = this.tr_card.insertCell(-1);
	with (this.td_left.style) {
		lineHeight = "170%";
		textAlign = "center";
		verticalAlign = "top";
		width = "80px";
	}
	this.a_face = document.createElement("a");
	this.a_face.target = "_blank";
	this.a_face.title = "进入个人空间";
	this.a_face.style.color = "#01359D";
	this.a_face.target = "_blank";
	this.td_left.appendChild(this.a_face);

	this.td_right = this.tr_card.insertCell(-1);
	with (this.td_right.style) {
		lineHeight = "170%";
		textAlign = "left";
		verticalAlign = "top";
	}

	this.img_face = document.createElement("img");
	this.a_face.appendChild(this.img_face);
	with (this.img_face.style) {
		border = "1px solid #5B7790";
		width = "70px";
	}

	this.br_face = document.createElement("br");
	this.td_left.appendChild(this.br_face);

	this.a_space = document.createElement("a");
	this.a_space.innerHTML = "个人空间";
	this.a_space.title = "进入个人空间";
	this.a_space.target = "_blank";
	this.td_left.appendChild(this.a_space);
	with (this.a_space.style) {
		color = "#01359D";
		textDecoration = "none";
		verticalAlign = "middle";
	}

	this.br_space = document.createElement("br");
	this.td_left.appendChild(this.br_space);

	this.a_addFriend = document.createElement("a");
	this.a_addFriend.target = "_blank";
	this.a_addFriend.title = "加为好友";
	this.td_left.appendChild(this.a_addFriend);

	this.img_addFriend = document.createElement("img");
	this.img_addFriend.src = "http://c.csdn.net/bbs/f/i/blank.gif";
	this.a_addFriend.appendChild(this.img_addFriend);

	with (this.img_addFriend.style) {
		background = "transparent url(/u/ui/styles/default/topic/addFriend.gif) no-repeat scroll 0 0";
		height = "17px";
		marginBottom = "5px";
		width = "61px";
		border = "medium none";
	}

	this.br_addFriend = document.createElement("br");
	this.td_left.appendChild(this.br_addFriend);

	/*
	this.a_message = document.createElement("a");
	this.a_message.target = "_blank";
	this.a_message.title = "发消息";
	this.td_left.appendChild(this.a_message);

	this.img_message = document.createElement("img");
	this.img_message.src = "http://c.csdn.net/bbs/f/i/blank.gif";
	this.a_message.appendChild(this.img_message);

	with (this.img_message.style) {
	background = "transparent url(/u/ui/styles/default/topic/sendIMMsg.gif) no-repeat scroll 0 0";
	height = "17px";
	marginBottom = "5px";
	width = "61px";
	border = "medium none";
	}

	this.br_message = document.createElement("br");
	this.td_left.appendChild(this.br_message);
	*/

	this.a_blog = document.createElement("a");
	this.a_blog.target = "_blank";
	this.a_blog.title = "浏览博客";
	this.td_left.appendChild(this.a_blog);

	this.img_blog = document.createElement("img");
	this.img_blog.src = "http://c.csdn.net/bbs/f/i/blank.gif";
	this.a_blog.appendChild(this.img_blog);

	with (this.img_blog.style) {
		background = "transparent url(/u/ui/styles/default/topic/goBlog.gif) no-repeat scroll 0 0";
		height = "17px";
		marginBottom = "5px";
		width = "61px";
		border = "medium none";
	}

	this.span_username = document.createElement("span");
	this.span_username.innerHTML = "帐号：";
	this.td_right.appendChild(this.span_username);

	this.a_username = document.createElement("a");
	with (this.a_username.style) {
		color = "#01359D";
		fontStyle = "normal";
		textDecoration = "none";
	}
	this.td_right.appendChild(this.a_username);

	this.br_nickname = document.createElement("br");
	this.td_right.appendChild(this.br_nickname);

	this.span_nickname = document.createElement("span");
	this.span_nickname.innerHTML = "昵称：";
	this.td_right.appendChild(this.span_nickname);

	this.a_nickname = document.createElement("a");
	this.a_nickname.innerHTML = "载入中...";
	with (this.a_nickname.style) {
		color = "#01359D";
		fontStyle = "normal";
		textDecoration = "none";
	}
	this.td_right.appendChild(this.a_nickname);

	this.br_nickname = document.createElement("br");
	this.td_right.appendChild(this.br_nickname);

	this.span_topics = document.createElement("span");
	this.span_topics.innerHTML = "最新帖子：";
	this.td_right.appendChild(this.span_topics);

	this.br_topics = document.createElement("br");
	this.td_right.appendChild(this.br_topics);

	this.ol_topics = document.createElement("ol");
	this.td_right.appendChild(this.ol_topics);

	this.li_topics = {};
	this.a_topics = {};
	for (var i = 0; i < 3; i++) {
		this.li_topics[i] = document.createElement("li");
		this.li_topics[i].style.listStyleType = "decimal";
		this.a_topics[i] = document.createElement("a");
		this.a_topics[i].target = "_blank";
		with (this.a_topics[i].style) {
			color = "#01359D";
			textDecoration = "none";
		}
		this.li_topics[i].appendChild(this.a_topics[i]);
		this.li_topics[i].style.display = "none";
		this.ol_topics.appendChild(this.li_topics[i]);
	}

	this.a_more = document.createElement("a");
	this.a_more.innerHTML = "更多帖子...";
	this.a_more.title = "浏览更多发帖";
	this.a_more.target = "_blank";
	this.td_right.appendChild(this.a_more);

	with (this.a_more.style) {
		marginLeft = "90px";
		color = "#01359D";
		fontStyle = "normal";
		textDecoration = "none";
	}
}

CsdnUserCard.prototype.close = function() {
	this.div_card.style.display = "none";
	if (typeof this.onclose == "function") this.onclose(this);
}

CsdnUserCard.prototype.show = function(left, top, username, face) {
	this.username = username;
	this.a_face.href = "http://hi.csdn.net/" + username;
	this.a_space.href = "http://hi.csdn.net/" + username;
	this.a_addFriend.href = "http://webim.csdn.net/AddFriends/" + username + ".ashx";
	//this.a_message.href = "http://webim.csdn.net/Messages/" + username + ".ashx";
	this.a_blog.href = "http://blog.csdn.net/" + username;
	this.a_username.href = "http://hi.csdn.net/" + username;
	this.a_nickname.href = "http://hi.csdn.net/" + username;
	this.a_more.href = "http://forum.csdn.net/PointForum/Forum/UserTopicList.aspx?user=" + username;
	var userCard = this;
	if (!CsdnUserCard.userInfos[username]) {
		for (var i = 0; i < 3; i++)
			this.li_topics[i].style.display = "none";
		callScript("http://forum.csdn.net/PointForum/UserCard.ashx?user=" + username, function() {
			userCard.doUserChange(username);
		});
	}
	else this.doUserChange(username);
	this.div_card.style.left = left + "px";
	this.div_card.style.top = top + "px";
	this.div_card.style.display = "";
	this.a_username.innerHTML = username;
	this.img_face.src = face;
}

CsdnUserCard.prototype.doUserChange = function(username) {
	if (this.username != username) return;
	if (!CsdnUserCard.userInfos[username]) return;
	this.a_nickname.innerHTML = CsdnUserCard.userInfos[username].nickname;
	for (var i = 0; i < 3; i++) {
		if (CsdnUserCard.userInfos[username].topicList[i]) {
			this.a_topics[i].href = CsdnUserCard.userInfos[username].topicList[i].url;
			var text = CsdnUserCard.userInfos[username].topicList[i].text;
			text = text.replace(/\s&nbsp;\s/g, " ").replace(/&lt;/g, "<").
				replace(/&gt;/g, ">").replace(/&quoted;/g, '"');
			this.a_topics[i].innerHTML = text.match(/^[\s\S]{1,12}/)[0].replace(/[<>" ]/g, function($0) {
				return { "<": "&lt;", ">": "&gt;", " ": "&nbsp;" } [$0];
			});
			/*this.a_topics[i].innerHTML = text.replace(
			/^(.{12})(.*?)$/, "$1…").replace(/@/g, '＠').replace(/&(?![a-z]+;)/g, '＆');*/
			this.a_topics[i].title = text;

			this.li_topics[i].style.display = "";
		} else this.li_topics[i].style.display = "none";
	}
}

CsdnUserCard.userInfos = {};

function UserCardCallback(json) {
	if (typeof json == "undefined" || !json.username) return;
	CsdnUserCard.userInfos[json.username] = json;
}

var currentUserCard = null;
/*
addEventHandler(window, "load", function() {
currentUserCard = new CsdnUserCard();
});
//*/
function showUserCard(sender, username) {
	if (!window.loaded) return; // 未加载
	if (!currentUserCard) {
		//if (!panelTopicAdmin) return; 
		currentUserCard = new CsdnUserCard(); //*/
	}
	var point = absolutePoint(sender);
	currentUserCard.owner = sender;
	currentUserCard.show(point.x + 65, point.y, username, sender.src);
	currentUserCard.mouseover = function(e) {
		var element = typeof event != "undefined" ? event.srcElement : e.target;
		var hotCard = false;
		while (element) {
			hotCard = element == currentUserCard.owner || element == currentUserCard.div_card;
			if (hotCard) break;
			element = element.parentNode;
		}
		if (!hotCard) {
			removeEventHandler(document, "mouseover", currentUserCard.mouseover);
			currentUserCard.close();
		}
	}
	addEventHandler(document, "mouseover", currentUserCard.mouseover);
}

function CsdnHotMenu() {
	this.div_panel = document.createElement("div");
	this.div_panel.className = "chout";
	this.div_panel.style.height = "22px";
	this.div_panel.innerHTML = '<div><div class="menu">'
		+ '<a href="javascript:;" onclick="try{showWindow({url:currentHotMenu.modifyUrl,width:670,height:655,title:\'编辑\'});}catch(ex){}return false;">编辑</a></li>'
		+ '<a href="javascript:;" onclick="try{showWindow({url:currentHotMenu.deleteUrl,width:425,height:330,title:\'删除\'});}catch(ex){}return false;"">删除</a></li><ul>'
		+ '</div></div>';
	document.body.appendChild(this.div_panel);
}

CsdnHotMenu.prototype.close = function() {
	this.div_panel.style.display = "none";
	if (typeof this.onclose == "function") this.onclose(this);
}

CsdnHotMenu.prototype.show = function(left, top) {
	this.div_panel.style.left = left - 5 + "px";
	this.div_panel.style.top = top + 10 + "px";
	this.div_panel.style.display = "block";
}

var currentHotMenu = null;

function showMenu(sender, modifyUrl, deleteUrl) {
	if (!currentHotMenu) {
		currentHotMenu = new CsdnHotMenu();
	}
	var point = absolutePoint(sender);
	currentHotMenu.owner = sender;
	currentHotMenu.modifyUrl = modifyUrl;
	currentHotMenu.deleteUrl = deleteUrl;
	currentHotMenu.show(point.x, point.y);
	currentHotMenu.mouseover = function(e) {
		var element = typeof event != "undefined" ? event.srcElement : e.target;
		var hotMenu = false;
		while (element) {
			hotMenu = element == currentHotMenu.owner || element == currentHotMenu.div_panel;
			if (hotMenu) break;
			element = element.parentNode;
		}
		if (!hotMenu) {
			removeEventHandler(document, "mouseover", currentHotMenu.mouseover);
			currentHotMenu.close();
		}
	}
	addEventHandler(document, "mouseover", currentHotMenu.mouseover);
}

function honorsCallback(roles) {
	updateReplyItems();
	for (var i in reply_items.length) {
		var role = roles[reply_items[i].username];
		if (role) {
			var html = "";
			for (var j = 0; j < role.length; j++)
				html += role[j] + (j > 0 ? "<br/>" : "");
			reply_items[i].honor.innerHTML = html;
		}
	}
}

function recommendCallback(recommends) {
	if (!recommends || recommends.length <= 0) return;
	var j = Math.floor(recommends.length * Math.random());
	updateReplyItems();
	var count = 0;
	for (var i in reply_items) {
		if (i && reply_items[i] && reply_items[i].recommend) {
			j = (j + 1) % recommends.length;
			var html = new Array();
			html.push("精华推荐：");
			html.push("<a href=\"");
			html.push(recommends[j].url);
			html.push("\" target=\"_blank\" onclick='LogClickCount(this,112);'>");
			html.push(recommends[j].title);
			html.push("</a>");
			reply_items[i].recommend.innerHTML = html.join("");
			if (++count >= 5) break;
		}
	}
}

var currentHint = null;
function showHint(sender, hint) {
	if (!currentHint) {
		currentHint = document.createElement("div");
		with (currentHint.style) {
			position = "absolute";
			backgroundColor = "#FFFFE1";
			border = "solid 1px Black";
			padding = "3px";
			textAlign = "left";
		}
		document.body.appendChild(currentHint);
	}
	currentHint.innerHTML = hint.replace(/\r?\n/g, "<br/>");
	currentHint.style.visibility = "";
	var point = absolutePoint(sender);
	currentHint.style.top = point.y + 20 + "px";
	currentHint.style.left = point.x - 10 + "px";
}

function hideHint() {
	if (currentHint)
		currentHint.style.visibility = "hidden";
}

addEventHandler(window, "load", function() {
	window.loaded = true;
	window.reply_items = null;
	displayVisitor();
	var a_head_recreate = $("a_head_recreate");
	if (a_head_recreate) a_head_recreate.href += encodeURIComponent(location);
	var a_foot_recreate = $("a_foot_recreate");
	if (a_foot_recreate) a_foot_recreate.href += encodeURIComponent(location);
	if (typeof tinfo == "undefined") return;
	callScript("http://community.csdn.net/tr/recommend.ashx?fcb=recommendCallback" +
		"&bAlias=" + tinfo.ba + "&sAlias=" + tinfo.sa);
});

function changePage(select) {
	window.location.href = select.value;
}