"use strict";
var addSelectors = window.addSelectors;
var $ = window.$;
var addTagstoProjects = window.addTagstoProjects;
var updateShowFormBy = window.updateShowFormBy;
var handlerEventOrderProjects = window.handlerEventOrderProjects;
var handlerEventPresentationFormat = window.handlerEventPresentationFormat;
/* exported capitalizeFirstLetter*/

window.onload = function() {
	// start selectPicker from bootstrap
	addSelectors();
	$('.selectpicker').selectpicker();

	// update data from projects
	addTagstoProjects();
	updateShowFormBy();

	// startAnimation();
	Animation.checkEachSecond();
	uploadScreenshotsProjects();
	showingCV();
	// handler events 
	handlerTopMenu();
	handlerEventOrderProjects();
	handlerEventPresentationFormat();
	handlerContactList();
};

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function linkToContact(type) {
	if (type == "mail") {
		window.open('mailto:renzosegurapm@gmail.com');
	} else if (type == "github") {
		window.open('https://github.com/rsegura93');
	} else if (type == "home") {
		location.href = location.href;
	} else if (type == "cv") {
		var base_url = location.href.replace(/#(.*)/,"");
		base_url = base_url.replace(/(index.html(.*))/,"");
		window.open(base_url + "/assets/docs/CV%20RenzoSegura.pdf");
	} else if (type == "#proyectos") {
		var base_url = location.href.replace(/index.html#{0,1}(.*)/,"index.html");
		location.href = base_url + "#proyectos";
	}
}

function handlerContactList() {
	$(".footer-menu ul>li").click(function() {
		var type = $(this).find("label").
		attr("class").replace("icon ", "");
		linkToContact(type);
	});
	$("#info .photoaround").click(function(){
		($(this).find("a").length>0)?
			linkToContact("#proyectos"):
			(function(){})();
	});
}

function handlerTopMenu() {
	// $(".top-menu .menu").hover(showMenu);
	$(".top-menu .menu").click(showMenu);
}

function showMenu() {
	var desplegable = $(this).find("ul");
	if (desplegable.hasClass("hidden")) {
		desplegable.removeClass("hidden");
	} else {
		desplegable.addClass("hidden");
	}
}

function startAnimation(){
	var opaco = "opaco";
	var bouncing ="bounce-2";
	var photo = $("#info #photo");
	var iconsPhoto = $("#info .photoaround");
	var proyButton = $($("#info .buttons .btn1")[0]);
	var knowButton = $($("#info .buttons .btn1")[1]);
	(function start(){
		appearingIconsAround(photo, iconsPhoto);
		photo.removeClass(opaco);
		photo.addClass(bouncing);
		setTimeout(function(){
			proyButton.removeClass(opaco);
			proyButton.addClass(bouncing);
			knowButton.removeClass(opaco);
			knowButton.addClass(bouncing);
			setTimeout(function(){
				fadeOut(iconsPhoto);
				setTimeout(function(){
					fadeIn(iconsPhoto);
				},1000);
			}, 1000);
		}, 2000);
	})();
}

function fadeOut(icons){
	icons.removeClass("fadein");
	icons.addClass("fadeout");
}
function fadeIn(icons){
	icons.removeClass("fadeout");
	icons.addClass("fadein");
}
function appearingIconsAround(photo, iconsPhoto){
	photo.mouseenter(function(){fadeOut(iconsPhoto);});
	photo.mouseleave(function(){fadeIn(iconsPhoto);});
	iconsPhoto.mouseenter(function(){fadeOut($(this));});
	iconsPhoto.mouseleave(function(){fadeIn($(this));});
}

function showingCV(){
	$("#photo").click(function(){
		linkToContact("cv");
	});
	$("#iconCV").click(function(){
		linkToContact("cv");		
	});
}

function uploadScreenshotsProjects(){
	var contProj, options = {};
	for(var class_project in images_src ){
		contProj = $("." + class_project )
			.find("div.containerScreenshots");
		// if(){
		options = images_src[class_project][2]?
					images_src[class_project][2]:{};
		// }
		for( var hidden, index_name = 1, i = 0;
				i < images_src[class_project][1];
				i++, index_name++ ){
			(index_name == images_src[class_project][1])?
				hidden = 'active': hidden = 'hidden';
			var imagen = $("<img class='"+hidden+" img-project'>").attr("src",
							images_src[class_project][0]+
							"G"+index_name+".png");
			contProj.append(imagen);
		}
		Animation.animaciones.push(new Animation(contProj, options));
	}
}