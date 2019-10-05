import React,{Component} from 'react';
import tachyons from 'tachyons';
import './Single.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


class Single extends Component {

constructor(props)
{
	super(props);
	this.state=
	{
	back:props.back,
	seatNo:props.seatNo
	}
	

}

handleSeat=(e)=>
{
		
	var color=e.target.style.backgroundColor;
		if(color==='rgb(42, 112, 34)')
			{
				document.getElementById(this.props.seatNo).style.backgroundColor='#d1271b';
				
				this.props.change(this.state.seatNo,'1');
				this.props.reserve(1);
			}
			
		else if (color==='rgb(209, 39, 27)')
			{
				document.getElementById(this.props.seatNo).style.backgroundColor='#2a7022';
				
				this.props.change(this.state.seatNo,'2');
				this.props.reserve(-1);
				
			}

}

render()
{			

	return(

	this.state.back!='#ffffff'?		
	(	this.props.disable?		
	<input className='b' type='button' value={this.props.seatNo} id={this.props.seatNo} style={{boxShadow:"10px 10px 10px 10px #888888",width:'40px',height:'40px',backgroundColor:this.state.back}} onClick={this.handleSeat} disabled/>
		:
	<input className='b' type='button' value={this.props.seatNo} id={this.props.seatNo} style={{boxShadow:"10px 10px 10px 10px #888888",width:'40px',height:'40px',backgroundColor:this.state.back}} onClick={this.handleSeat}/>
		)
	: (

		this.props.disable?		
	<input className='b' type='button' value=' ' id={this.props.seatNo} style={{marginTop:"10px",boxShadow:"10px 10px 10px 10px #ffffff",width:'40px',height:'40px',backgroundColor:this.state.back}} onClick={this.handleSeat} disabled/>
	:
	<input className='b' type='button' value=' ' id={this.props.seatNo} style={{marginTop:"10px",boxShadow:"10px 10px 10px 10px #ffffff",width:'40px',height:'40px',backgroundColor:this.state.back}} onClick={this.handleSeat}/>
			
)


		);
}

}



export default Single;