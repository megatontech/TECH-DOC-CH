<?php
/*
    chm目录中的文件都是gbk编码, 请注意.
    本php文件为utf-8, 所以你看得到函数许多时间都会做编码转换.
    评论文件试了多次, 都无法转成gbk. 似乎没影响(先记录一下).
    2012-07-10 修复搜索时乱码问题.
*/
    header('Content-type: text/html; charset=utf-8');
    $date = date('md');
    define('ISNOTE', true); // 是否带评论
    define('MANUAL_TITLE','PHP Manual 2013中文手册[分享工作室编译'.$date.']');
    define('WINRAR_PATH','C:/Program Files/WinRAR/'); // winrar路径
    
    # 建议大家不要修改以下路径
    define('CHARSET', 'gbk'); // html文件一定要是gbk. 请勿修改.
    define('CHM_PATH', './chm/');
    define('HTML_PATH', './php-chunked-xhtml/'); // 将html放入这个目录.
    define('SOURCE_PATH', './source/');
 ?>
 
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8" />
	<meta http-equiv="content-type" content="text/html" />
	<meta name="author" content="www.fenanr.com" />
	<title>PHP 手册生成解析器</title>
    <style type="text/css">
        span{ background-color: #E5E5E5; border: 1px solid gray; display: block; padding: 8px;}
    </style>
</head>

<body style="font-size: 12px; line-height: 2em;">
<?php
    $x = 'x';
    error_reporting(0);
    set_time_limit(0);
    
    $act = $_GET['act'];
    if($_GET['source']){
        $act = 1;
        $x = 'source';
    }
    
    if($_GET['t']){
        switch ($_GET['act']){
            case 1:
               echo '结果如下: ';
               if(is_dir(CHM_PATH) === false){
                    mkdir(CHM_PATH, 0777);
               }
               if(is_dir(CHM_PATH.'note/') === false){
                    mkdir(CHM_PATH.'note/', 0777);
               }
               
               if(is_dir(CHM_PATH.'res/') === false){
                    mkdir(CHM_PATH.'res/', 0777);
               }
               
               if(is_dir(HTML_PATH) === false){
                    mkdir(HTML_PATH, 0777);
               }
                
               if(is_dir(SOURCE_PATH) === false){
                    $ERR .= HTML_PATH.'目录不可缺少!<br />';
               }
               
               if(!function_exists('mb_convert_encoding')){
                    $ERR .= 'mb_convert_encoding 未开启! <br />';
               }
               
               if(ISNOTE && is_file(SOURCE_PATH.'all') === false){
                    $ints = file_put_contents(SOURCE_PATH.'all.bz2', get_curl('http://php.net/backend/notes/all.bz2'));
                     $bz=bzopen(SOURCE_PATH.'all.bz2', 'r');
                      $data="";
                      do {
                        $line=bzread($bz, 8092);
                        if($line!==false)
                          $data.=$line;
                      }
                      while($line);
                      bzclose($bz);
                    
                    if($data)
                    $data = mb_convert_encoding($data, 'utf-8', 'auto');
                    $ints = file_put_contents(SOURCE_PATH.'all',$data);
                    unlink(SOURCE_PATH.'all.bz2');
                    $ERR .= '下载all文件共计'. sprintf('%0.2f',$ints / 1024 / 1024).'MB <br />';
               }
               
               if(is_file(SOURCE_PATH.'all') === false)
                    $ERR .= '请在:'.SOURCE_PATH.'目录中放入用户评论文件: all,<br />all 下载地址: <a href="http://php.net/backend/notes/all.bz2">http://php.net/backend/notes/all.bz2</a> (解压后得到all) <br />';
               
               // 这是手册的下载链接: http://www.php.net/distributions/manual/php_manual_en.tar.gz
               
               if(true){
                   if(is_file(SOURCE_PATH.'php_manual_zh.tar.gz') === false){
                       $ints = file_put_contents(SOURCE_PATH.'php_manual_zh.tar.gz', get_curl('http://www.php.net/distributions/manual/php_manual_zh.tar.gz'));
                       if(is_dir(WINRAR_PATH) === false){
                        $ERR .= '配置Winrar路径,实现在线解压. <br />'; 
                       }else{
                           $s = exec($t = '"'.WINRAR_PATH.'WinRAR.exe" x '.SOURCE_PATH.'php_manual_zh.tar.gz -y '.realpath('./').'/', $info, $err);
                           if($err != 0){
                               $ERR .= 'php_manual_zh.tar.gz 文件已经下载成功, 请解压! <br />'; 
                           }
                       }
                   }
                   
                   $filelist = scandir(HTML_PATH);
                    
                   if(count($filelist) < 10000)
                        $ERR .= '请在:'.HTML_PATH.'目录中放入html文件等信息(用source/php_manual_zh.tar.gz文件解压, 配置Winrar路径,实现在线解压.)<br />';
                   
                   if(is_file(SOURCE_PATH.'php_manual_zh.tar.gz') === false && !$ints)
                        $ERR .= 'html源包 下载地址: <a href="http://www.php.net/download-docs.php">http://www.php.net/download-docs.php</a>下载(china Many HTML files解压得到'.HTML_PATH.'目录) <br />';
               }
               
               if(!$ERR){
                    $ERR = '检测正常! 请进行下一步!';
               }else{
                    $ERR .= '请不要强行进入第二步! 刷新再次检测.';
               }
               exit($ERR);
               break;
            case 2:
                function two_run(){
                    $publication_date = date('Y-m-d H:i:s');
                    // 处理掉make_chm_index文件, 其实可以省略.
                    $content = file_get_contents(SOURCE_PATH."make_chm_index.html");
                    
                    if(!is_dir(CHM_PATH.'res/images/'))
                            mkdir(CHM_PATH.'res/images/');
                        clearstatcache();
                        # copy img
                        $filelist = scandir(HTML_PATH.'images/');
                        foreach($filelist AS $val){
                            if($val == '.' || $val == '..')
                                continue;
                            copy(HTML_PATH.'images/'.$val,CHM_PATH.'res/images/'.$val);
                        }
                
                    // Make GENTIME the actual date/time 
                    $content = str_ireplace("[GENTIME]", date("D M d H:i:s Y"), $content);
                    $content = str_ireplace("[PUBTIME]", $publication_date, $content);
                    $content = strtr($content, array('<?dbtimestamp format="y"?>'=>date("Y")));
                    $content = strtr($content, array('<meta charset="utf-8" />'=>'<meta charset="'.CHARSET.'" />'."\n <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />"));
                    $jsstr = '<script src="jquery-1.10.2.min.js" type="text/javascript"></script>';
                    $jsstr .= '<script src="index.js" type="text/javascript"></script>';
                    $content = strtr($content, array('</body>'=>$jsstr.'</body>'));
                    $content = mb_convert_encoding($content,'gbk', 'utf-8');
                    file_put_contents(CHM_PATH."res/fancy-index.html", $content);
                    
                    // copy两个文件.
                    copy(SOURCE_PATH."make_chm_style.css", CHM_PATH."res/style.css");
                    copy(SOURCE_PATH."make_chm_spc.gif", CHM_PATH."res/spacer.gif");
                    copy(SOURCE_PATH."make_chm_index.js", CHM_PATH."res/index.js");
                    copy(SOURCE_PATH."jquery-1.10.2.min.js", CHM_PATH."res/jquery-1.10.2.min.js");
                    copy(SOURCE_PATH."chm_search.html", CHM_PATH."res/chm_search.html");
                    copy(SOURCE_PATH."ieframe.dll", CHM_PATH."res/ieframe.dll");
                    copy(SOURCE_PATH."dialog-warning.png", CHM_PATH."res/images/dialog-warning.png");
                    echo 'ieframe.dll 文件处理完成<br />';
                    echo 'make_chm_index.js 文件处理完成<br />';
                    echo 'jquery-1.10.2.min.js 文件处理完成<br />';
                    echo 'chm_search.html 文件处理完成<br />';
                    echo 'make_chm_style.css 文件处理完成<br />';
                    echo 'make_chm_spc.gif 文件处理完成<br />';
                    echo 'make_chm_index.html 文件处理完成<br />';
                }
                                
                if($_GET['t'] === 'source'){
                    two_run();
                    exit();
                }

                # 处理评论
                // http://php.net/backend/notes/all.bz2
                $notecount = regnote();
                echo '共处理评论:'.$notecount.'条! <br />';
                
                // Get ENV vars from the system
                $original_index = "index.html";
                $counter = 0;
                // Open the directory, and do the work on all HTML files
                $handle = opendir(HTML_PATH);
                while (false !== ($filename = readdir($handle))) {
                    if (strpos($filename, ".html") && ($filename != "fancy-index.html")) {
                        $counter += fancy_design($filename);
                    }
                }
                echo '共处理html:'.$counter.'条! <br />';
                
                two_run();
                echo '请执行下一步!';
                exit();
                break;
            case 3:
                $HEADER = '<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML//EN">
<html>
<head>
  <meta name="generator" content="PHP 5.5.0 - Auto TOC script">
  <!-- Sitemap 1.0 -->
</head>
<body>
  <object type="text/site properties">
    <param name="Window Styles" value="0x800227">
  </object>';
                $INDEX_IN_HTML = "index.html";
                makeProjectFile();
                makeContentFiles();
                echo '执行成功!<br />';
                echo '编译地址: '. realpath(CHM_PATH).'\\php_manual_zh.hhp <br />';
                echo '请执行下一步!';
                exit();
                break;
            case 4:
                echo '请下载安装HTML Help Workshop: <a href="http://msdn.microsoft.com/en-us/library/ms669985.aspx">http://msdn.microsoft.com/en-us/library/ms669985.aspx</a><br />';
                echo '<img style="width: 720px;" src="./source/1.jpg" /><br />';
                echo '先点击打开, 然后指向下面的编译路径, 然后就点击蓝色指示点击编译即可.<br />';
                echo '<img style="width: 720px;" src="./source/2.jpg" /><br />';
                echo '速度有点慢, 慢慢等待完成. 切勿中途取消!<br />';
                echo '编译地址: '. realpath(CHM_PATH).'\\php_manual_zh.hhp <br />';
                echo '编译出来的chm放在: '. realpath(CHM_PATH).'目录中. <br />';
                exit();
                break;
            case 5:
                delDirAndFile(CHM_PATH);
                delDirAndFile(HTML_PATH);
                @mkdir(CHM_PATH, 0777);
                @mkdir(HTML_PATH, 0777);
                @unlink(SOURCE_PATH.'all');
                @unlink(SOURCE_PATH.'php_manual_zh.tar.gz');
                exit();
                break;
        }   
    }
?>
<div style="margin: 30px; margin-bottom:0px; width: 800px;">
    <h3>PHP轻松制作教程手册 <a href="./">首页</a></h3>
    <?php if($act < 1) {?>
    <span><a href="./index.php?act=1">第一步配置检测工作</a></span><br />
    <?php } ?>
    <?php if($act < 2) {?>
    <span><a href="./index.php?act=2">第二步文件重组工作</a> [<a href="./index.php?act=2&source=1" style="color: red;" title="当修改完source文件后, 可以点击此功能同步过去.">source目录文件重组</a>] </span><br />
    <?php } ?>
    <?php if($act < 3) {?>
    <span><a href="./index.php?act=3">第三步手册解析工作</a></span><br />
    <?php } ?>
    <?php if($act < 4) {?>
    <span><a href="./index.php?act=4">第四步手册编译工作</a></span><br />
    <?php } ?>
    
    <?php if($act < 5) {?>
    <span><a href="./index.php?act=5">第五步还原默认 (可选功能)</a></span><br />
    <?php } ?>
    
    * 执行时间有点长, 请耐心等候!, <a target="_blank" href="<?php echo CHM_PATH;?>res/">html查看</a>
    </div>
    <?php if($_GET['act'] && !$_GET['t']){?>
    <h3 style="margin-left: 30px;">执行开始, 请等待结果...</h3>
    <iframe src="./index.php?act=<?php echo $_GET['act'];?>&t=<?php echo $x;?>" style="width: 800px; font-size: 12px; margin-left: 30px; height: 600px; border: none; border: 1px solid silver;"></iframe>
    <?php } ?>
</body>
</html>
<?php

# 下载文件函数.
function get_curl($send_url){
    return file_get_contents($send_url);
}

# 第三步函数

// 编译步骤的第一步, 此函数会调用findDeeperLinks, 假如你要修改, 请注意格式.
function makeContentFiles(){
    global $LANGUAGE,  $HEADER,
           $HTML_PATH, $INDEX_IN_HTML, $FIRST_PAGE, $FANCY_PATH;
    
    if(is_file(CHM_PATH."php_manual_zh.hhc"))
        @unlink(CHM_PATH."php_manual_zh.hhc");
    if(is_file(CHM_PATH."php_manual_zh.hhc"))
        @unlink(CHM_PATH."php_manual_zh.hhk");
    $toc   = fopen(CHM_PATH."php_manual_zh.hhc", "w"); // 树
    $index = fopen(CHM_PATH."php_manual_zh.hhk", "w"); // 索引
    
    // Write out file headers
    fputs_wrapper($toc,   $HEADER);
    fputs_wrapper($index, $HEADER);
    fputs_wrapper($index,   '<ul>');

    findDeeperLinks($INDEX_IN_HTML,$toc, $index);
    
    fputs_wrapper($index, "  </ul>\n</body>\n</html>");
    fputs_wrapper($toc,   "  </ul>\n</body>\n</html>");
    
    fclose($index);
    fclose($toc);
} // makeContentfiles() function end

# 检查是否有下一层. 由findDeeperLinks函数引起.
function checklink($filename){
    static $savelist = array();
    if($savelist[$filename])
        return $savelist[$filename];
    $contents = file_get_contents( CHM_PATH."res/$filename");
    $contents = mb_convert_encoding($contents, 'utf-8','auto');
    $data = strtr($contents, array('</li>'=>'</li>'."\n", '</ul>'=>"</ul>\n", '<ol'=>'<ul'));
    preg_match('#<ul class=.*</ul>#is', $data, $reg);
    $data = $reg[0];
    
    $data = preg_replace('#(<li>.*)<ul class=.*</ul>[^<]*</li>#isU',  '$1',$data);
    
    # 匹配出链接及名字
    preg_match_all('#<li><a href="([^"]*)">(.*)</a>#isU', $data, $reg);
    
    if(is_array($reg) && $reg[1]){
        $data = true;
    }else{
        $data = false;
    }
    
    return $savelist[$filename] = $data;
}

// 遍历res/目录中的所有文件. 函数会递归.
function findDeeperLinks ($filename, $toc, $index){
    static $savelist = array();
    static $i= 0;
    
    if($savelist[$filename]){
        return 0;
    }
    
    $contents = file_get_contents(CHM_PATH."res/$filename");
    $contents = mb_convert_encoding($contents, 'utf-8','gbk');
    $savelist[$filename] = 1;
    
    $data = strtr($contents, array('</li>'=>'</li>'."\n", '</ul>'=>"</ul>\n", '<ol'=>'<ul'));
    preg_match('#<ul class=.*</ul>#is', $data, $reg);
    $data = $reg[0];
    $data = preg_replace('#(<li>.*)<ul class=.*</ul>[^<]*</li>#isU',  '$1',$data);
    
    # 匹配出链接及名字
    preg_match_all('#<li><a href="([^"]*)">(.*)</a>#isU', $data, $reg);
    
    if($reg[1]){
        fputs_wrapper($toc, "\n\r         <UL>\n\r");
        foreach($reg[1] AS $key => $val){
            $link = $reg[1][$key];
            $name = $reg[2][$key];
        
            if(strpos($link, '#') !== false){
                $link = $filename.$link;
            }
            
            $top = 0;
            $cls = '11';
            if( strpos($link, '#') === false){
                if($tt = checklink($link)){
                    // 即有下层.
                    $cls = 'auto';
                    $top = 1;
                }
            }
            
            if($i == 0){
                mapAndIndex('PHP中文手册', 'fancy-index.html', "", $toc, $index,'27');
                mapAndIndex('PHP在线搜索', 'chm_search.html', "", $toc, $index,'15');
            }
            $i++;
            
            mapAndIndex($name, $link, "                ", $toc, $index,$cls);
            if($top === 1){
                findDeeperLinks($link, $toc, $index);
            }
        }
        fputs_wrapper($toc, "\n\r         </UL>\n\r");
    }
} // findDeeperLinks() function end


// 函数为生成编译的树及索引功能, 请不要修改. 
/* 索引文件比较好理解, 就是ul, li的套圈, 而$toc树的生成就不同了.
<li> 第一层
  <ul> 除第一层后, 其它层需要<ul>
     <li> 里面数据, 请不要用</li>结束符. 
  </ul>
*/
function mapAndIndex($name, $local, $tabs, $toc, $index, $imgnum = "auto"){
    $name = str_replace('"', '&quot;', $name);
    
    # 计算出绝对路径, 编译需要.
    static $spath = 0, $i = 0;
    if(!$spath)
        $spath = realpath(CHM_PATH.'res');
    $i ++;
    
    fputs_wrapper($toc, "
$tabs<li><object type=\"text/sitemap\">
$tabs  <param name=\"Name\" value=\"$name\">
$tabs  <param name=\"Local\" value=\"".($spath)."\\$local\">
");
    
    // 可指定图标.
    if ($imgnum != "auto") {
        fputs_wrapper($toc, "$tabs  <param name=\"ImageNumber\" value=\"$imgnum\">\r\n");
    }
    
    fputs_wrapper($toc, "$tabs  </object>\r\n");
    fputs_wrapper($index, "
    <li><object type=\"text/sitemap\">
      <param name=\"Local\" value=\"".($spath)."\\$local\">
      <param name=\"Name\" value=\"$name\">
    </object></li>
");

} // mapAndIndex() function end

// 生成编译的.hhp文件, 此文件为索引文件. 
function makeProjectFile(){
    global $LANGUAGE, $MANUAL_TITLE, $LANGUAGES,
           $HTML_PATH, $INDEX_IN_HTML,
           $FIRST_PAGE;
    
    static $FANCY_PATH = 0;
    if(!$FANCY_PATH)
        $FANCY_PATH = realpath(CHM_PATH.'res/');
    
    $FIRST_PAGE = "fancy-index.html";
    $FIRST_PAGEP = ($FANCY_PATH) . "\\$FIRST_PAGE";
    
    if(is_file(CHM_PATH."php_manual_zh.hhp"))
        @unlink(CHM_PATH."php_manual_zh.hhp");
    
    if(ISNOTE){
        $note = 'review';
    }else{
        $note = 'notreview';
    }
    
    // Start writing the project file
    $project = fopen(CHM_PATH."php_manual_zh.hhp", "w");
    fputs_wrapper($project, "[OPTIONS]\n");
    fputs_wrapper($project, "Compatibility=1.1 or later\n");
    fputs_wrapper($project, "Compiled file=php_manual_zh_{$note}.chm\n");
    fputs_wrapper($project, "Contents file=php_manual_zh.hhc\n");
    fputs_wrapper($project, "Index file=php_manual_zh.hhk\n");
    fputs_wrapper($project, "Default Window=phpdoc\n");
    fputs_wrapper($project, "Default topic=$FIRST_PAGEP\n");
    fputs_wrapper($project, "Display compile progress=Yes\n");
    fputs_wrapper($project, "Full-text search=Yes\n");

    // Get the proper language code from the array
    fputs_wrapper($project, "Language=0x804 Simplified Chinese\n");
    $MANUAL_TITLE =  MANUAL_TITLE;
   
    fputs_wrapper($project, "Title=$MANUAL_TITLE\n");
    fputs_wrapper($project, "Default Font=simsun,10,0\n");
    
    // Define the phpdoc window style (adds more functionality)
    fputs_wrapper($project, "\n[WINDOWS]\nphpdoc=\"$MANUAL_TITLE\",\"php_manual_zh.hhc\",\"php_manual_zh.hhk\"," .
          "\"$FIRST_PAGEP\",\"$FIRST_PAGEP\",,,,,0x23520,,0x386e,,,,,,,,0\n");

    // Write out all the filenames as in FANCY_PATH
    fputs_wrapper($project, "\n[FILES]\n");
    $handle = opendir($FANCY_PATH);
    while (false !== ($file = readdir($handle))) {
        if ($file != "." && $file != ".." && strpos($file,'.') !== false) {
            fputs_wrapper($project, ($FANCY_PATH)."\\$file\n");
        }
    }

    clearstatcache();
    # copy img
    $filelist = scandir(CHM_PATH.'res/images/');
    foreach($filelist AS $val){
        if($val == '.' || $val == '..')
            continue;
        fputs_wrapper($project, ($FANCY_PATH)."\\images\\$val\n");
    }

    fclose($project);
    closedir($handle);
    
} // makeProjectFile() function end

// 写入文件, 仅在第三步功能中使用, 所以需要转成gbk.
function fputs_wrapper($fp, $content){
    $content = mb_convert_encoding($content, 'gbk','utf-8');
    return fputs($fp, $content);
}
##################################################

# 函数开始. 第二步内容

// 评论转化为html,
function regnote(){
    if(is_dir(CHM_PATH.'note/') === false)
        @mkdir(CHM_PATH.'note/', 0777);
    if(ISNOTE && is_file(SOURCE_PATH.'all')){
        $fp = fopen(SOURCE_PATH.'all','rb');
        $new = array();
        while($string = fgets($fp)){
            list($id,$sect,$rate,$ts,$user,$note) = explode('|', $string);
            $note = base64_decode($note);
            $ts = makeEntry($ts,$user,$note);
            if($ts){
                $new[$sect][] = $ts;
            }
        }
        fclose($fp);
        
        foreach($new AS $key => $val){
            
            foreach($val AS $k => $v){
                $i = $k+1;
                $val[$k] = strtr($v, array('[#=#]'=>'<span class="floor">[#'.$i.']</span>'));
            }
            
            $data = implode("\n",$val);
            $data = mb_convert_encoding($data, 'gbk', 'utf-8');
            file_put_contents(CHM_PATH.'note/'.$key.'.html', $data);
        }
        
        return count($new);
    }
    return 0;
}

// html转换. 重点函数. 函数过后, 评论就被加入了.
function fancy_design($fname){
    global $FANCY_PATH;
    $content = file_get_contents(HTML_PATH.$fname);
    $content = mb_convert_encoding($content,'utf-8','auto');
    
    if($fname === 'index.html'){
        $dstr = date('Y-m-d');
        $content = preg_replace('#<div class="pubdate">2013-07-05</div>#isU','<div class="pubdate">'.$dstr.'</div>',$content);
    }
    
    // css file linking
    $content = preg_replace("|</head|i", '<link rel="stylesheet" href="style.css" /></head', $content);
    $content = preg_replace('/[\n]{2,}/is','', $content);
    
    $content = strtr($content, array('<meta http-equiv="content-type" content="text/html; charset=UTF-8">'=>'<meta http-equiv="content-type" content="text/html; charset=gbk">'));
    $content = strtr($content,array('<meta http-equiv="content-type" content="text/html; charset=gbk">'=>'<meta charset="'.CHARSET.'" />'));
    $content = strtr($content,array('<meta http-equiv="content-type" content="text/html; charset=gbk" />'=>'<meta charset="'.CHARSET.'" />'));
    
    # 评论加入.
    $dates = date('Y-m-d');
    $wrpath = CHM_PATH.'note/'.$fname;
    if( ISNOTE && is_file($wrpath)){
        $data = file_get_contents($wrpath);
        $data = '<div id="usernote"><h3>用户评论:</h3>'.$data.'</div><div id="sfooter"><a href="http://www.fenanr.com/" target="_blank">&copy; 分享工作室</a> 编译于:'.$dates.'</div>';
    }
    
    $content = strtr($content, array('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">'=>'<!DOCTYPE HTML>'));
    $content = strtr($content, array('<meta charset="'.CHARSET.'" />'=>'<meta charset="'.CHARSET.'" />'."\n <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />"));
    $jsstr = '<script src="jquery-1.10.2.min.js" type="text/javascript"></script>';
    $jsstr .= '<script src="index.js" type="text/javascript"></script>';
    $content = strtr($content, array('</body>'=>$data.$jsstr.'</body>'));
    $sname = strtr($fname, array('.html'=>''));
    # 替换
    $content = strtr($content, array('<div class="home"><a href="index.html">PHP Manual</a></div>'=>'
    <div class="home"><div class="linktosite">在线手册：<a href="chm_search.html#ac='.$sname.'&lang=zh">中文</a>&nbsp;
    <a href="chm_search.html#ac='.$sname.'&lang=en">英文</a></div><div class="lefthome"><a href="index.html">PHP手册</a></div><div class="clear"></div></div>'));
    
    $content = mb_convert_encoding($content,'gbk', 'utf-8');
    file_put_contents(CHM_PATH."res/$fname", $content);
    return 1;
}

# 评论数据处理函数.
function makeEntry($date, $name, $blurb){
    $blurb = trim($blurb);
    if(!$blurb)
        return false;
    // Begin user notes header
    $entryhtml = "<div><p class=\"unheader\">[#=#]\n";

    // Get email/name of the user note writer
    $name = htmlspecialchars($name);
    if ($name && $name != "php-general@lists.php.net" && $name != "user@example.com") {
        if (preg_match("#(.+)@(.+)\.(.+)#is", $name)) {
            $entryhtml .= "<a href=\"mailto:$name\" class=\"useremail\"><span>$name</span></a>";
        } else {
            $entryhtml .= "<span class=\"notetitle\">$name</span>";
        }
    }
    // Append date
    $entryhtml .= " [<span>" . date("Y-m-d H:i:s", $date) . "</span>]</p>\n";
    // Append user note text, cleared
    $entryhtml .= "<p class=\"untext\">" . clean_note($blurb) . "</p></div>\n";
    // Return with entry HTML fragment
    return $entryhtml;
}

# 主要是php代码高亮需要.先保护数据.
function enbase64reg($match){
    if($match[0]){
        return '[base]'.base64_encode($match[0]).'[/base]';
    }
}
# php代码高亮需要.再解开数据.
function debase64reg($match){
    if($match[1]){
        $match[1] = base64_decode($match[1]);
        if(stripos($match[1], '<?php') === false)
            $match[1] = str_replace('<?', '<?php', $match[1]);
        
        $data = highlight_string($match[1], true);
        $data = '<span class="phpcode">'.$data.'</span>';
        return $data;
    }
}


// 主要是为数据添加换行, 高亮等工作.
function clean_note($text) {
    $text = (trim($text));
    $text = strtr($text, array('<php'=>'<?php'));
    $text = preg_replace("/([*|#|\/][^\n]*)\?\>/isU",'$1?#=#>', $text);
    $text = preg_replace("/\[code\](.*)\[\/code\]/isU",'$1', $text);
    $text = preg_replace_callback('/\<\?.*\?\>/isU', 'enbase64reg', $text);

    $text = htmlspecialchars($text);
    $text = strtr($text, array(' '=>'&nbsp;'));
    $text = nl2br($text); // 先换行, 再高亮.
    
    $text = preg_replace_callback('/\[base\](.*)\[\/base\]/isU', 'debase64reg', $text);
    $text = strtr($text, array('?#=#>'=>'?>','?#=#&gt;'=>'?>'));
    return $text;
}
#第二步内容函数完成.


function delDirAndFile( $dirName ){
    if ( $handle = opendir($dirName) ) {
       while ( false !== ( $item = readdir( $handle ) ) ) {
       if ( $item != "." && $item != ".." ) {
               if ( is_dir( "$dirName/$item" ) ) {
                    delDirAndFile( "$dirName/$item" );
               } else {
                    if(!unlink( "$dirName/$item" ))
                    if(!unlink( "$dirName/$item" ))
                    if(!unlink( "$dirName/$item" ))
                    if(!unlink( "$dirName/$item" ))
                      echo 'not '."$dirName/$item";
               }
       }
    }
       closedir( $handle );
       if( rmdir( $dirName ) )echo "成功删除目录： $dirName<br />\n";
    }
}