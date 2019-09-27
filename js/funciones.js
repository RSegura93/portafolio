window.onload = function(){
	// $(".top-menu .menu
	// $(".top-menu .menu").on("click",function(){
	$(".top-menu .menu").hover( function(){
		var desplegable = $(this).find("ul");
		if( desplegable.hasClass("hidden") ){
			desplegable.removeClass("hidden")
		}else{
			$(this).find("ul").addClass("hidden");
		}
	});

	// start selectPicker from bootstrap
	addSelectors();
	$('.selectpicker').selectpicker();
	// getValuesForm();
	addTagstoProjects();
	updateShowFormBy ( );
	handlerEventOrderProjects();
	handlerEventPresentationFormat();
	handlerContactList();
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function linkToContact( type ){
	if( type == "mail" ) {
		window.open('mailto:renzosegurapm@gmail.com');
	}else if( type == "github" ) {
		window.open('https://github.com/rsegura93');
	}else if( type == "home" ) {
		location.href=location.href;
	}
}


function handlerContactList(){
	$(".footer-menu ul>li").click(function(){
		var type = $(this).find("label").
					attr("class").replace("icon ", "");
		linkToContact ( type );
	})
}