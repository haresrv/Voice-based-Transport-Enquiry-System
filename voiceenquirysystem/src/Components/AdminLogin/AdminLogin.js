import React,{Component} from 'react';
import './AdminLogin.css';
import AdminForms from '../AdminForms/AdminForms';
import AdminSelect from '../AdminSelect/AdminSelect';
import {ScrollPanel} from 'primereact/scrollpanel';

class AdminLogin extends Component
{
	constructor(props){
		super(props);
		this.state = {
		 user: '',
		 pass: '',
		 logged: false,
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
//   		this.setState({logged:true})
		

		 fetch('http://localhost:3001/adminLogin',{
		  method:'post',
		  headers:{'Content-Type':'application/json'},
		  body:JSON.stringify({
				username:this.state.user,
				password:this.state.pass
		  })
		  }).then(res=> res.json())
		  .then(data=>{this.setState({response:JSON.parse(data)})})
		  .then(x=>{
		   if(this.state.response.error==='')
		  { 
		  	console.log(this.state);
		   //alert('User valid');
		   this.setState({logged:true})
		  
		  }
		  else
		  {
		
		alert("Not admin"+JSON.stringify(this.state.response.error));
		console.log("Not Admin"+this.state);
		
		 } })
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



	render()
	{
		if((!this.state.logged)){
			return (
					<div className='wrap pa2 center'>

						<div className='Headdiv'>
						<h1 className='Heads pa3 ba b--green bg-lightest-blue'>Admin Login</h1>
						</div>

						<div className='Content'>
							<ScrollPanel style={{width: '100%', height: '500px'}}>
								<form>

								<h7 > Pls Contact Admin Office for Password Changes </h7>        
								<div className="p-inputgroup">
								<span className="p-inputgroup-addon" style={{width:"120px"}}>
								<i className="pi pi-user">Email</i>
								</span>
							
								<input autocomplete="off" name="user" type="text" style={{width:"200px"}} onChange={this.handleChange}/>
								</div>

								<div className="p-inputgroup">
								<span className="p-inputgroup-addon" style={{width:"120px"}}>
								<i className="pi pi-user">Password</i>
								</span>

								<input autocomplete="off" name="pass" type="password" style={{width:"200px"}} onChange={this.handleChange}/>
								</div>



								<input className="btn-lg btn btn-dark" type="submit" value="Signin" onClick={this.handleSubmit}/>

								</form>
							</ScrollPanel>
						</div>
					</div>
	
			);
		}

		else {
			return(

					<AdminSelect />
			);
		}

	}
}

export default AdminLogin;