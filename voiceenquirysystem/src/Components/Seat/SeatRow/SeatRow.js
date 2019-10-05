import React,{Component} from 'react';
import tachyons from 'tachyons';
import './SeatRow.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {ScrollPanel} from 'primereact/scrollpanel';
import Single from './Single/Single';

class SeatRow extends Component {

constructor(props)
{
	super(props);
	this.state={
		Mapper:props.seatrow
	}
	
}

LoadSeats=()=>{

	var xyz=this.props.filled;
	

if(this.props.filled.length>0)
{
		return (this.state.Mapper.map((key, index) => {
			return xyz.includes(key.toString())?
			
				<Single key={index} filled={this.props.seatsfilled} reserve={this.props.reserve} disable={true} change={this.props.change} seatNo={this.state.Mapper[index]} back='#d1271b'/>
			
			:
			
				<Single key={index} filled={this.props.seatsfilled} reserve={this.props.reserve} change={this.props.change} seatNo={this.state.Mapper[index]} back='#2a7022'/>
			
			
		}))
}
else
{
		return (this.state.Mapper.map((key, index) => {
			return <Single key={index} filled={this.props.seatsfilled} reserve={this.props.reserve} change={this.props.change} seatNo={this.state.Mapper[index]} back='#2a7022'/>
			
		}))}		

	}

render()
{

	// const Mapper = [1, 2, 3,4,5];



	return(
						 <ScrollPanel style={{width: '100%', height: 'auto'}}>							  	            
								{this.LoadSeats()}
								
						</ScrollPanel>




		);
}

}



export default SeatRow;
