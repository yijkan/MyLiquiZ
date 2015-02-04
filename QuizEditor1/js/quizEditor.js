quiz({
	"qList":[
		dropdown(
			"questionType", // id
			"Choose question type: ", // question text
			"Choose question type", // placeholder text
			["", "Dropdown", "Multiple Dropdown", "Number Fillin", "Essay", "Code"], // aList
			// ["", "dropdowns","multidropdowns","numfillins","essays","codes"], // showHide
			false // multiple
		),

		textArea(
			"quesText", // id
			"Question Text", // question text
			"essay", // class, for CSS
			3, // rows
			30, // cols
			"Question text here" // placeholder
		),

		questionSet(
			"dropdowns multidropdowns",
			[
				textArea(
					"phText", // id
					"Placeholder text", // question text
					"essay", // class, for CSS
					1, // rows
					30, // cols
					"Your placeholder here..." // placeholder
				),
				html("Answer choices: "),
				questionSet(
					"choices",
					[
						textArea("choices:1", "", "", "essay", 1, 30, "Answer"),
						dropdown("choices:1", "", ['Correct','Incorrect'], [], false) 
						// could this be a radio/checkbox instead? - use radiocheckbox or new function?
					]
				), // for each answer choice

				addChoicesButton(),
				removeChoicesButton(),
			]
		),
		questionSet(
			"codes",
			[
				textArea(
					"baseCode", // id
					"Base Code", // question text
					"essay", // class, for CSS
					3, // rows
					30, // cols
					"Your base code here..." // placeholder
				)
			]
			
		),
		questionSet(
			"numfillins essays",
			[
				textArea(
					"phText", // id
					"Placeholder text", // question text
					"essay", // class, for CSS
					1, // rows
					30, // cols
					"Your placeholder here..." // placeholder
				)
			]
			
		)
	],
	"opts":{submit:"Save Question", isEditor:true, timed:false}
});
