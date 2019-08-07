import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './AdminLogin.css';
import '../bootstrap.css';

class AdminLogin extends Component
{
	constructor(props){
		super(props);
		this.state = {user: 'admin', pass: 'password', logged: false};
	}

	handleSubmit = (event) => {
		event.preventDefault();
		if(!this.state.logged){
			if(document.getElementsByName('user')[0].value == this.state.user && document.getElementsByName('pass')[0].value == this.state.pass){
				this.setState({logged: true});
			}
			else{
				ReactDOM.findDOMNode(document.getElementsByName('user')[0]).style.backgroundColor = 'rgba(255,0,0,0.6)';
        		ReactDOM.findDOMNode(document.getElementsByName('pass')[0]).style.backgroundColor = 'rgba(255,0,0,0.6)';
			}
		}
		else{
			this.setState({logged: false});
		}
	}

	handleSubmit2 = (event) => {
		event.preventDefault();
	}

	render()
	{
		if(!this.state.logged){
			return (

			<div className='Container'>

	          <div className='Headdiv'>
	            <h1 className='Heads'>Admin Login</h1>
	          </div>

	          <div className='Content'>
	          <form onSubmit={this.handleSubmit}>
	            
	            <div className='FormGroup'>
	            <span className='Subheads'></span>
	            <input className='Boxes' type='text' required name='user' placeholder='Username'/>
	            </div>

	            <div className='FormGroup'>
	            <span className='Subheads'></span>
	            <input className='Boxes' type='password' required name='pass' placeholder='Password'/>
	            </div>
	            
	            <input className="btn-lg btn btn-dark" type="submit"/>
	        
	        </form>
	        </div>
	        </div>

			);
		}

		else{
			return(

				<div className='Container'>

		          <div className='Headdiv'>
		            <h1 className='Heads'>Enter Bus Details</h1>
		          </div>

		          <div className='Content'>
		          <form onSubmit={this.handleSubmit2}>
		            
		            <div className='FormGroup'>
		            <span className='Subheads'></span>
		            <input className='Boxes' type='text' required name='a' placeholder='Yee Haw!'/>
		            </div>

		            <div className='FormGroup'>
		            <span className='Subheads'></span>
		            <input className='Boxes' type='text' required name='b' placeholder='Yeet Yeet!'/>
		            </div>

		            <div className='FormGroup'>
		            <span className='Subheads'></span>
		            <input className='Boxes' type='text' required name='c' placeholder='Blah Blah!'/>
		            </div>
		            
		            <input className="btn-lg btn btn-dark" type="submit"/>
		        
		        </form>
		        </div>
		        </div>

			);
		}
	}
}

export default AdminLogin;