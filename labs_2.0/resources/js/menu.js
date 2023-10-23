// 메인메뉴 

$(document).ready(function(){
	$("nav>ul>li").each(function(){
		initialiseNav(this);
	});
	$("nav>ul>li>a").bind("mouseenter",function(){
		hideAllNav();
		showChildNav(this);
	//	$('header .layer_bg').show();
	});
	$("nav>ul>li>a").bind("mouseleave",function(){
	});
	$("nav").bind("mouseleave",function(){
		hideAllNav();
		showCurrentNav();
	});

});


$( function() {
$(".openCloseMenu").click(function() {
    $(".openCloseMenu").toggleClass( "openMenu" );
    $("body").toggleClass( "openMenu" );
  });
} );

  

function initialiseNav(navitem){
	//centre of this button
	var widthone = 0;
	widthone = $(navitem).outerWidth();
	widthone = widthone/2;
	$(navitem).prevUntil('ul').each(function() {
		widthone = widthone + ($(this).outerWidth());
	});

	//width of subnav
	var widthtwo = 0;
	$(navitem).find("li").each(function() {
		widthtwo = widthtwo + ($(this).outerWidth());
	});
	widthtwo = widthtwo/2;

	//calculate margin
	var marginvalue = 0;
	marginvalue = widthone - widthtwo;

	if(marginvalue>0){
		//set left margin of first subnav item only if it isn't negative
		//$(navitem).children("ul").find("li").first().css("margin-left", marginvalue);
	}
}

function hideAllNav(menu){
	$("nav ul ul").removeClass("on fix");
	$("nav ul ul").addClass("off");
//	$('header .layer_bg').hide();
}

function showChildNav(actOnMe){
	$("nav li").removeClass("MenuVisible");
	$(actOnMe).parent("li").find("ul").removeClass("off");
	$(actOnMe).parent("li").find("ul").addClass("on fix");
	$(actOnMe).parent("li").not($("li.here")).find("ul").bind("mouseenter",function(){
		$(this).parent("li").addClass("MenuVisible");
	}).bind("mouseleave",function(){
		$(this).parent("li").removeClass("MenuVisible");
	});
}
function showCurrentNav(){
	//only do this if it is currently hidden
	if($("nav li.here ul").hasClass("off")){
		$("nav li.here ul").removeClass("off");
		$("nav li.here ul").addClass("on fix");
	//	$('header .layer_bg').show();
	}
}