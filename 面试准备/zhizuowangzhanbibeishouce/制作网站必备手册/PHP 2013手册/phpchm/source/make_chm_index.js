document.onkeyup = keyUp;

$(function (){
    if($('.next a').attr('href') === 'copyright.html' && !$('.prev a').attr('href')){
            $('.prev a').attr('href','fancy-index.html');
            $('.prev a').html(' ◊“≥');
    }
    $('a').click(function (){
        if($(this).attr('href').indexOf('http') >= 0){
            $(this).text('º”‘ÿ÷–...');
        }
        
        return true;
    })
})

function keyUp(e) {   
   var currKey=0,e=e||event;   
   currKey=e.keyCode||e.which||e.charCode;   
   var keyName = String.fromCharCode(currKey);
   if(currKey == 37){
      var prev = $('.prev a').attr('href');
      if(prev){
        js_header(prev);
      }
   }
   if(currKey == 39){
      var next = $('.next a').attr('href');
      if(next)
        js_header(next);
   }
}

function js_header(url){
    window.location = url;
}