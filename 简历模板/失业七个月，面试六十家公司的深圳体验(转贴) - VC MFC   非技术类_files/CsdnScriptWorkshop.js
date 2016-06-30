/*//
标题:UBB插件容器对象
设计:王集鹄
版权:CSDN.NET
版本:20081105
//*/

///////Begin 公用函数
/// <summary>
/// 设置Cookie值
/// </summary>
/// <param name="name">Cookie变量名</param>
/// <param name="value">Cookie值</param>
/// <param name="days">保存的天数</param>
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var d = new Date();
        d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + d.toGMTString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

/// <summary>
/// 获取Cookie值
/// </summary>
/// <param name="name">Cookie变量名</param>
/// <returns>返回获取到的Cookie值</returns>
function getCookie(name) {
    var re = new RegExp("(\;|^)[^;]*(" + name + ")\=([^;]*)(;|$)");
    var res = re.exec(document.cookie);
    return res != null ? res[3] : null;
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
    if (typeof charset == "string") script.charset = charset;
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

    script.type = "text/javascript";
    script.defer = "true";
    script.src = url;
    var parent = document.getElementsByTagName("HEAD")[0] || document.documentElement;
    parent.insertBefore(script, parent.firstChild);
}

/// <summary>
/// 执行http请求
/// </summary>
/// <param name="url">链接地址</param>
/// <param name="type">请求类型</param>
/// <param name="loaded">载入后调用的方法</param>
function requestHttp(url, type, loaded) {
    if (typeof loaded != "function") return;
    var xmlhttp = typeof XMLHttpRequest == "undefined" ?
	    new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
            loaded(xmlhttp);
    }
    xmlhttp.open(typeof type == "string" ? type : "GET", url, true);
    xmlhttp.send(null);
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
///////End 公用函数

var CsdnScriptWorkshop = {
	/// <summary>
	/// 接口版本，推荐访问
	/// </summary>
	interfaceVersion: "1.0",

	/// <summary>
	/// 是否初始化过，拒绝访问
	/// </summary>
	initialized: false,

	/// <summary>
	/// 工具条，拒绝访问
	/// </summary>
	toolbar: null,

	/// <summary>
	/// 当前区域 p：post发帖页面 r：reply回复页面
	/// </summary>
	page: "n",

	/// <summary>
	/// 初始化，拒绝访问
	/// </summary>
	initialize: function() {
		if (this.initialized) return;
		if (typeof CsdnScriptPlugins == "undefined") return;
		if ((/^[^\?]+PostTopic.aspx/i).test(window.location))
			this.page = "p";
		else if ((/^[^\?]+ReplyTopic.aspx/i).test(window.location))
			this.page = "r";
		var menubar = document.getElementById("CsdnUbbEditorMenubar_CsdnUbb_0");
		if (!menubar) return;
		this.initialized = true;
		this.toolbar = document.createElement("div");
		this.toolbar.className = menubar.className;
		this.toolbar.style.backgroundImage = "url(/EditorControl/MzUBB/CsdnUbbEditor/bgMenubar2.gif)";
		this.toolbar.style.marginTop = "2px";
		this.toolbar.style.marginBottom = "-2px";

		menubar.parentNode.insertBefore(this.toolbar, menubar.nextSibling);
		var url = getCookie("CsdnScriptPlugin999.url");
		if (url) CsdnScriptPlugins["CsdnScriptPlugin999"].url = url;
		if (typeof CsdnUbbEditor != "undefined") {
			var toolbar = this.toolbar;
			CsdnUbbEditor.disable = function(input, hashcode) {
				var editor = CsdnUbbEditor.instance(hashcode);
				editor.menubar.style.display = input.checked ? "none" : "";
				toolbar.style.display = input.checked ? "none" : "";
			}
		}
		var pluginCount = 0;
		for (var name in CsdnScriptPlugins) {
			if (CsdnScriptPlugins[name].pages.indexOf(CsdnScriptWorkshop.page) >= 0)
				pluginCount++;
		}
		this.addButton(
            "管理UBB插件",
            "/PointForum/ui/images/jscript.gif",
            function() {
            	if (typeof LogClickCount == "function") LogClickCount("button", 65);
            	if (typeof CsdnScriptPlugins != "object") return;
            	var htmlDialog = "<table style=\"text-align:left;width:100%;height:" + (pluginCount + 1) * 30 + "px;background:#9B9B9B;\" border=\"0\" cellpadding=\"2\" cellspacing=\"1\"><tr><td style=\"background:White\"><strong>插件名</strong></td><td style=\"background:White;\"><strong>作者</strong></td><td align=\"center\" colspan=\"2\" style=\"background:White;\"><strong>功能</strong></td></tr>\n";
            	for (var name in CsdnScriptPlugins) {
            		if (CsdnScriptPlugins[name].pages.indexOf(CsdnScriptWorkshop.page) < 0) continue;
            		if (name == "CsdnScriptPlugin999") {
            			htmlDialog += "<tr>";
            			htmlDialog += "<td colspan=\"2\" style=\"background:White;color:Green;\">本机插件URL：<input id=\"text_" + name + "\" type=\"text\" value=\"" + CsdnScriptPlugins[name].url + "\" style=\"width:200px;\" /></td>";
            			htmlDialog += "<td style=\"background:White;\"><a id=\"button_" + name + "_load\" href=\"javascript:void(0);\">装载</a></td>";
            			htmlDialog += "<td style=\"background:White;\"><a id=\"button_" + name + "_free\" href=\"javascript:void(0);\">卸载</a></td>"
            			htmlDialog += "</tr>";
            		} else {
            			htmlDialog += "<tr>";
            			htmlDialog += "<td style=\"background:White;\"><a href=\"" + CsdnScriptPlugins[name].help + "\" target=\"_blank\">" + CsdnScriptPlugins[name].caption + "</a></td>";
            			htmlDialog += "<td style=\"background:White;\"><a href=http://hi.csdn.net/" + CsdnScriptPlugins[name].designer + " target=\"_blank\">" + CsdnScriptPlugins[name].designer + "</a></td>";
            			htmlDialog += "<td style=\"background:White;\"><a id=\"button_" + name + "_load\" href=\"javascript:void(0);\">装载</a></td>";
            			htmlDialog += "<td style=\"background:White;\"><a id=\"button_" + name + "_free\" href=\"javascript:void(0);\">卸载</a></td>"
            			htmlDialog += "</tr>";
            		}
            	}
            	htmlDialog += "</table>";
            	htmlDialog += "<div style=\"float:right;margin:7px 12px 0 0;\"><a href=\"/PointForum/ui/scripts/Csdn/Plugin/PluginHelp.htm\" style=\"margin-right:100px;color:Blue;\" target=\"_blank\" onclick=\"LogClickCount(this, 66);\">如何编写自己的插件？</a><input type=\"button\" class=\"button\" value=\"关闭\" onclick=\"CsdnScriptWorkshop.closeDialog();\" /></div>";
            	var point = absolutePoint(this);
            	CsdnScriptWorkshop.showDialog("管理UBB插件", htmlDialog, point.x, point.y + 18, 500, (pluginCount + 1) * 30 + 100);
            	for (var name in CsdnScriptPlugins) {
            		CsdnScriptWorkshop.changeButton(name);
            	}
            }
        );
		for (var name in CsdnScriptPlugins) {
			if (CsdnScriptPlugins[name].pages.indexOf(CsdnScriptWorkshop.page) < 0) continue;
			if (getCookie(name) == "loaded")
				this.loadPlugin(name);
		}
	},

	/// <summary>
	/// 装载UBB插件对象，拒绝访问
	/// </summary>
	/// <param name="plugin">脚本对象</param>
	/// <returns>返回是否载入成功</returns>
	loadPlugin: function(name) {
		if (CsdnScriptPlugins[name].download && CsdnScriptPlugins[name].plugin) { // 已经下载
			var plugin = CsdnScriptPlugins[name].plugin;
			if (plugin.interfaceVersion != this.interfaceVersion) return false;
			if (typeof plugin.load != "function") return false;
			if (plugin.loaded) return false; // 已装载
			if (name == "CsdnScriptPlugin999")
				setCookie(name + ".url", CsdnScriptPlugins[name].url, 7);
			setCookie(name, "loaded", 7);
			plugin.load();
			plugin.loaded = true;
			CsdnScriptWorkshop.changeButton(name);
		} else { // 下载脚本
			//TODO : 显示 loading...
			if (CsdnScriptPlugins[name].loading) return;
			if (name == "CsdnScriptPlugin999") {
				var input = document.getElementById("text_" + name);
				if (input) {
					if (input.value.length <= 0) {
						setCookie(name, "", -1);
						setCookie(name + ".url", "", -1);
						alert("无效的URL。");
						return;
					}
					CsdnScriptPlugins[name].url = input.value;
				}
			}
			if (CsdnScriptPlugins[name].url.length <= 0) return;
			CsdnScriptPlugins[name].loading = true;
			CsdnScriptWorkshop.changeButton(name);
			var timer = window.setTimeout(function() { // 处理载入超时
				setCookie(name, "", -1);
				CsdnScriptPlugins[name].plugin = null;
				CsdnScriptPlugins[name].download = false;
				CsdnScriptPlugins[name].loading = false;
				CsdnScriptWorkshop.changeButton(name);
				alert("装载超时。");
			}, 100000);

			if (name != "CsdnScriptPlugin999") // 非自定义采用ajax
			{
				requestHttp(CsdnScriptPlugins[name].url, "GET", function(xmlhttp) {
					try {
						eval(xmlhttp.responseText);
						eval("CsdnScriptPlugins[\"" + name + "\"].plugin = " + name + ";");
						CsdnScriptPlugins[name].download = true;
						CsdnScriptWorkshop.loadPlugin(name);
					} catch (e) {
						CsdnScriptPlugins[name].plugin = null;
						CsdnScriptPlugins[name].download = false;
						setCookie(name, "", -1);
						alert("插件装载出现异常。--" + e.message);
					} finally {
						clearTimeout(timer);
						CsdnScriptPlugins[name].loading = false;
					}
					CsdnScriptWorkshop.changeButton(name);
				});
				return;
			}

			callScript(CsdnScriptPlugins[name].url, function() {
				try {
					eval("CsdnScriptPlugins[\"" + name + "\"].plugin = " + name + ";");
					CsdnScriptPlugins[name].download = true;
					CsdnScriptWorkshop.loadPlugin(name);
				} catch (e) {
					CsdnScriptPlugins[name].plugin = null;
					CsdnScriptPlugins[name].download = false;
					setCookie(name, "", -1);
					alert("插件装载出现异常。--" + e.message);
				} finally {
					clearTimeout(timer);
					CsdnScriptPlugins[name].loading = false;
				}
				CsdnScriptWorkshop.changeButton(name);
			}, function() {
				setCookie(name, "", -1);
				clearTimeout(timer);
				CsdnScriptPlugins[name].plugin = null;
				CsdnScriptPlugins[name].download = false;
				CsdnScriptPlugins[name].loading = false;
				CsdnScriptWorkshop.changeButton(name);
				alert("无效脚本文件。");
			});
		}
		return true;
	},

	/// <summary>
	/// 释放UBB插件对象，拒绝访问
	/// </summary>
	/// <param name="plugin">脚本对象</param>
	/// <returns>返回是否释放成功</returns>
	freePlugin: function(name) {
		var plugin = CsdnScriptPlugins[name].plugin;
		if (!plugin) return false;
		if (plugin.interfaceVersion != this.interfaceVersion) return false;
		if (typeof plugin.free != "function") return false;
		if (!plugin.loaded) return false; // 未激活
		if (name == "CsdnScriptPlugin999") {
			CsdnScriptPlugin999 = null;
			CsdnScriptPlugins[name].plugin = null;
			CsdnScriptPlugins[name].download = false;
		}
		setCookie(name, "", -1);
		plugin.free();
		plugin.loaded = false;
		CsdnScriptWorkshop.changeButton(name);
		return true;
	},

	/// <summary>
	/// 改变按钮状态
	/// </summary>
	/// <param name="name">插件名</param>
	changeButton: function(name) {
		var button_load = document.getElementById("button_" + name + "_load");
		var button_free = document.getElementById("button_" + name + "_free");
		if (CsdnScriptPlugins[name].loading) {
			if (button_load) {
				button_load.style.color = "Green";
				button_load.style.cursor = "default";
				button_load.innerHTML = "装载中...";
				button_load.onclick = null;
			}
			if (button_free) {
				button_free.style.color = "Green";
				button_free.style.cursor = "default";
				button_free.innerHTML = "装载中...";
				button_free.onclick = null;
			}
		} else if (CsdnScriptPlugins[name].plugin && CsdnScriptPlugins[name].plugin.loaded) {
			if (button_load) {
				button_load.style.color = "Red";
				button_load.style.cursor = "default";
				button_load.innerHTML = "已装载";
				button_load.onclick = null;
			}
			if (button_free) {
				button_free.style.color = "Blue";
				button_free.style.cursor = "pointer";
				button_free.innerHTML = "卸载";
				button_free.onclick = function() { CsdnScriptWorkshop.freePlugin(name); };
			}
		} else {
			if (button_load) {
				button_load.style.color = "Blue";
				button_load.style.cursor = "pointer";
				button_load.innerHTML = "装载";
				button_load.onclick = function() { CsdnScriptWorkshop.loadPlugin(name); };
			}
			if (button_free) {
				button_free.style.color = "Red";
				button_free.style.cursor = "default";
				button_free.innerHTML = "已卸载";
				button_free.onclick = null;
			}
		}
	},

	/// <summary>
	/// 获得UBB编辑器，推荐访问
	/// </summary>
	/// <returns>返回编辑对象</returns>
	getEditor: function() {
		return document.getElementById("tb_ReplyBody___Editor") ||
            document.getElementById("ctl00_ctl00_CPH_Content_CPH_BaseContent_tb_TopicBody___Editor") ||
            document.getElementById("ctl00_CPH_BaseContent_tb_TopicBody___Editor");
	},

	/// <summary>
	/// 获得UBB编辑器文本，推荐访问
	/// </summary>
	/// <returns>返回全部文本</returns>
	getEditorText: function() {
		var editor = this.getEditor();
		if (editor) return editor.value;
	},

	/// <summary>
	/// 设置UBB编辑器文本，推荐访问
	/// </summary>
	/// <param name="value">文本内容</param>
	setEditorText: function(value) {
		var editor = this.getEditor();
		if (editor) return editor.value = value;
	},

	/// <summary>
	/// 获得UBB编辑器选中文本，推荐访问
	/// </summary>
	/// <returns>返回当前选中的文本</returns>
	getSelectText: function() {
		var editor = this.getEditor();
		if (!editor) return;
		editor.focus();
		if (this.range)
			return this.range.text;
		else if (editor.document && editor.document.selection)
			return editor.document.selection.createRange().text;
		else if (typeof editor.selectionStart != "undefined")
			return editor.value.substring(editor.selectionStart, editor.selectionEnd);
	},

	/// <summary>
	/// IE编辑器文字选区
	/// </summary>
	range: null,

	/// <summary>
	/// 设置UBB编辑器选中文本，推荐访问
	/// </summary>
	/// <param name="value">文本内容</param>
	setSelectText: function(value) {
		var editor = this.getEditor();
		if (!editor) return;
		editor.focus();
		if (this.range) {
			this.range.text = value;
			this.range.select();
			this.range = null;
		} else if (editor.document && editor.document.selection)
			editor.document.selection.createRange().text = value;
		else if (typeof editor.selectionStart != "undefined") {
			var str = editor.value;
			var start = editor.selectionStart;
			var top = editor.scrollTop;
			editor.value = str.substr(0, start) + value +
 			    str.substring(editor.selectionEnd, str.length);
			editor.selectionStart = start + value.length;
			editor.selectionEnd = start + value.length;
			editor.scrollTop = top;
		}
	},

	/// <summary>
	/// 添加工具按钮，推荐访问
	/// </summary>
	/// <param name="hint">提示内容</param>
	/// <param name="icon">图标URL，16*16，可以通过个人空间上传</param>
	/// <param name="click">点击按钮执行的函数</param>
	addButton: function(hint, icon, click) {
		if (!this.initialized) return;
		var a_button = document.createElement("a");
		a_button.input_button = document.createElement("input");
		a_button.input_button.className = "menuitem";
		if (icon) a_button.input_button.style.backgroundImage = "url(" + icon + ")";
		a_button.input_button.type = "button";
		a_button.input_button.title = hint;
		a_button.input_button.workshop = this;
		a_button.input_button.onfocus = function() { this.blur(); };
		if (typeof click == "function") a_button.input_button.onclick = click;
		a_button.appendChild(a_button.input_button);
		this.toolbar.appendChild(a_button);
		return a_button;
	},

	/// <summary>
	/// 删除工具按钮，推荐访问
	/// </summary>
	/// <param name="button">按钮对象</param>
	deleteButton: function(button) {
		if (!button) return false;
		button.input_button.parentNode.removeChild(button.input_button);
		button.parentNode.removeChild(button);
		return true;
	},

	/// <summary>
	/// 添加工具分隔条，推荐访问
	/// </summary>
	addSeparator: function() {
		if (!this.initialized) return;
		var input_separator = document.createElement("input");
		input_separator.className = "menuitem space";
		input_separator.type = "button";
		input_separator.disabled = "true";
		input_separator.onfocus = function() { this.blur(); };
		this.toolbar.appendChild(input_separator);
		return input_separator;
	},

	/// <summary>
	/// 删除工具分隔条，推荐访问
	/// </summary>
	/// <param name="separator">分隔条对象</param>
	deleteSeparator: function(separator) {
		if (!separator) return;
		separator.parentNode.removeChild(separator);
	},

	/// <summary>
	/// 显示对话框，推荐访问
	/// </summary>
	/// <param name="title">标题</param>
	/// <param name="html">显示的html内容</param>
	/// <param name="left">左边距</param>
	/// <param name="top">上边距</param>
	/// <param name="width">宽度</param>
	/// <param name="height">高度</param>
	showDialog: function(title, html, left, top, width, height) {
		var editor = this.getEditor();
		if (editor) {
			editor.focus();
			if (editor && editor.document && editor.document.selection)
				this.range = editor.document.selection.createRange(); // 记忆编辑框选区，在IE中如果在其他文本框输入内容将导致UBB编辑框的选区失效，所以需要记忆
		} else this.range = null;
		left = typeof left == "undefined" ? -1 : left;
		top = typeof top == "undefined" ? -1 : top;
		if (typeof showWindow == "function")
			showWindow({ "html": html, "width": width, "height": height, "title": title,
				"left": left, "top": top
			});
	},

	/// <summary>
	/// 关闭对话框，推荐访问
	/// </summary>
	closeDialog: function() {
		this.range = null;
		if (typeof closeWindow == "function") closeWindow();
	}
}

addEventHandler(window, "load", function() {
    if (typeof CsdnDialog == "undefined") {
        callScript("../ui/scripts/Csdn/Plugin/CsdnDialog.js?version=2009062401", function() {
            if (typeof CsdnDialog != "undefined" && typeof CsdnScriptPlugins != "undefined")
                CsdnScriptWorkshop.initialize();
        });
    }
    if (typeof CsdnScriptPlugins == "undefined") {
        callScript("../ui/scripts/Csdn/Plugin/CsdnScriptPlugins.js?version=2008120907", function() {
            if (typeof CsdnDialog != "undefined" && typeof CsdnScriptPlugins != "undefined")
                CsdnScriptWorkshop.initialize();
        });
    }
});