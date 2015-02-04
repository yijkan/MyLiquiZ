// questionSuper(element, params) adds params.ID to element IF IT EXISTS - is it necessary to check...?

// id : CSS id
// text : Question text (in HTML)
// question : 
function ques(text,question,classNames) {
	//redid Q(params,question)
	var container = document.createElement("DIV");
	$(container).addClass("QC " + classNames);
	$(container).append(text+"<br/>");
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

function showHide(id) {
  console.log("showHide");
  // can't hide here because they're not made yet...
  $('#'+id).change(function(e) {
  	console.log("#qtype changed");
    var choice = $('#'+id).val();
    $('.'+id).hide();
    $('.'+choice).show();
    console.log(choice+" was selected");
  });

  //Error: Syntax error, unrecognized expression: . in jq.js:2
}


//	$('#qtype').change(function(e) {
//	  var type = $('#qtype').val();
//	  $('.quesMaker').hide();
//	  $('.'+type).show();
//
//	  // hide the "Add" button too if no question is selected
//	  if (type == "none") {
//	    $('#add').hide();
//	  } else {
//	    $('#add').show();
//	  }
//	});

//TODO: Maybe use opts for optional fileds rather than a million blank ones

// String text (question text), String id (for div), String pHolder
// String Array aList (answer list), String Array vList (value list)
// boolean isMultiple, boolean showHide
function dropdown(id, classNames, text, pHolder, aList, vList, isMultiple, showsHides) {
	console.log("creating dropdown");
	var question = document.createElement("SELECT");
	console.log("select created");
	$(question).attr("data-placeholder",pHolder||"Pick an Answer...");
	$(question).addClass("question");
	// for chosen select
	$(question).addClass("chosen-select");
	$(question).addClass("drop");
	$(question).attr("id",id);

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
			console.log("option " + i + " added");
		}
		$(option).attr("value",aList[i]);
		$(question).append(option);
	}

	//setTabIndex(question); // so user can navigate with tab

	if (showsHides) { showHide(id); }
	return ques(text, question, classNames);
}

function radiocheckbox(id, text, name, classNames, aList, vList, isMultiple, showsHides) {
	var question = document.createElement("FORM");
	var type = isMultiple?"checkbox":"radio";

	for (var i = 0; i < aList.length; i++) {
		var input = document.createElement("INPUT");
		$(input).attr("type",type);
		$(input).attr("name",name);
		$(input).attr("value",vList[i]);
		// $(input).attr("id","sel"+i);
		// $(input).append(aList[i]);
		$(question).append(input);
		$(question).append(aList[i]+"<br/>");

		// NOT using this anymore
		// var label = document.createElement("LABEL");
		// $(label).append(aList[i]);
		// $(label).append("<br>");
		// $(label).attr("for","sel"+i);
		// $(question).append(label);
	}

	if (showsHides) { showHide(id); }
	//setTabIndex(question);

	return ques(text, question, classNames);
}

function textArea(id, classNames, text, rows, cols, pHolder) {

	var textArea = document.createElement("TEXTAREA");
	$(textArea).attr("id",id);
	$(textArea).attr("rows",""+rows);
	$(textArea).attr("cols",""+cols);
	$(textArea).addClass("question");

	if(pHolder) {
		$(textArea).attr("placeholder",pHolder);
	}

	//setTabIndex(textArea);
	
	return ques(text, textArea, classNames);
}

function buttonWithLabelAndOnClick(label,onclick){
  var button = document.createElement("BUTTON");
  $(button).text(label);
  $(button).on("click",onclick);
  // setTabIndex(button);
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

function submit() {

}

function quiz(object){
  var questions = object.qList;
  var quizContainer = document.createElement("DIV");
  $(quizContainer).addClass('quiz');
  for(var i = 0; i < questions.length; i++){
    // $(questions[i]).addClass('QC'); ques() does this
    $(quizContainer).append(questions[i]);
  }

  document.body.appendChild(quizContainer);
}
