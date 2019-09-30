import React,{Component} from 'react';
import './Message.css';
import Card from '../MainComponents/Card/Card.js';
import tachyons from 'tachyons';
import Logo from '../Logo/Logo';


class Message extends Component
{
	
  constructor() {
    super();
    this.state = {
      showPopup: false
    };
  }

    togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

    speak = (xyz) => {
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
      
    };

    handleClick1 = () =>
    {
    	this.speak("Click the button on my right side, to Book a bus");
    }


    handleClick2 = () =>
    {
    	this.speak("To Search Bus Location, Click the button on my right side");
    }


    handleClick3 = () =>
    {
    	this.speak("Looking to Sign in or Register?");
    }


    handleClick4 = () =>
    {
    	this.speak("Are u Interested about us? Click to Know, more About us");
    }

    handleClick = () =>
    {
    	this.speak("I'm Leader Bot of this Westworld. Me and my team of bots will be assisting you for booking. If at any point, you are struck with what to do. Click on one of us. We'll help you");
    }



	render()
	{
		
			return (

			<div className='broc'>
			
			<img onClick={this.handleClick} alt='bus' src={'https://robohash.org/'+'1'+'?200x200'} style={{background:'#ffffff',width:'80px',height:'auto'}}/>
			<p className="headeds" style={{borderRadius:'55px 50px'}}>Hey I'm Leader Bot of this Westworld. Me and my team of bots will be assisting you for booking.<br/>If at any point, you are struck with what to do. Click on one of us to enable voice reply. We'll help you<br/>Word of advice: Those Violent Delights have violent ends</p>
				<div className='wrapped xyz'>

						<input type="text" className="face" value="What are you looking for?" style={{marginLeft:'10px',height:'50px'}} disabled/><br/>
						
						<img alt='bus' onClick={this.handleClick1} src={'https://robohash.org/'+'1'+'?200x200'} style={{width:'80px',height:'auto'}}/>
						<input type="text" id="ip5"  value="Book a bus" onClick={() => this.props.onRouteChange('signin')} readOnly/><br/>
						
						<img alt='bus' onClick={this.handleClick2} src={'https://robohash.org/'+'12'+'?200x200'} style={{width:'80px',height:'auto'}}/>
						<input type="text" id="ip5"  value="Search Bus Location" onClick={() => this.props.onRouteChange('locating')} readOnly/><br/>
						
						<img alt='bus' onClick={this.handleClick3} src={'https://robohash.org/'+'16'+'?200x200'} style={{width:'80px',height:'auto'}}/>
						<input type="text" id="ip5"  value="Sign In/Register" onClick={() => this.props.onRouteChange('signin')} readOnly/><br/>
						
						<img alt='bus' onClick={this.handleClick4} src={'https://robohash.org/'+'13'+'?200x200'} style={{width:'80px',height:'auto'}}/>
						<input type="text" id="ip5"  value="About Us" onClick={()=>{this.setState({showPopup:true})}} readOnly/><br/>
						{this.state.showPopup ? 
					      <Popup
					        closePopup={this.togglePopup.bind(this)}
					      />
					      : null
					    }				

		        </div>
				        
						
	        </div>

			);
		
	}
}

class Popup extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          						<div className='wrapped xyzz'>
          								<p className='xyzz'>VOICE BASED AUTOMATED ENQUIRY SYSTEM V1.0</p>
										<p>© All Copyrights Reserved</p>
										
										<ul>
										<li>Simple and easy to use interface </li><br/>
										<li>Voice enabled database updation and retrieval </li><br/>
										<li>No necessity of a human resource</li><br/>
										<li>Software availability round the clock</li><br/>
										<li>Ability to select the best possible route to optimize cost and time.</li><br/>
										</ul>
								

				        		</div>


        <button style={{background:'#00ff00'}} onClick={this.props.closePopup}>Close me</button>
        </div>
      </div>
    );
  }
}


export default Message;


{
/*
<Card sbus={false} onRouteChange={this.onRouteChange} id='12' busdet={true}/>
*/
}