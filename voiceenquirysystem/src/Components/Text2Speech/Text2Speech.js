import React,{Component} from 'react';
import './Text2Speech.css';

class Text2Speech extends Component
{
  constructor(props){
    super(props);
    this.state = {
        speech:'',
        start:'true'
   };
  }

  handleChange = (event) => {
    event.preventDefault();
    const {name,value}=event.target;
    this.setState({[name]:value});
    
  }


    speak = (xyz) => {
      if(this.state.start)
{
      // Check if speaking
      console.log(this.state);
      const synth = window.speechSynthesis;
      if (synth.speaking) {
        console.error('Already speaking...');
        return;
      }
        
        // Get speak text
        const speakText = new SpeechSynthesisUtterance(xyz);

        // Speak end
        speakText.onend = e => {
          console.log('Done speaking...');

        };

        // Speak error
        speakText.onerror = e => {
          console.error('Something went wrong');
        };

        // Speak
        synth.speak(speakText);
      
 }   };



  handleSubmit = (event) => {
    event.preventDefault();
    this.speak(this.state.speech);
    
  }


  render()
  {
      return (

      <div className='wrapped Container'>
          <textarea name="speech" id="text-input" onChange={this.handleChange} className="form-control form-control-lg" placeholder="Type anything..."></textarea>
          <input type="submit" className="btn btn-light btn-lg btn-block" onClick={this.handleSubmit} value="Speak"/>
      </div>

      );
    
  }
}

export default Text2Speech;









