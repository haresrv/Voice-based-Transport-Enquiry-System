import React,{Component} from 'react';

class VoiceResolver extends Component
{

	constructor(props)
	{
		super(props);
		
	}

	onChange = (event) => {
	var SpeechRecognition = window.webkitSpeechRecognition;
  
	var recognition = new SpeechRecognition();
	 
	var Textbox = $('#textbox');
	var instructions = $('instructions');
	 
	var Content = '';
	 
	recognition.continuous = true;
	 
	recognition.onresult = function(event) {
	 
	  var current = event.resultIndex;
	 
	  var transcript = event.results[current][0].transcript;
	 
	    Content += transcript;
	    Textbox.val(Content);
	  
	};
	 
	recognition.onstart = function() { 
	  instructions.text('Voice recognition is ON.');
	}
	 
	recognition.onspeechend = function() {
	  instructions.text('No activity.');
	}
	 
	recognition.onerror = function(event) {
	  if(event.error == 'no-speech') {
	    instructions.text('Try again.');  
	  }
	}
	 
	$('#start-btn').on('click', function(e) {
	  if (Content.length) {
	    Content += ' ';
	  }
	  recognition.start();
	});
	 
	Textbox.on('input', function() {
	  Content = $(this).val();
	})
	}

	render()
	{
		return (
				<div>

					<p id='textbox'></p>
					<p id='instructions'></p>
					<button id='start-btn'>


				</div>


			);
	}
}

export default VoiceResolver;

