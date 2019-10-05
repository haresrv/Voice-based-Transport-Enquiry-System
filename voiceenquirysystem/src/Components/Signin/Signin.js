import React,{Component} from 'react';
import tachyons from 'tachyons';
import './Signin.css';
import {ScrollPanel} from 'primereact/scrollpanel';

class Signin extends Component
{
	constructor(props){
		super(props);
		this.state = {
			email:'', 
			pass: '', 
			logged: false
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

	handleSignin = (event) => {
		event.preventDefault();
		console.log(this.state)
		this.props.onRouteChange('home')
		
		// fetch('http://localhost:3001/login',{
		//   method:'post',
		//   headers:{'Content-Type':'application/json'},
		//   body:JSON.stringify({
		//   	email:this.state.email,
		// 	password:this.state.pass
		//   })
		//   }).then(res=> res.json())
		//   .then(data=>{this.setState({response:JSON.parse(data)})})
		//   .then(x=>{
		//    if((this.state.response.error)==='')
		//   { 
		//    alert('Login Success');
		// 	this.props.onRouteChange('home')
	
		//   }
		//   else
		//     alert("Error inserting. Please follow all restrictions:"+JSON.stringify(this.state.response.error));
		//   })


	}

	render()
	{
			return (

		<div className='wrap pa2 center'>

	          <div className='Headdiv'>
	            <h1 className='Heads pa3 ba b--green bg-lightest-blue'>Sign In</h1>
	          </div>

	          <div className='Content'>
	          <ScrollPanel style={{width: '100%', height: '500px'}}>
	          <form onSubmit={this.handleSubmit}>
	            
                				<h7 > Welcome back again </h7>        
								<div className="p-inputgroup">
									<span className="p-inputgroup-addon" style={{width:"120px"}}>
										<i className="pi pi-user">Email</i>
									</span>
										<input autocomplete="off" name="email" type="text" style={{width:"200px"}} onChange={this.handleChange}/>
								</div>

								<div className="p-inputgroup">
									<span className="p-inputgroup-addon" style={{width:"120px"}}>
										<i className="pi pi-user">Password</i>
									</span>
										
										<input autocomplete="off" name="pass" type="password" style={{width:"200px"}} onChange={this.handlePassChange}/>
								</div>

					            

	            <input className="btn-lg btn btn-dark" type="submit" value="Signin" onClick={this.handleSignin}/>
	            <input className="btn-lg btn btn-dark" type="submit" style={{marginTop:"0px"}} value="Don't have an account? Register" onClick={() => this.props.onRouteChange('register')}/>
	        
	        </form>
	        </ScrollPanel>
	        </div>
	        </div>

			);
		
	}
}

export default Signin;