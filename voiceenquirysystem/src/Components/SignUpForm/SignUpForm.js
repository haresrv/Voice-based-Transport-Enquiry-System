import React,{Component} from 'react';
import {Password} from 'primereact/password';
import tachyons from 'tachyons';
import './SignUpForm.css';
import {ScrollPanel} from 'primereact/scrollpanel';

class SignUpForm extends Component
{
	constructor(props){
		super(props);
		this.state = {
			email:'', 
			username: '', 
			pass: '', 
			logged: false,
			address:'',
			phone:'',
			gender:'Male'
		};
	}

	handleSubmit = (event) => {
		event.preventDefault();
		console.log(this.state);
	}

   handleChange = (event) => {
      event.preventDefault();
      const {name,value} = event.target;
      this.setState({[name]:value});
  		
    }
   
	handlePassChange = (event) => {
	
		event.preventDefault();
		this.setState({pass:event.target.value});
	}

	handleRegister = (event) => {
		event.preventDefault();
//this.props.onRouteChange('home');

		fetch('http://localhost:3001/signup',{
		  method:'post',
		  headers:{'Content-Type':'application/json'},
		  body:JSON.stringify({
		  	username:this.state.username,
			pass:this.state.pass,
			email:this.state.email,
			address:this.state.address,
			phone:this.state.phone,
			gender:this.state.gender
		  })
		  }).then(res=> res.json())
		  .then(data=>{this.setState({response:JSON.parse(data)})})
		  .then(x=>{
		   if(JSON.stringify(this.state.response.error)==='null')
		  { 
		   alert('Login Success');
				

		  }
		  else
		    alert("Error inserting. Please follow all restrictions:"+JSON.stringify(this.state.response.error));
		  })

	}

	render()
	{
			return (

		<div className='wrap pa2 center'>

	          <div className='Headdiv'>
	            <h1 className='Heads pa3 ba b--green bg-lightest-blue'>Register</h1>
	          </div>

	          <div className='Content'>
				<ScrollPanel style={{width: '100%', height: '500px'}}>
			          <form onSubmit={this.handleSubmit}>
	            
                				<h7> Fill in Details and travel with us</h7>        
								<div className="p-inputgroup">
									<span className="p-inputgroup-addon" style={{width:"120px"}}>
										<i className="pi pi-user">Email</i>
									</span>
										<input autocomplete="off" name="email" type="text" style={{width:"200px"}} onChange={this.handleChange}/>
								</div>

							
								<div className="p-inputgroup">
									<span className="p-inputgroup-addon" style={{width:"120px"}}>
										<i className="pi pi-user">Username</i>
									</span>
										<input autocomplete="off" name="username" type="text" style={{width:"200px"}} onChange={this.handleChange}/>
								</div>

								<div className="p-inputgroup">
									<span className="p-inputgroup-addon" style={{width:"120px"}}>
										<i className="pi pi-user">Password</i>
									</span>
										<Password value={this.state.value} style={{width:"200px"}} onChange={this.handlePassChange} />
								</div>

								<div className="p-inputgroup">
									<span className="p-inputgroup-addon" style={{width:"120px"}}>
										<i className="pi pi-user">Address</i>
									</span>
										<input autocomplete="off" name="address" type="text" style={{width:"200px"}} onChange={this.handleChange}/>
								</div>
						
								<div className="p-inputgroup">
									<span className="p-inputgroup-addon" style={{width:"120px"}}>
										<i className="pi pi-user">Phone</i>
									</span>
										<input autocomplete="off" name="phone" type="text" style={{width:"200px"}} onChange={this.handleChange}/>
								</div>
					            

	            <input className="btn-lg btn btn-dark" type="submit" value="Register" onClick={this.handleRegister}/>
	            <input className="btn-lg btn btn-dark" type="submit" style={{marginTop:"0px"}} value="Already have an account? Signin" onClick={() => this.props.onRouteChange('signin')}/>
	        
	        </form>
	        </ScrollPanel>
	        </div>
	        </div>

			);
		}
}

export default SignUpForm;