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
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}