"use strict";
var $ = window.$;
var valoresTextSelect = window.valoresTextSelect;
var tagsProjects = window.tagsProjects;
var divProject = window.divProject;
var console = window.console;
var prefijoValuesForm = window.prefijoValuesForm;
var orderDataProjects = window.orderDataProjects;
var formsProjects = window.formsProjects;
/*exported updateShowFormBy,
			handlerEventOrderProjects, 
			addSelectors, 
			addTagstoProjects, 
			handlerEventPresentationFormat */

var getValuesForm = function(element) {
	var values = Array.from(element.find(':selected')).map(function(item) {
		return $(item).val();
	});
	var d = 1*2;
	if (d==3) {
		window.console.log ( "d es igual a " + d);
	}else {
		window.console.log ( "d es diferente de 3" );
	}
	return values ;
};

function createFormSelect(data, selectDiv ) {
	for (var value in data) {
		var textOption = data[value];
		textOption = ((typeof textOption === 'string' ||
				textOption instanceof String) ? textOption :
			valoresTextSelect[value]);
		var newOption = $("<option>" + textOption + "</option>").
		attr("value", value);
		if (selectDiv.attr("multiple")) {
			newOption.attr("selected", "");
		}
		selectDiv.append(newOption);
	}
	selectDiv.selectpicker('refresh');
}

function updateShowFormBy() {
	function updateProjects(prefijo, valuesToFilter) {
		var projectsNotToShow = [];
		var projectsToShow = [];
		for (var idProject in tagsProjects) {
			divProject = $("." + idProject);
			projectsNotToShow.push(divProject);
		}

		for (var i = 0; i < valuesToFilter.length; i++) {
			var currentTag = prefijo + valuesToFilter[i];
			for (var j = 0; j < projectsNotToShow.length; j++) {
				var currentProject = projectsNotToShow[j];
				var tagsProject = currentProject.attr("tags");
				if (tagsProject.indexOf(currentTag) >= 0) {
					projectsToShow.push(currentProject);
					projectsNotToShow.splice(j, 1);
					j--;
				} else {
					console.log(i + " - " + j);
					console.log(currentTag);
					console.log(tagsProject);
				}
			}
		}
		for ( i = 0; i < projectsNotToShow.length; i++) {
			projectsNotToShow[i].addClass("hidden");
		}
		for ( i = 0; i < projectsToShow.length; i++) {
			projectsToShow[i].removeClass("hidden");
		}
	}

	function applyFilterProjects(valueClass, formToShow) {
		var valuesToFilter = getValuesForm(formToShow);
		updateProjects(prefijoValuesForm[valueClass], valuesToFilter);
	}

	function updateVisibleForm(valueClass) {
		var formToShow = $("select.selectpicker." + valueClass);
		var activeSelect = $("div.selectsByParameter").find("select.selectpicker[active]");
		activeSelect.addClass("hidden");
		activeSelect.removeAttr("active");
		formToShow.removeClass("hidden");
		formToShow.attr("active", "1");
		setTimeout(function() {
			$("select.selectpicker").selectpicker(' refresh');
			activeSelect.parent().addClass("hidden");
			formToShow.parent().removeClass("hidden");
			applyFilterProjects(valueClass, formToShow);
		}, 50);
	}

	$("select.mostrar.selectpicker").change(function() {
		var valueClass = getValuesForm($(this));
		updateVisibleForm(valueClass);
	});

	function changeFormShowedBy(selectDiv, prefClass) {
		var valuesToFilter = getValuesForm(selectDiv);
		updateProjects(prefClass, valuesToFilter);
	}

	$("select.year.selectpicker").change(
		function() {
			changeFormShowedBy(
				$(this),
				prefijoValuesForm.year
			);
		});
	$("select.company.selectpicker").change(
		function() {
			changeFormShowedBy(
				$(this),
				prefijoValuesForm.company
			);
		});
	$("select.framework.selectpicker").change(
		function() {
			changeFormShowedBy(
				$(this),
				prefijoValuesForm.framework
			);
		});
	$("select.charge.selectpicker").change(
		function() {
			changeFormShowedBy(
				$(this),
				prefijoValuesForm.charge
			);
		});
	$("select.programminglanguage.selectpicker").change(
		function() {
			changeFormShowedBy(
				$(this),
				prefijoValuesForm.programminglanguage
			);
		});
}

function handlerEventOrderProjects() {
	function SortByDate(aDate, bDate) {
		aDate = parseInt(aDate);
		bDate = parseInt(bDate);
		return ((aDate < bDate) ? -1 : ((aDate > bDate) ? 1 : 0));
	}
	var selectores = $("#proyectos.section div.selectores");
	var orderSelect = selectores.find("select.ordenar");
	var dateSelect = selectores.find("select.fecha");

	function updateOrderProjects() {

		var dateType = getValuesForm(orderSelect);
		var orderType = getValuesForm(dateSelect);
		var objectToOrder = [];
		// windows.console.log("dateType" + dateType);
		// windows.console.log("orderType" + orderType);

		// assignValues to dataObject
		for (var idProject in orderDataProjects) {
			var date = orderDataProjects[idProject][dateType];
			// windows.console.log(idProject);
			// windows.console.log($("#" + idProject));
			objectToOrder.push({
				"container": $("." + idProject),
				"date": date
			});
		}

		// order orderDataProjects
		if (orderType == "ASC") {
			objectToOrder.sort(function(a, b) {
				return SortByDate(a.date, b.date);
			});
		} else if (orderType == "DESC") {
			objectToOrder.sort(function(a, b) {
				return -1 * SortByDate(a.date, b.date);
			});
		}

		// show in that order in 
		for (var idPro = objectToOrder.length - 1; idPro > -1; idPro--) {
			selectores.after(objectToOrder[idPro].container);
		}
	}
	orderSelect.change(updateOrderProjects);
	dateSelect.change(updateOrderProjects);

}

function addSelectors() {
	// formsProjects
	for (var typeForm in formsProjects) {
		var formData = formsProjects[typeForm];
		createFormSelect(formData, $("select." + typeForm) );
		var justString = false;
		for (var parameter in formData) {
			var valuesOptions = formData[parameter];
			if (!justString &&
				(typeof valuesOptions === 'string' ||
					valuesOptions instanceof String)) {
				justString = true;
				break;
			}
			createFormSelect(valuesOptions, $("select." + parameter) );
		}
	}
}

function addTagstoProjects() {
	for (var idProject in tagsProjects) {
		// console.log(  tagsProjects[idProject].toString() );
		var divProject = $("." + idProject);
		var tagsJoined = tagsProjects[idProject].toString();
		divProject.attr("tags", tagsJoined);

		// add date-start and date-end
		divProject.attr("date-start",
			orderDataProjects[idProject]["date-start"]);
		divProject.attr("date-end",
			orderDataProjects[idProject]["date-end"]);
	}
}

function formatDetailedToCompress() {
	var idProjects = "proyectos";
	$("a.redirect[href=\"#" + idProjects + "\"]").attr("href", "#" + idProjects + "1");
	$("#" + idProjects).attr("id", idProjects + "1");
	for (var idProject in tagsProjects) {
		var divProject = $("." + idProject);
		divProject.find("div.details.column").addClass("hidden");
		divProject.find("div.all-width").addClass("hidden");
	}
}

function formatCompressToDetailed() {
	var idProjects = "proyectos";
	$("#" + idProjects + "1").attr("id", idProjects);
	$("a.redirect[href=\"#" + (idProjects + 1) + "\"]").attr("href", "#" + idProjects);
	for (var idProject in tagsProjects) {
		var divProject = $("." + idProject);
		divProject.find("div.details.column").removeClass("hidden");
		divProject.find("div.all-width").removeClass("hidden");
	}
}

function handlerEventPresentationFormat() {
	var formatPresSelect = $("#proyectos.section div.presentacion");

	function updatePresentationProjects() {
		var orderType = getValuesForm(formatPresSelect);
		if (orderType == "detallado") {
			formatCompressToDetailed();
		} else if (orderType == "resumido") {
			formatDetailedToCompress();
		}
	}
	formatPresSelect.change(updatePresentationProjects);
}