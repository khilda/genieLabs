//스크롤 기능


$(document).ready(function() {

  $('.topLink').hide();

  $(window).scroll(function(){
    if ($(this).scrollTop() > 200){
      $('.topLink').show();
    } else{
      $('.topLink').hide();
    }
  });

  $('body').smoothScroll({
    offset: -137,
    delegateSelector: 'aside.menuLink ul li a'
  });

  $('body').smoothScroll({
    //offset: -137,
    delegateSelector: 'aside.topLink a'
  });

  $('body').smoothScroll({
    offset: -127,
    delegateSelector: 'nav ul li ul li a'
  });

  
  
});



