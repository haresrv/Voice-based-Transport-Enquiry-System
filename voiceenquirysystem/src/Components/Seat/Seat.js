import React,{Component} from 'react';
import tachyons from 'tachyons';
import './Seat.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {ScrollPanel} from 'primereact/scrollpanel';
import SeatRow from './SeatRow/SeatRow';

class Seat extends Component {

constructor(props)
{
	super(props);
	this.state={
		reserved:0
	}
}

pay=(text,op)=>
{	
		text=text.toString(10);
		
		let ul = document.getElementById('mylist');
        if(op==='1')
    {    let li = document.createElement('li');
        li.appendChild(document.createTextNode(text));
        ul.appendChild(li);
    }
    	else
    {
    	
    	for(var x=0; x<ul.childNodes.length;x++)
    	{
    		
    		if(ul.childNodes[x].textContent===text)
    			{ul.removeChild(ul.childNodes[x]);		

    			}
    	}
    	
    }
}

onreserved=(x)=>
{
	var y=this.state.reserved;
	this.setState({reserved:(x+y)});
}

render()
{

	var seatrow=[
			[1,2,3,4,5],
			[6,7,8,9,10],
			[11,12,13,14,15],
			[16,17,18,19,20],
			[21,22,23,24,25],
			[26,27,28,29,30],
			[31,32,33,34,35],
			[36,37,38,39,40]
			];

	return(
			<div className='wraps pa2 center'>

			  <div className='Headdiv'>
			        <h3 className='face pa3 ba b--green bg-lightest-blue'>Book Seats</h3>
			          </div>

			          <div className='Content'>
						 <ScrollPanel  style={{width: '400px', height: 'auto'}}>							  	            
								<div className='rowC'>
								<div >
								<SeatRow seatrow={seatrow[0]} change={this.pay} reserve={this.onreserved}/>
						 		<SeatRow seatrow={seatrow[1]} change={this.pay} reserve={this.onreserved}/>
						  		<SeatRow seatrow={seatrow[2]} change={this.pay} reserve={this.onreserved}/>
						 		<SeatRow seatrow={seatrow[3]} change={this.pay} reserve={this.onreserved}/>
								<SeatRow seatrow={seatrow[4]} change={this.pay} reserve={this.onreserved}/>
						 		<SeatRow seatrow={seatrow[5]} change={this.pay} reserve={this.onreserved}/>
						  		<SeatRow seatrow={seatrow[6]} change={this.pay} reserve={this.onreserved}/>
						 		<SeatRow seatrow={seatrow[7]} change={this.pay} reserve={this.onreserved}/>
						  		</div>
				

									<div className="booking-details">
										<div id="legend" className="seatCharts-legend">
											<ul className="seatCharts-legendList">
												<li className="seatCharts-legendItem">
													<div className="seatCharts-seat seatCharts-cell booked"></div>
													<span className="seatCharts-legendDescription">Already Booked</span>
												</li>
												<li className="seatCharts-legendItem">
													<div className="seatCharts-seat seatCharts-cell avail"></div>
													<span className="seatCharts-legendDescription">Available</span>
												</li>
												
											</ul>
										</div>
										<h3> Selected Seats (<span id="counter">{this.state.reserved}</span>):</h3>
												<ul id="mylist">
												

												</ul>										
										Total: <b>$<span id="total">({this.state.reserved*300})</span></b>

										<button className="checkout-button" onClick={() => this.props.onRouteChange('testing')} >Pay Now</button>
									</div>


						  		</div>
						  		
						</ScrollPanel>
					  </div>
			  </div>




		);
}

}



export default Seat;
