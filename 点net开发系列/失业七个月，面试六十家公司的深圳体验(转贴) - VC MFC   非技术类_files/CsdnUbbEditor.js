/*
Author:Meizz
Created:2007-02-28
Version:2008-07-07
Modify:ZswangY37
*/

var defaultLanguages = new Array
(
	{ forumIDs: 
		"F9FB995E-C93D-456A-8097-0B27CCB25C4E," +
		"6C6B2CF3-A601-4629-8EB9-466F34AAB011," +
		"B3552BF0-9B33-47B2-B067-57F9BE054A7F," +
		"A329B8A2-DF76-4C97-A779-63E19535209E," +
		"4269C85A-666C-44A6-84B0-8841DB1E7F68," +
		"0BC02486-646A-4A41-9F4E-8E0F36871768," +
		"29D9B8D4-82F5-4801-B736-914192A98F21," +
		"32DAECB5-5DB5-42B5-8DA4-BD03849E181D," +
		"A11DF1B2-DE12-4FDC-A65A-C5C21681F7AC," +
		"0B896AC3-294A-49F6-BECD-CEC492C787A9," +
		"9AA3F9C9-7481-448C-997B-48616819FE87," +
		"0CB5B416-3071-421F-B910-5A3392C5BD19," +
		"F7252002-6D2A-4DFA-B957-5F17B9B654B3," +
		"65ACDD61-4A3A-4131-8261-7C0AB1E8BEF5," +
		"2C6D6B6B-7D47-4FA3-B25F-B2960A1711B0," +
		"A43F0123-4D00-4F56-AD06-BF600E1A8062," +
		"AE925434-466E-42C8-B32F-C24BA1C73D6D," +
		"2C9ABD1C-1E3E-4E45-BFDB-31213B2AA736," +
		"17673F58-331A-4F41-A240-3AC1D698FD74," +
		"A09AB4EB-BB7E-45A9-84FD-46EBF6B2997D," +
		"8BBCE98E-B54F-41EA-8F96-9EE6311513C0," +
		"98A73A94-5F11-4F90-A035-E5609FB9C63F," +
		"5FC6F290-9AB1-492E-AF2C-FBD31E9E3002",
		language: "C/C++" },
	{ forumIDs: 
		"E2798A59-79D5-4833-9C57-87D46A8B907A," +
		"976148B5-B1A9-4A11-B881-96E198962403",
		language: "C#" },
	{ forumIDs: 
		"DC0369D7-BC4B-48FF-8FFA-24B46529CAB3," +
		"CBFF8B5A-57AD-462E-833B-288000C6CC7C," +
		"D593354E-8665-4410-94B5-508D935F5083," +
		"8AB98CD6-4AFB-4F14-947B-586DBA0AD98A," +
		"86FDA20C-918F-4004-9A60-83AC6156C017," +
		"4478B4F9-6258-4863-9A4B-87351EE3020B," +
		"8A63669B-105B-4443-8406-CB0BDCCD157B," +
		"2D8A999F-B552-4BF1-81B2-DA785BDC082A",
		language: "Delphi(Pascal)" },
	{ forumIDs: 
		"B4147360-C993-428F-9C51-0E314FFC441A," +
		"56EAA76E-03F8-4711-902D-155891A52EAB," +
		"C8912383-CD38-4EE5-9E82-22D3DA0BB9B7," +
		"873558A8-B625-4CA5-A186-471147813C69," +
		"EBAB1CD2-C2BF-43E0-BEBE-BA432BCA0E31," +
		"E8970651-6B35-4F81-8317-C4ACCED7CF48," +
		"33FA67FF-A665-455A-8789-C5B59C9D8D5A," +
		"7BDC6604-0E56-44FB-AC04-E97E736F1ECD," +
		"A333AD9B-03A3-4604-96DB-FFB75337742A",
		language: "VB" },
	{ forumIDs: 
		"B7E466C6-291A-4072-ACEE-15D2BE78C647",
		language: "VB.NET" },
	{ forumIDs: 
		"B18C12C4-C4ED-469F-872C-6FE0DA0F975A",
		language: "VBScript" },
	{ forumIDs: 
		"39732074-A685-471F-B95A-119709673C0D",
		language: "Assembly" },
	{ forumIDs: 
		"467D91E3-DD10-480B-A322-71B65E66C736",
		language: "JScript" },
	{ forumIDs: 
		"94985A29-C8E9-4552-9BE4-B01061443744",
		language: "PHP" },
	{ forumIDs: 
		"2EFCA177-6B51-42D9-A509-0216FBCA231E," +
		"A78E0A85-E260-4232-95C9-1872A2B49944," +
		"DF8A1EB4-7ECB-4FCD-A9AE-1BE6FD084AEB," +
		"F215D409-58D5-44C2-884B-1FDC179523E3," +
		"3931C03E-B66C-4189-A4F0-210FD9501803," +
		"02DBED19-8F0B-47ED-8D51-2143CD8ADF06," +
		"6677E88C-D1A7-48AD-9E82-27FCCC00C626," +
		"342057C2-1AC8-47AF-8070-36259792E8F1," +
		"E051865D-0992-4901-928E-4229C77A4F0B," +
		"845A6FCE-C2B5-482C-AFCC-4575B07FE8B4," +
		"4C3EEB74-0853-425E-BFED-58F38483484A," +
		"BEBF6FBC-94E1-43AD-B03C-B3DD371A7FB2," +
		"CE40C5AE-4D20-4DA9-A71F-E52AC2CBD899," +
		"8B327318-2C42-4A49-8AED-EF8C33697E7F," +
		"C02C69AB-3534-4BAF-A3B0-F5DF87F8DAB4," +
		"AA6E8F72-6461-4C23-B790-FD870A35EC3B",
		language: "Java" },
	{ forumIDs: 
		"6E0E6207-DE3A-4C0B-8F8A-052FCBA6392A," +
		"A487DFB4-AD04-4694-AAE7-2BF358DE9B52," +
		"A8983D7F-322C-49E5-8EC2-548C623D1929," +
		"BA09FE7E-2FB7-42D3-805E-578A4A8485E1," +
		"55B4468C-6FDE-444F-BDE0-6E82082B1B73," +
		"D63A305D-A283-4704-9675-D386FACAE96A," +
		"F5ECBFE4-F43F-4CB9-9F32-EFEACF9FD57A," +
		"DFFA884A-2C7E-4D78-B327-073A7A091350," +
		"B282A8E8-D232-424E-80AF-497FCB424586," +
		"BA09FE7E-2FB7-42D3-805E-578A4A8485E1," +
		"2139527C-A6DE-49CF-96E6-5E00F39A082C," +
		"FBEB0E20-4AED-4BD6-80AA-AF19ABFEA817," +
		"509C4724-A4B5-4F8F-9A41-BFC4DAFCD6E6," +
		"7AAAD003-1746-4CE6-B96C-D1730C321977," +
		"D63A305D-A283-4704-9675-D386FACAE96A," +
		"FE63BCC5-4E39-4A00-A59D-D59FC803B085," +
		"38563647-4A43-4709-9149-E58CB13BC354," +
		"33FE3BD4-59F5-4ACB-812E-E6C961EE07DA",
		language: "SQL" },
	{ forumIDs: 
		"7459A70B-915A-447F-87C6-378668FA7AB9",
		language: "Perl" }
);


var isIE = navigator.userAgent.indexOf("MSIE") > 0;

function CsdnUbbEditor(editor, op)
{
	this.editor = CsdnUbbEditor.check(editor);
	this.contentLength = 10000;
	this.disabled = false;
	this.options = CsdnUbbEditor.extend({}, op || {});
	this.hashCode = "CsdnUbb_" + (CsdnUbbEditor.counter++).toString(36);
	CsdnUbbEditor.instances[this.hashCode] = this;
	this.initialize();
};

CsdnUbbEditor.defaultLanguage = function ()
{
	var re = /forumId=([a-z\d\-]+)/i;
	var forumId = null;
	if (re.exec(location)) forumId = RegExp.$1.toUpperCase();
	if (forumId == null) return "";
	for (var i = 0; i < defaultLanguages.length; i++)
		if (defaultLanguages[i].forumIDs.indexOf(forumId) >= 0)
			return defaultLanguages[i].language;
	return "";
};

CsdnUbbEditor.extend = function(d, s)
{
	for (var i in s) d[i] = s[i]; 
	return d;
};

CsdnUbbEditor.check = function(e)
{
	if ("object" == typeof e && !e.tagName) return null;
	if ("string" == typeof e && !(e = document.getElementById(e)))
		return null;
	return e;
};

CsdnUbbEditor.loadCssFile = function(cssPath, uniqueId)
{
	if (/\w+\.\w+(\?|$)/.test(cssPath))
	{
		if (!("string" == typeof uniqueId && uniqueId != ""))
		uniqueId = "CsdnCss_" + cssPath.replace(/\W/g, "");
		if (document.getElementById(uniqueId)) return;

		var link = document.createElement("LINK");
		link.href = cssPath;
		link.id = uniqueId;
		link.type = "text/css";
		link.rel = "Stylesheet";
		uniqueId = document.getElementsByTagName("HEAD")[0];
		uniqueId.insertBefore(link, uniqueId.firstChild);
	}
}

CsdnUbbEditor.body = function()
{
	var W, H, SL, ST;
	var w = window, d = document, dd = d.documentElement;

	if (w.innerWidth) W = w.innerWidth;
	else if (dd && dd.clientWidth) W = dd.clientWidth;
	else if (d.body) W = d.body.clientWidth;

	if (w.innerHeight) H = w.innerHeight;
	else if (dd && dd.clientHeight) H = dd.clientHeight; 
	else if (d.body) H = d.body.clientHeight;

	if (w.pageXOffset) SL = w.pageXOffset;
	else if (dd && dd.scrollLeft) SL = dd.scrollLeft;
	else if (d.body) SL = d.body.scrollLeft;

	if (w.pageYOffset) ST = w.pageYOffset;
	else if (dd && dd.scrollTop) ST = dd.scrollTop;
	else if (d.body) ST = d.body.scrollTop;

	return { "scrollTop": ST, "scrollLeft": SL, "clientWidth": W, "clientHeight": H };
}

CsdnUbbEditor.counter = 0;
CsdnUbbEditor.instances = {};
CsdnUbbEditor.instance = function(i)
{
	return CsdnUbbEditor.instances[i];
}

CsdnUbbEditor.realOffset = function(o)
{
	var e = o, x = y = l = t = 0, doc = CsdnUbbEditor.body();
	do { l += e.offsetLeft || 0; t += e.offsetTop || 0; e = e.offsetParent; } while (e);
	do { x += o.scrollLeft || 0; y += o.scrollTop || 0; o = o.parentNode; } while (o);
	return { "x": l - x + doc.scrollLeft, "y": t - y + doc.scrollTop};
}

String.prototype.trim = function()
{
	return this.replace(/(^[\s\t\xa0\u3000]+)|([\u3000\xa0\s\t]+$)/g, "");
}

String.prototype.format = function()
{
	if (arguments.length == 0) return this;
	for (var s = this, i = 0; i < arguments.length; i++)
		s = s.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
	return s;
}

String.prototype.getByteLength = function()
{
	return this.replace(/[^\x00-\xff]/g, "mm").length;
}

if (!window.attachEvent && window.addEventListener) {
	Window = typeof Window == "undefined" ? function() {} : Window;
	Window.prototype.attachEvent = HTMLDocument.prototype.attachEvent =
		HTMLElement.prototype.attachEvent = function(en, func, cancelBubble)
		{
			this.addEventListener(en.toLowerCase().substr(2), func, cancelBubble);
		}
	Window.prototype.detachEvent = HTMLDocument.prototype.detachEvent =
		HTMLElement.prototype.detachEvent = function(en, func, cancelBubble)
		{
			this.removeEventListener(en.toLowerCase().substr(2), func, cancelBubble);
		}
}

if (typeof(HTMLElement) != "undefined" && !window.opera)
{
	var t = HTMLElement.prototype;
	t.__defineGetter__("children", function()
		{
			for (var a = [], j = 0, n, i = 0; i < this.childNodes.length; i++)
			{
				n = this.childNodes[i];
				if (n.nodeType == 1)
				{
					a[j++] = n;
					if (n.name)
					{
						if (!a[n.name]) a[n.name] = [];
						a[n.name][a[n.name].length] = n;
					}
					if (n.id) a[n.id] = n;
				}
			}
			return a;
		}
	);
	t.insertAdjacentHTML = function(where, html)
	{
		var e = this.ownerDocument.createRange();
		e.setStartBefore(this);
		e = e.createContextualFragment(html);
		switch (where)
		{
			case 'beforeBegin': this.parentNode.insertBefore(e, this); break;
			case 'afterBegin': this.insertBefore(e, this.firstChild); break;
			case 'beforeEnd': this.appendChild(e); break;
			case 'afterEnd':
				if (!this.nextSibling)
					this.parentNode.appendChild(e);
				else this.parentNode.insertBefore(e, this.nextSibling); 
				break;
		}
	}
}

(
	function()
	{
		var t = document.getElementsByTagName("SCRIPT");
		t = t[t.length-1].src.replace(/\\/g, "/");
		CsdnUbbEditor.path = (t.lastIndexOf("/")<0) ? "." : t.substring(0, t.lastIndexOf("/"));
	}
)	();

CsdnUbbEditor.loadCssFile(CsdnUbbEditor.path + "/CsdnUbbEditor.css", "CsdnUbbEditor_CSS");

CsdnUbbEditor.contentCounter = function(hashcode)
{
	var box = CsdnUbbEditor.check("wordCounter_" + hashcode);
	if (box)
	{
		var editor = CsdnUbbEditor.instance(hashcode);
		var n = editor.contentLength - editor.editor.value.length;
		if (!isIE) box.innerHTML = n;
		box.parentNode.style.color = n >= 0 ? "" : "#FF0000";
	}
}

CsdnUbbEditor.disable = function(input, hashcode)
{
	var editor = CsdnUbbEditor.instance(hashcode);
	editor.menubar.style.display = input.checked ? "none" : "";
};


CsdnUbbEditor.prototype.initialize = function()
{
	if (!this.editor) return;
	var me = this;
	this.editor.onkeyup = function() { CsdnUbbEditor.contentCounter(me.hashCode); }
	this.editor.onfocus = function() { CsdnUbbEditor.contentCounter(me.hashCode); }
	this.editor.className += " CsdnUbbEditor";

	if (this.editor.form && isIE && !window.opera)
	{
		this.editor.form.attachEvent("onsubmit", function()
		{
			var e = CsdnUbbEditor.check(me.pasteInputId);
			if (e)
			{
				setCookie("UBBContentToClipboard", e.checked);
				if (e.checked) window.clipboardData.setData("Text", me.editor.value);
			}
		});
	}

	this.editor.insertAdjacentHTML("beforeBegin",
		"<div class='CsdnUbbEditorMenubar' id='CsdnUbbEditorMenubar_" + this.hashCode + "' " + (this.disabled ? " style='display: none'" : "") + "></div>");
	this.editor.insertAdjacentHTML("afterEnd",
		"<div class='CsdnUbbEditorStatusbar' id='CsdnUbbEditorStatusbar_" + this.hashCode + "'></div>");
	this.menubar = CsdnUbbEditor.check("CsdnUbbEditorMenubar_" + this.hashCode);
	this.statusbar = CsdnUbbEditor.check("CsdnUbbEditorStatusbar_" + this.hashCode);

	this.colorLayer();
	this.codeLayer();
	this.fontsizeLayer();
};

CsdnUbbEditor.prototype.codeLayer = function()
{
	var item = "<div title='\u8bed\u8a00\u79cd\u7c7b\uff1a{0}' onclick=\"CsdnUbbEditor.instance('" +
		this.hashCode + "').code('{0}')\">{0}</div>";
	var div = document.createElement("DIV"), a = [], me=this;
	div.className = "CsdnUbbEditorCodeLayer";
	div.style.display="none";
	div.id = "CsdnUbbEditorCodeLayer_" + this.hashCode;
	div.onclick = function(e) { (window.event||e).cancelBubble = true; }
	var language = CsdnUbbEditor.defaultLanguage();
	if (language != "")
	{
		var item2 = "<div title='\u9ED8\u8BA4\u8BED\u8A00{0}' onclick=\"CsdnUbbEditor.instance('" +
			this.hashCode + "').code('{0}')\"><b>{0}</b></div>";
		a.push(item2.format(language));
	}
	a.push(item.format("Assembly"));
	//a.push(item.format("BatchFile"));
	a.push(item.format("C#"));
	a.push(item.format("C/C++"));
	a.push(item.format("CSS"));
	a.push(item.format("HTML"));
	//a.push(item.format("INIFile"));
	a.push(item.format("Java"));
	a.push(item.format("JScript"));
	//a.push(item.format("Lua"));
	//a.push(item.format("MSIL"));
	a.push(item.format("Delphi(Pascal)"));
	a.push(item.format("Perl"));
	a.push(item.format("PHP"));
	a.push(item.format("Python"));
	a.push(item.format("SQL"));
	a.push(item.format("VB"));
	a.push(item.format("VB.NET"));
	a.push(item.format("VBScript"));
	//a.push(item.format("XAML"));
	a.push(item.format("XML"));

	a = a.join("");
	div.innerHTML = a;
	document.body.insertBefore(div, document.body.firstChild);
	document.attachEvent("onclick", function() { me.hideLayer(div.id); } );
};

CsdnUbbEditor.prototype.fontsizeLayer = function()
{
	var item = "<td title='size:{0}' onclick=\"CsdnUbbEditor.instance('" + this.hashCode + "').fontsize('{0}')\">{0}</td>";
	var div = document.createElement("DIV"), a = [], me = this;
	div.className = "CsdnUbbEditorFontsizeLayer";
	div.style.display = "none";
	div.id = "CsdnUbbEditorFontsizeLayer_" + this.hashCode;
	div.onclick = function(e) { (window.event || e).cancelBubble = true; }
	a.push("<table border='0' cellpadding='0' cellspacing='6'>");
	a.push("<tr>");
	a.push(item.format("10px"));
	a.push(item.format("11px"));
	a.push(item.format("12px"));
	a.push(item.format("13px"));
	a.push("</tr>");
	a.push("<tr>");
	a.push(item.format("14px"));
	a.push(item.format("16px"));
	a.push(item.format("18px"));
	a.push(item.format("24px"));
	a.push("</tr>");
	a.push("</table>");
	a=a.join("");
	div.innerHTML = a;
	document.body.insertBefore(div, document.body.firstChild);
	document.attachEvent("onclick", function() { me.hideLayer(div.id); } );
};

CsdnUbbEditor.prototype.colorLayer = function()
{
	var s = "<td title=\"{1}\" onclick=\"CsdnUbbEditor.instance('" + this.hashCode + 
		"').color('{0}')\" style=\"background-color: {0}\">&nbsp;</td>"
	var div = document.createElement("DIV"), a = [], me = this;
	div.className = "CsdnUbbEditorColorLayer";
	div.style.display = "none";
	div.id = "CsdnUbbEditorColorLayer_" + this.hashCode;
	div.onclick = function(e) { (window.event || e).cancelBubble = true; }
	a.push("<table border='0' cellpadding='0' cellspacing='6'>");
	a.push("<tr>");
	a.push(s.format("#000000", "\u9ed1\u8272"));
	a.push(s.format("#993300", "\u8910\u8272"));
	a.push(s.format("#333300", "\u6a44\u6984\u8272"));
	a.push(s.format("#003300", "\u6df1\u7eff"));
	a.push(s.format("#003366", "\u6df1\u9752"));
	a.push(s.format("#000080", "\u6df1\u84dd"));
	a.push(s.format("#333399", "\u975b\u84dd"));
	a.push(s.format("#333333", "\u7070\u8272-80%"));
	a.push("</tr>");
	a.push("<tr>");
	a.push(s.format("#800000", "\u6df1\u7ea2"));
	a.push(s.format("#FF6600", "\u6a59\u8272"));
	a.push(s.format("#808000", "\u6df1\u9ec4"));
	a.push(s.format("#008000", "\u7eff\u8272"));
	a.push(s.format("#008080", "\u7eff\u8272"));
	a.push(s.format("#0000FF", "\u84dd\u8272"));
	a.push(s.format("#666699", "\u84dd-\u7070"));
	a.push(s.format("#808080", "\u7070\u8272-50%"));
	a.push("</tr>");
	a.push("<tr>");
	a.push(s.format("#FF0000", "\u7ea2\u8272"));
	a.push(s.format("#FF9900", "\u6d45\u6a59"));
	a.push(s.format("#99CC00", "\u9178\u6a59"));
	a.push(s.format("#339966", "\u6d77\u7eff"));
	a.push(s.format("#33CCCC", "\u6c34\u7eff\u8272"));
	a.push(s.format("#3366FF", "\u6d45\u84dd"));
	a.push(s.format("#800080", "\u7d2b\u7f57\u5170"));
	a.push(s.format("#999999", "\u7070\u8272-40%"));
	a.push("</tr>");
	a.push("<tr>");
	a.push(s.format("#FF00FF", "\u7c89\u7ea2"));
	a.push(s.format("#FFCC00", "\u91d1\u8272"));
	a.push(s.format("#FFFF00", "\u9ec4\u8272"));
	a.push(s.format("#00FF00", "\u9c9c\u7eff"));
	a.push(s.format("#00FFFF", "\u9752\u7eff"));
	a.push(s.format("#00CCFF", "\u5929\u84dd"));
	a.push(s.format("#993366", "\u6885\u7ea2"));
	a.push(s.format("#C0C0C0", "\u7070\u8272-25%"));
	a.push("</tr>");
	a.push("<tr>");
	a.push(s.format("#FF99CC", "\u7396\u7470\u7ea2"));
	a.push(s.format("#FFCC99", "\u8336\u8272"));
	a.push(s.format("#FFFF99", "\u6d45\u9ec4"));
	a.push(s.format("#CCFFCC", "\u6d45\u7eff"));
	a.push(s.format("#CCFFFF", "\u6d45\u9752\u7eff"));
	a.push(s.format("#99CCFF", "\u6de1\u84dd"));
	a.push(s.format("#CC99FF", "\u6de1\u7d2b"));
	a.push(s.format("#FFFFFF", "\u767d\u8272"));
	a.push("</tr>");
	a.push("<tr>");
	a.push("<td colspan='8' title='\u683c\u5f0f\uff1a #RRGGBB'>");
	a.push("<input size='7' class='text' maxlength='7' value='#' />");
	a.push("<input type='button' class='button' onclick=\"CsdnUbbEditor.instance('" + this.hashCode + 
		"').customColor(this)\" value='\u786e \u5b9a' /></td>");
	a.push("</tr>");
	a.push("</table>");
	a = a.join("");
	div.innerHTML = a;
	document.body.insertBefore(div, document.body.firstChild);
	document.attachEvent("onclick", function(){me.hideLayer("CsdnUbbEditorColorLayer_" + me.hashCode);});
};

var t = "<a><input onfocus='this.blur()' type='button' title='{2}' value=' ' class='menuitem {1}' onclick='CsdnUbbEditor.instance(\"{0}\").execCommand(event, \"{1}\", this)' /></a>";
CsdnUbbEditor.directorHTML = 
{
	fontsize : t.format("{0}", "fontsize", "\u5b57\u4f53\u5927\u5c0f"),
	bold : t.format("{0}", "bold", "\u7c97\u4f53"),
	italic : t.format("{0}", "italic", "\u659c\u4f53"),
	underline :	t.format("{0}", "underline", "\u4e0b\u5212\u7ebf"),
	strikethrough :	t.format("{0}", "strikethrough", "\u5220\u9664\u7ebf"),
	color : t.format("{0}", "color", "\u5b57\u4f53\u989c\u8272"),
	code : t.format("{0}", "code", "\u63d2\u5165\u6e90\u4ee3\u7801"),
	url : t.format("{0}", "url", "\u63d2\u5165\u8d85\u94fe\u63a5"),
	email : t.format("{0}", "email", "\u63d2\u5165\u7535\u5b50\u90ae\u4ef6\u5730\u5740"),
	image : t.format("{0}", "image", "\u63d2\u5165\u56fe\u7247"),
	swf : t.format("{0}", "swf", "\u63d2\u5165 FLASH"),
	movie : t.format("{0}", "movie", "\u63d2\u5165\u5f71\u97f3\u5a92\u4f53\u6587\u4ef6\u94fe\u63a5"),
	left : t.format("{0}", "left", "\u5de6\u5bf9\u9f50"),
	right : t.format("{0}", "right", "\u53f3\u5bf9\u9f50"),
	center : t.format("{0}", "center", "\u5c45\u4e2d\u5bf9\u9f50"),
	help : "<a><input onfocus='this.blur()' type='button' title='help' value=' ' class='menuitem help' onclick='CsdnUbbEditor.instance(\"{0}\").help()' /></a>", 
	space : "<input onfocus='this.blur()' type='button' title='' value=' ' class='menuitem space' disabled='true' />",
	increase : "<a><input onfocus='this.blur()' type='button' title='\u653e\u5927\u7f16\u8f91\u533a' value=' ' class='menuitem increase' onclick='CsdnUbbEditor.instance(\"{0}\").increase()' /></a>",
	decrease : "<a><input onfocus='this.blur()' type='button' title='\u7f29\u5c0f\u7f16\u8f91\u533a' value=' ' class='menuitem decrease' onclick='CsdnUbbEditor.instance(\"{0}\").decrease()' /></a>"
}

CsdnUbbEditor.director = 
{
	 fontsize : { open: "[size={0}]", close: "[/size]" },
	 bold : { open: "[b]", close: "[/b]" },
	 italic : { open: "[i]", close: "[/i]" },
	 underline : { open: "[u]", close: "[/u]" },
	 strikethrough : { open: "[del]", close: "[/del]" },
	 color : { open: "[color={0}]", close: "[/color]" },
	 code : { open: "[code={0}]", close: "[/code]" },
	 url : { open: "[url={0}]", close: "[/url]" },
	 email : { open: "[email={0}]", close: "[/email]" },
	 image : { open: "[img={0}]", close: "[/img]" },
	 swf : { open: "[swf={0}]", close: "[/swf]" },
	 movie : { open: "[movie={0}]", close: "[/movie]" },
	 left : { open: "[align=left]", close: "[/align]" },
	 right : { open: "[align=right]", close: "[/align]" },
	 center : { open: "[align=center]", close: "[/align]" }
};

CsdnUbbEditor.prototype.render = function(ubblist)
{
	if ("string" != typeof(ubblist) || ubblist.length == 0)
	{
		ubblist = "fontsize|space|bold|italic|underline|strikethrough|color|code|space" +
			"|url|email|image|swf|movie|space|left|center|right|space|help|increase|decrease";
	}
	if (this.helpLink) ubblist += "|space|help";
	ubblist = ubblist.split("|");
	var a = []; 
	for (var i = 0; i < ubblist.length; i++)
	{
		var s = CsdnUbbEditor.directorHTML[ubblist[i].toLowerCase()] || "";
		a.push(s.format(this.hashCode));
	}
	a = a.join("");
	this.menubar.innerHTML = a;
	a = (Math.random() + "").substr(2);
	s =	"<span>" + (isIE ? "\u60A8\u53EA\u80FD\u8F93\u5165" : "\u60A8\u8FD8\u53EF\u8F93\u5165") + " <strong id='wordCounter_" + this.hashCode + "'>" +
		this.contentLength + "</strong> \u4e2a\u5b57\u7b26</span><input type='checkbox' name='CsdnUbbEditorDisabled' value='true' " +
		(this.disabled ? " checked='checked'" : "") + " onclick='CsdnUbbEditor.disable(this, \"" +
		this.hashCode + "\")' id='disable_" + a + "' /><label for='disable_" + a + "'>\u7981\u7528UBB</label>&nbsp;&nbsp;&nbsp;";
	if (isIE && !window.opera)
		s += "<input type='checkbox' id='paste_" + a + "' /><label for='paste_" + a + "'>\u5185\u5bb9\u5b58\u5165\u526a\u8d34\u677f</label><br/>"
	s += "<div style='clear: both'></div>";
	this.pasteInputId = "paste_" + a;
	this.statusbar.innerHTML = s;
};

function setCookie(name,value)
{
	var Days = 30;
	var exp	= new Date();
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";domain=csdn.net";
}

function getCookie(name)
{
	var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
	if (arr != null) return unescape(arr[2]);
	return null;
}

CsdnUbbEditor.prototype.wraptag = function(open, close)
{
	this.editor.focus();
	if (document.selection)
	{
		if (this.selection.range)
		{
			this.selection.range.text = open + this.selection.range.text + close;
			this.selection.range.select();
		}
	}
	else if (typeof(this.editor.selectionStart) != "undefined")
	{
		var ss = this.selection.start;
		var se = this.selection.end;
		var st = this.selection.top;
		if (ss <= se)
		{
			var s = this.editor.value;
			var left = s.substring(0, ss);
			var center = s.substring(ss, se);
			var right = s.substring(se, s.length);
			center = open + center + close;

			this.editor.value = left + center + right;
			ss += center.length;
			this.editor.selectionStart = ss;
			this.editor.selectionEnd = ss;
			this.editor.scrollTop = st;
		}
	}
}

CsdnUbbEditor.prototype.execCommand = function(e, ubbtag, trigger)
{
	(window.event || e).cancelBubble=true;
	var e = CsdnUbbEditor.director[ubbtag];
	if ("undefined" == typeof(e)) return;
	this.editor.focus();
	this.selection = {};
	if (document.selection)
	{
		var sel = document.selection;
		var rng = sel.createRange();
		if (rng && rng.parentElement() == this.editor) this.selection.range = rng;
	}
	else if (typeof(this.editor.selectionStart) != "undefined")
	{
		this.selection.start = this.editor.selectionStart;
		this.selection.end = this.editor.selectionEnd;
		this.selection.top = this.editor.scrollTop;
	}
	else
	{
		alert("your browser is not support Range");
		return;
	}

	var open = e.open, close = e.close;
	switch (ubbtag)
	{
		case "url":
			var s = prompt("\u8f93\u5165\u5b8c\u6574\u7684\u94fe\u63a5\u5730\u5740", "http://");
			if (s == null) return;
			open = open.format(s);
			break;
		case "email":
			var s = prompt("\u8f93\u5165\u90ae\u4ef6\u5730\u5740\uff1a mailname@mailhost.com", "");
			if (!/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(s)) return;
			if (s == null) return;
			open = open.format(s);
			break;
		case "image":
			var s = prompt("\u8f93\u5165\u56fe\u7247\u7684\u5b8c\u6574\u5730\u5740", "http://");
			if (s == null) return;
			open = open.format(s);
			break;
		case "swf":
			var s = prompt("\u8f93\u5165 FLASH \u6587\u4ef6\u7684 URL \u5730\u5740", "http://");
			if (s == null) return;
			open = open.format(s);
			break;
		case "movie":
			var s = prompt("\u8f93\u5165\u5f71\u97f3\u5a92\u4f53\u6587\u4ef6\uff08WMA\uff0cWMV\uff0cMP3\uff0cRM\uff0cRAM\u7b49\uff09\u7684 URL \u5730\u5740", "http://");
			if (s == null) return; 
			open = open.format(s);
			break;
		case "fontsize":
			this.fontsizelayer(trigger);
			return;
		case "code": 
			this.codelayer(trigger);
			return;
		case "color":
			this.colorlayer(trigger);
			return; 
	}
	this.wraptag(open, close);
}

CsdnUbbEditor.prototype.increase = function()
{
	if ("undefined" == typeof(this.originalEditorHeight))
		this.originalEditorHeight = this.editor.offsetHeight;
	this.editor.style.height = (this.editor.offsetHeight + 100) + "px";
}

CsdnUbbEditor.prototype.decrease = function()
{
	if ("undefined" == typeof(this.originalEditorHeight)) return;
	var n = this.editor.offsetHeight - 100;
	n = n < this.originalEditorHeight ? this.originalEditorHeight : n;
	this.editor.style.height = n + "px";
}

CsdnUbbEditor.prototype.help = function()
{
	if (this.helpLink) window.open(this.helpLink, "_blank");
}

CsdnUbbEditor.prototype.colorlayer = function(button)
{
	var xy = CsdnUbbEditor.realOffset(button);
	var layer = CsdnUbbEditor.check("CsdnUbbEditorColorLayer_" + this.hashCode);
	layer.style.top = (xy.y + button.offsetHeight) + "px";
	layer.style.left = xy.x + "px";
	this.showLayer(layer);
}

CsdnUbbEditor.prototype.showColorLayer = function()
{
	var layer = CsdnUbbEditor.check("CsdnUbbEditorColorLayer_" + this.hashCode);
	if (layer.style.display!="none") return;
	layer.style.display="";
}

CsdnUbbEditor.prototype.hideColorLayer = function()
{
	var layer = CsdnUbbEditor.check("CsdnUbbEditorColorLayer_" + this.hashCode);
	if (layer.style.display == "none") return;
	layer.style.display = "none";
}

CsdnUbbEditor.prototype.color = function(color)
{
	this.hideLayer("CsdnUbbEditorColorLayer_" + this.hashCode);
	var rule = CsdnUbbEditor.director["color"];
	this.wraptag(rule.open.format(color), rule.close);
}

CsdnUbbEditor.prototype.customColor = function(button)
{
	var input = button.parentNode.childNodes[0];
	if (!/^#[\da-f]{6}$/i.test(input.value))
	{
		input.select();
		return;
	}
	this.color(input.value);
};

CsdnUbbEditor.prototype.codelayer = function(button)
{
	var xy = CsdnUbbEditor.realOffset(button);
	var layer = CsdnUbbEditor.check("CsdnUbbEditorCodeLayer_" + this.hashCode);
	layer.style.top = (xy.y + button.offsetHeight) + "px";
	layer.style.left = xy.x + "px";
	this.showLayer(layer);
};

CsdnUbbEditor.prototype.code = function(lang)
{
	this.hideLayer("CsdnUbbEditorCodeLayer_" + this.hashCode);
	var rule = CsdnUbbEditor.director["code"];
	this.wraptag(rule.open.format(lang), rule.close);
};

CsdnUbbEditor.prototype.fontsizelayer = function(button)
{
	var xy = CsdnUbbEditor.realOffset(button);
	var layer = CsdnUbbEditor.check("CsdnUbbEditorFontsizeLayer_" + this.hashCode);
	layer.style.top = (xy.y + button.offsetHeight) + "px";
	layer.style.left = xy.x + "px";
	this.showLayer(layer);
};

CsdnUbbEditor.prototype.fontsize = function(size)
{
	this.hideLayer("CsdnUbbEditorFontsizeLayer_" + this.hashCode);
	var rule = CsdnUbbEditor.director["fontsize"];
	this.wraptag(rule.open.format(size), rule.close);
};

CsdnUbbEditor.prototype.showLayer = function(layer)
{
	var layer = CsdnUbbEditor.check(layer);
	if (layer.style.display != "none") return;
	layer.style.display = "";
};

CsdnUbbEditor.prototype.hideLayer = function(layer)
{
	var layer = CsdnUbbEditor.check(layer);
	if (layer && layer.style.display == "none") return;
	layer.style.display = "none";
};
