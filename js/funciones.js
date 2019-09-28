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
	}
}

function handlerContactList() {
	$(".footer-menu ul>li").click(function() {
		var type = $(this).find("label").
		attr("class").replace("icon ", "");
		linkToContact(type);
	});
}

function handlerTopMenu() {
	$(".top-menu .menu").hover(function() {
		var desplegable = $(this).find("ul");
		if (desplegable.hasClass("hidden")) {
			desplegable.removeClass("hidden");
		} else {
			$(this).find("ul").addClass("hidden");
		}
	});
}