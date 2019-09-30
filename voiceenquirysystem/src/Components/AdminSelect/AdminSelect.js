import React,{Component} from 'react';
import AdminForms from '../AdminForms/AdminForms';
import Logo from '../Logo/Logo';

class AdminSelect extends Component
{
	constructor(props){
		super(props);
		this.state = {
		 user: '',
		 pass: '',
		 selected:false, 
		 reason:''
		};
	}



	handleChange = (event) => {
		event.preventDefault();
		const {name,value}=event.target;
		this.setState({[name]:value});
		
	}


	handleSubmit = (event) => {
		event.preventDefault();
		console.log(this.state);

	}

	handleSubmit2 = (event) => {
		event.preventDefault();
		
		this.setState({reason:event.target.name});
		this.setState({selected:true})
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
    	this.speak("Add a Bus Schedule to existing routes");
    }


    handleClick2 = () =>
    {
    	this.speak("Add new Bus Details");
    }


    handleClick3 = () =>
    {
    	this.speak("View Transaction Logs");
    }


    handleClick4 = () =>
    {
    	this.speak("Add new Driver");
    }


	render()
	{

		if(!this.state.selected){
			return(

				<div className='wrappedd Container2'>

		          <div className='Headdiv2'>
		            <h1 className="bg-gold pa3">Enter Bus Details</h1>
		          </div>

		          <div className="bg-green ma2 pa3">

						<img alt='bus' onClick={this.handleClick1} src={'https://robohash.org/'+'1'+'?200x200'} style={{width:'80px',height:'auto'}}/>
						<input type="text" name="busschedule" id="ip5" style={{width:"210px"}} value="Add new Bus Schedule" onClick={this.handleSubmit2} readOnly/><br/>
						
						<img alt='bus' onClick={this.handleClick2} src={'https://robohash.org/'+'12'+'?200x200'} style={{width:'80px',height:'auto'}}/>
						<input type="text" id="ip5" name="buses" value="Add new Bus" onClick={this.handleSubmit2} readOnly/><br/>
					
						<img alt='bus' onClick={this.handleClick4} src={'https://robohash.org/'+'3'+'?200x200'} style={{width:'80px',height:'auto'}}/>
						<input type="text" id="ip5"  name="driverinfo" value="Add New Driver Info" onClick={this.handleSubmit2} readOnly/><br/>

						
						<img alt='bus' onClick={this.handleClick3} src={'https://robohash.org/'+'2'+'?200x200'} style={{width:'80px',height:'auto'}}/>
						<input type="text" id="ip5"  name="logs" value="View Transaction Logs" onClick={this.handleSubmit2} readOnly/><br/>

						

		          </div>

		        </div>

			);
		}
			else
			{
					return(
							<div className="ma2">
								<Logo/>
								<AdminForms reason={this.state.reason}/>

							</div>
						);

			}

	}
}

export default AdminSelect;