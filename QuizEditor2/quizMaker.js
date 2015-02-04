// questionSuper(element, params) adds params.ID to element IF IT EXISTS - is it necessary to check...?

// id : CSS id
// text : Question text (in HTML)
// question : 
function ques(id,text,question) {
	//redid Q(params,question)
	var container = document.createElement("DIV");
	$(container).addClass("question");
	$(container).attr("id",id);
	$(container).append(text);
	$(container).append(question);

	return container;
}

function questionSet(qClass, qList) {
	var container = document.createElement("DIV");
	$(container).addClass(qClass||"qSet");

	for (var i=0; i > qList.length; i++) {
		$(container).append(qList[i]);
	}

	return container;
}

function html(html,id) {
	var container = document.createElement("SPAN");
	$(container).html(html);
	$(container).addClass("nonquestion");
	$(container).attr("id",id);

	return container;
}

function dropdown(pHolder, aList, isMultiple) {
	var question = document.createElement("SELECT");
	$(question).attr("data-placeholder",pHolder||"Pick an Answer...");
	$(question).addClass("question");
	// for chosen select or whatever
	$(question).addClass("chosen-select");
	$(question).addClass("drop");

	// adding the necessary classes & attributes
	if (isMultiple) {
		$(question).addClass("multidrop");
		$(question).attr("multiple","");
	} else {
		$(question).addClass("singledrop");
	}

	// add answer choices
	for (var i=0; i < aList.length; i++) {
		var option = document.createElement("OPTION");
		if(i>0) {
			$(option).html(aList[i] + "&nbsp;");
		}
		$(option).attr("value",aList[i]);
		$(question).append(option);
	}

	//setTabIndex(question); // so user can navigate with tab

	return question;
}

function radiocheckbox(id, text, name, aList, showHideList, isMultiple) {
	var question = document.createElement("FORM");
	var type = isMultiple?"checkbox":"radio";

	for (var i = 0; i < aList.length; i++) {
		var input = document.createElement("INPUT");
		$(input).attr("type",type);
		$(input).attr("name",name);
		$(input).attr("value",aList[i]);
		$(input).attr("id","sel"+i);
		$(question).append(input);

		var label = document.createElement("LABEL");
		$(label).append(aList[i]);
		$(label).append("<br>");
		$(label).attr("for","sel"+i);
		$(question).append(label);
	}

	showHideClass(showHideList);
	setTabIndex(question);

	return ques(id, text, question);
}

function textArea(id, text, className, rows, cols, pHolder) {

	var textArea = document.createElement("TEXTAREA");
	$(textArea).attr("rows",""+rows);
	$(textArea).attr("cols",""+cols);

	if(pHolder) {
		$(textArea).attr("placeholder",pHolder);
	}

	if(className) {
		$(textArea).addClass(className);
	}

	setTabIndex(textArea);
	
	return ques(id, text, textArea);
}

function buttonWithLabelAndOnClick(label,onclick){
  var button = document.createElement("BUTTON");
  $(button).text(label);
  $(button).on("click",onclick);
  setTabIndex(button);
  return button;
}

function addChoicesButton() {
	var but = buttonWithLabelAndOnClick("Add Choice",function(e) {
		var len = ($(e.target).parent().find(".question").length)/2-1;
		var ques = questionSet("choices",[textArea("choices:"+len, "", "", "essay", 1, 30, "Answer"),dropdown()]); 
		// fill this in!
		// this would change if changed to radio/checkbox text

		$(e.target).parent().append(ques);
		$(ques).find('.chosen-select').chosen({});
		$(e.target).parent().find(".nonquestion").last().before(ques);
	});
	$(but).addClass('addChoice');
	return but;
}

function removeChoicesButton() {
	var but = buttonWithLabelAndOnClick("Remove Choice",function(e) {
		var childs = $(e.target).parent().find(".choices");
		if(childs.length>0) {
			$(childs[childs.length-1]).remove();
		}
	});
	$(but).addClass('removeChoice');
	return but;
}

function showHideClass() {
	
}

function SUBMIT_ONE_QUIZ() {

}
