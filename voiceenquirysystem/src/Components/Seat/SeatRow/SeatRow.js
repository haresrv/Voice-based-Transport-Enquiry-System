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

render()
{

	// const Mapper = [1, 2, 3,4,5];

	return(
						 <ScrollPanel style={{width: '100%', height: 'auto'}}>							  	            
								<Single reserve={this.props.reserve} change={this.props.change} seatNo={this.state.Mapper[0]} back='#2a7022'/>
								<Single reserve={this.props.reserve} change={this.props.change} seatNo={this.state.Mapper[1]} back='#2a7022'/>
								<Single reserve={this.props.reserve} change={this.props.change} seatNo={this.state.Mapper[2]} back='#2a7022'/>
						  		<Single reserve={this.props.reserve} change={this.props.change} seatNo='' back='#ffffff'/>
						  		<Single reserve={this.props.reserve} change={this.props.change} seatNo={this.state.Mapper[3]} back='#2a7022'/>
								<Single reserve={this.props.reserve} change={this.props.change} seatNo={this.state.Mapper[4]} back='#2a7022'/>
						  		
						</ScrollPanel>




		);
}

}



export default SeatRow;
