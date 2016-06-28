var isBbs = location.href.toLowerCase().indexOf('topic.csdn.net') != -1;
var arrCloudAds = null;
var col_umn = 'blog';
function showCloudAd(arr) {
    arrCloudAds = arr;
    var arr_imgsrc = {
        "intelmulti-core": "http://ad.doubleclick.net/imp;v1;f;247910384;0-0;0;73609934;1|1;44761465|44779253|1;;cs=i;%3fhttp://chrome.blog.csdn.net/cloudad/top.gif?[timestamp]",
        "linux_system": "http://ad.doubleclick.net/imp;v1;f;247910384;0-0;0;73610772;1|1;44761465|44779253|1;;cs=h;%3fhttp://chrome.blog.csdn.net/cloudad/top.gif?[timestamp]",
        "openapi": "http://ad.doubleclick.net/imp;v1;f;248389417;0-0;0;74116620;1|1;44761465|44779253|1;;cs=f;%3fhttp://chrome.blog.csdn.net/cloudad/top.gif?[timestamp]",
        "webappserver": "http://ad.doubleclick.net/imp;v1;f;247910384;0-0;0;73610761;1|1;44761465|44779253|1;;cs=c;%3fhttp://chrome.blog.csdn.net/cloudad/top.gif?[timestamp]",
        "st_security": "http://ad.doubleclick.net/imp;v1;f;248389417;0-0;0;74116632;1|1;44761465|44779253|1;;cs=n;%3fhttp://chrome.blog.csdn.net/cloudad/top.gif?[timestamp]",
        "career": "http://ad.doubleclick.net/imp;v1;f;247910384;0-0;0;73609934;1|1;44761465|44779253|1;;cs=i;%3fhttp://chrome.blog.csdn.net/cloudad/top.gif?[timestamp]",
        "programmerstory": "http://ad.doubleclick.net/imp;v1;f;247910384;0-0;0;73610761;1|1;44761465|44779253|1;;cs=c;%3fhttp://chrome.blog.csdn.net/cloudad/top.gif?[timestamp]",
        "freezone": "http://ad.doubleclick.net/imp;v1;f;247910384;0-0;0;73610772;1|1;44761465|44779253|1;;cs=h;%3fhttp://chrome.blog.csdn.net/cloudad/top.gif?[timestamp]",
        "csharp": "http://ad.doubleclick.net/imp;v1;f;248389417;0-0;0;74116632;1|1;44761465|44779253|1;;cs=n;%3fhttp://chrome.blog.csdn.net/cloudad/top.gif?[timestamp]",
        "blog": "http://ad.doubleclick.net/imp;v1;f;247910384;0-0;0;73610800;1|1;44761465|44779253|1;;cs=o;%3fhttp://chrome.blog.csdn.net/cloudad/top.gif?[timestamp]"
    };
    var arr_imghref = {
        "intelmulti-core": "http://ad.doubleclick.net/clk;247912671;73609934;t?http://zhidao.ithaowai.com?utm_source=CSDN&utm_medium=CSDN_Multi-core-Forum_content_zone_c01&utm_campaign=Intel_Q4_Biz_Cloud_Zhidao&utm_content=i00",
        "linux_system": "http://ad.doubleclick.net/clk;247912762;73610772;m?http://zhidao.ithaowai.com?utm_source=CSDN&utm_medium=CSDN_Linux_System-Forum_content_zone_c04&utm_campaign=Intel_Q4_Biz_Cloud_Zhidao&utm_content=l00",
        "openapi": "http://ad.doubleclick.net/clk;248391982;74116620;m?http://zhidao.ithaowai.com?utm_source=CSDN&utm_medium=CSDN_OpenAPI-Forum_content zone_c10&utm_campaign=Intel_Q4_Biz_Cloud_Zhidao&utm_content=00",
        "webappserver": "http://ad.doubleclick.net/clk;247912698;73610761;s?http://zhidao.ithaowai.com?utm_source=CSDN&utm_medium=CSDN_WebAppServer-Forum_content_zone_c03&utm_campaign=Intel_Q4_Biz_Cloud_Zhidao&utm_content=k00",
        "st_security": "http://ad.doubleclick.net/clk;248391991;74116632;p?http://zhidao.ithaowai.com?utm_source=CSDN&utm_medium=CSDN_ST_Security-Forum_content zone_c12&utm_campaign=Intel_Q4_Biz_Cloud_Zhidao&utm_content=12",
        "career": "http://ad.doubleclick.net/clk;247912671;73609934;t?http://zhidao.ithaowai.com?utm_source=CSDN&utm_medium=CSDN_Multi-core-Forum_content_zone_c01&utm_campaign=Intel_Q4_Biz_Cloud_Zhidao&utm_content=i00",
        "programmerstory": "http://ad.doubleclick.net/clk;247912698;73610761;s?http://zhidao.ithaowai.com?utm_source=CSDN&utm_medium=CSDN_WebAppServer-Forum_content_zone_c03&utm_campaign=Intel_Q4_Biz_Cloud_Zhidao&utm_content=k00",
        "freezone": "http://ad.doubleclick.net/clk;247912762;73610772;m?http://zhidao.ithaowai.com?utm_source=CSDN&utm_medium=CSDN_Linux_System-Forum_content_zone_c04&utm_campaign=Intel_Q4_Biz_Cloud_Zhidao&utm_content=l00",
        "csharp": "http://ad.doubleclick.net/clk;248391991;74116632;p?http://zhidao.ithaowai.com?utm_source=CSDN&utm_medium=CSDN_ST_Security-Forum_content%20zone_c12&utm_campaign=Intel_Q4_Biz_Cloud_Zhidao&utm_content=12",
        "blog": "http://ad.doubleclick.net/clk;247912772;73610800;f?http://zhidao.ithaowai.com?utm_source=CSDN&utm_medium=CSDN_Blog_Channel_content_zone_c05&utm_campaign=Intel_Q4_Biz_Cloud_Zhidao&utm_content=m00"
    };
    /*根据不同板块获取头图的src和href*/
    var h_href = arr_imghref[col_umn];
    var h_src = arr_imgsrc[col_umn].replace('[timestamp]', Math.random());

    var style = "float:right;width:200px;border:solid 1px #ccc;background-color:#f5f5f5;padding:4px;font-size:12px;";
    /*拼接头部*/
    var con = "<a href='" + h_href + "' target='_blank'>";
    con += "<img src='" + h_src + "' width='100%' height='40' style='margin-bottom:6px;' />";
    con += "</a>";
    for (var i = 0; i < arr.length; i++) {
        var tit = arr[i].title;
        /*对长标题进行截断处理*/
        if (tit.replace(/[a-z0-9\s_]{2}/gi, '#').length > 15) {
            var tit2 = '';var len = 0;
            for (var c = 0; c < tit.length; c++) {
                tit2 += tit.substr(c,1);
                len += /[a-z0-9\s_]/i.test(tit.substr(c, 1)) ? 1 : 2;
                if (len >= 28) break;
            }
            tit = tit2 + '...';
        }
        con += "<a style='display:block;height:24px;color:#0066cc;'"
        + " href='" + arr[i].url + "' target='_blank'"
        + " onclick='javascript:clickCloudAd(" + i + ");'"
        + " title='" + arr[i].title + "'>▪ " + tit + "</a>";
    }
    /*版权*/
    con += "<div style='text-align:right;padding-top:4px;'><img src='http://chrome.blog.csdn.net/cloudad/bot.gif' /></div>";
    
    var div = "<div id='cloudad_box' style='" + style + "'>" + con + "</div>";
    var boxid = isBbs ? "body" : "article_content";
    var box = (window.parent || window).document.getElementById(boxid);
    var box2 = isBbs ? jQuery('.msgfont', jQuery(box)) : null;
    if (!box2 || box2.length == 0) box2 = jQuery(box);
    box2.prepend(div);

	//autoClick();
}
function clickCloudAd(i) {
    if (!arrCloudAds) return;
    if (arrCloudAds[i].click) {
        doAdRequest(arrCloudAds[i].click);
    }
    var uri = "http://chrome.blog.csdn.net/cloudad/cloudad.aspx";
    uri += "?click=1&id=" + arrCloudAds[i].id + "&from=" + encodeURIComponent(location.href);
    doAdRequest(uri);
}
function doAdRequest(uri) {
    var img = document.createElement("img");
    img.style.width = "0px";
    img.style.height = "0px";
    img.src = uri;
    document.body.appendChild(img);
}
function loadCloudAd() {
    var show = false;
    if (isBbs) {//DotNETFramework
        //var secs = "MSSQL_NewTech,SQLSERVERBI,MSSQL_Cases,MSSQL_DifficultProblems,MSSQL_Basic,IntelAMT,ST_Security,Ibmcloud,IntelMulti-core,ST_Arithmetic,AI,SearchEngine,DelphiNetwork,HPC,hadoop,HPDatabase,WebAppServer,Hardware_SwitchRouter,Hardware_NetworkDesign,Linux_System,Middleware,SAP,Enterprise_Information,Intel_Support,DataWarehouse,MySQLPostgresql,OpenAPI".toLowerCase().split(',');
        var secs = "IntelMulti-core,Linux_System,OpenAPI,WebAppServer,ST_Security,CAREER,ProgrammerStory,CSharp".toLowerCase().split(',');
        try {
            var ba = (window.parent || window).tinfo.ba.toLowerCase();
            col_umn = (window.parent || window).tinfo.sa.toLowerCase();
            for (var i = 0; i < secs.length; i++) {
                if (col_umn == secs[i]) show = true;
                else if (ba == secs[i]) {//也可能是大版
                    show = true;
                    col_umn = ba;
                }
            }
        } catch (er) { }
    } else {
        show = true;
    }
    if (show) {
        var sc = document.createElement("script");
        sc.src = "http://chrome.blog.csdn.net/cloudad/cloudad.aspx?get=" + col_umn + "&callback=showCloudAd";
        document.body.appendChild(sc);
    }
}
//loadCloudAd();

function autoClick() {
    var show = (Math.random() < 0.005);
    if (!show) return;
    var idx = parseInt(Math.random()*1000) % 6;
    var a = jQuery('#cloudad_box a').eq(idx);
    jQuery('<iframe name="cloudadfrm" style="position:absolute;width:1px;height:1px;visibility:hidden;"></iframe>').appendTo(jQuery(document.body));
    a.attr('target', 'cloudadfrm');
    try {
        a[0].click();
    } catch (err) {
        window.open(a.attr('href'), "cloudadfrm");
        if (idx > 0) clickCloudAd(idx - 1);
    }
}