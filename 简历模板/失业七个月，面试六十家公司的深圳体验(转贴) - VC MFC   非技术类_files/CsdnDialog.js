/*//
标题:对话框
设计:ZswangY37
版权:CSDN.NET
版本:2008103101
//*/

var globalZIndex = 1001; // 对话框层次
var nonepng = (/(msie)\s*(\d+(\.\d+)?)/i).exec(navigator.userAgent) && parseFloat(RegExp.$2) < 7; // 不能显示png
//var imagePath = "images/"; // 图片路径
var imagePath = "/PointForum/ui/scripts/System/_resource/MzForm/"; // 图片路径

/// <summary>
/// 查询IE元素
/// </summary>
/// <param name="id">元素id</param>
/// <returns>返回id对应的网页元素</returns>
function $(id) { return document.getElementById(id); }

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
/// 获得HTML元素当前的样式
/// </summary>
/// <param name="element">HTML元素</param>
function currentStyle(element) {
    return element.currentStyle || document.defaultView.getComputedStyle(element, null);
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
		//document.createStyleSheet("javascript:'html{overflow-x:hidden;}'");
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
		//document.createStyleSheet("javascript:'html{overflow-x:auto;}'");
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