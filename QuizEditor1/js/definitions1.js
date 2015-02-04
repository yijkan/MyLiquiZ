//tabIndex is so that we can bounce from question to question using the tab button. tabIndex is basically a counter so that we can set the next index.
var tabIndex = 1;

/*
the actual setting of the tab index needs updating, and this
is the beginning of that method. The problem is if you need
to set a tab index and higher indexes are already set, you
must run through $('*').each(function(){}); and reset tab
indexes to their value + 1 only if they are higher than the
value you wish to set.
*/
function setTabIndex(ques,index){
  if(!index)
      index = tabIndex;
  $(ques).attr("tabindex",""+tabIndex);
  tabIndex++;
}

//This is needed to store the show/hide lists until the end so we can hide everything!
//This is for sections that need to be hidden unless certain choices are made.
var showHideLists=[];

function showHideClass(question, showHideList) {
	$(question).data("index","0");
	if(showHideList) {
		showHideLists.push(showHideList);
		// when question changes, it and {showHide:showHide} is passed to the function
		$(question).change({showHide:showHide}, function(event) {
			
		})
	}
}
