import React,{Component} from 'react';
import tachyons from 'tachyons';
import './Payment.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

class Payment extends Component {

constructor(props)
{
	super(props);
	this.state={
		no:'409140911250',
		name:'DBMS USER',
		expiry:'1221',
		cvv:'',
		focused:''
	}
}

handler=(event)=>
{
console.log(event.target.name);
const {name,value}=event.target;
if(name==='cvv')
this.setState({focused:'cvc'})
else
this.setState({focused:'c'})

this.setState({[name]:value});
}

handleSubmit=(event)=>{
event.preventDefault();
console.log("HERE")
this.props.onRouteChange('ticket');

}


render()
{

	return(
			<div className='w pa2 center'>
					<Cards
						number={this.state.no}
						name={this.state.name}
						expiry={this.state.expiry}
						cvc={this.state.cvv}
						focused={this.state.focused}
					/>
					<div className='wrapped pa2 center'>
						<label htmlFor='no'/>Credit Card Number:
						<input autoComplete='off' type='text' value={this.state.no} name='no' onChange={this.handler}/><br/>
						<label htmlFor='no'/>Name As on Card:						
						<input autoComplete='off' style={{marginLeft:'20px'}} type='text' value={this.state.name} name='name' onChange={this.handler}/><br/>
						<label htmlFor='no'/>Expiry Date:						
						<input autoComplete='off' style={{marginLeft:'60px'}} type='text' value={this.state.expiry} name='expiry' onChange={this.handler}/><br/>
						<label htmlFor='no'/>CVV NUMBER:						
						<input autoComplete='off' style={{marginLeft:'40px'}} type='text' name='cvv' onChange={this.handler}/><br/>
			  			<input type='button' value='Confirm Booking' onClick={this.handleSubmit}/>
			  		</div>
			  </div>
		);
}

}



export default Payment;
