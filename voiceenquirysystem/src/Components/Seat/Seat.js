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
		reserved:0,
		seatsfilled:[],
		seatsbooked:[]
	}
}

 
    componentDidMount() {
         fetch('http://localhost:3001/BookedSeats',{
		      method:'post',
		      headers:{'Content-Type':'application/json'},
		      body:JSON.stringify({
		      	traveldate:this.props.seldate,
		      	busregnno:this.props.bus.BusRegnNo
		      })
      })
        .then(res=> res.json())
        .then(data=>{this.setState({seatsfilled:JSON.parse(data)})})
        .then(xyz=>{console.log(this.state)})
        .catch((err)=>{console.log(err);})
// // bus seldate routeid
// console.log(this.props.seldate);
// console.log(this.props.bus.BusRegnNo);
    }

handleBooking1=()=>
{
	this.handleBooking();
        
}


handleBooking=(event)=>{
	console.log(this.state)

	if(this.state.seatsbooked.length==0)
	{
		alert("Book seat to continue")
	}
	else
	{
fetch('http://localhost:3001/Tickets',{
method:'post',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({
traveldate:this.props.seldate,
busregnno:this.props.bus.BusRegnNo,
seatsbooked:this.state.seatsbooked,
starttime:this.props.bus.StartTime,
routeid:this.props.bus.RouteID,
driverid:this.props.bus.DriverID
})
})
.then(res=> res.json())
.then(data=>{this.setState({response:JSON.parse(data)},function(){console.log(this.state);console.log("NOOO")})})
.then(x=>{
		if(this.state.response.error===null)
		{ 
		this.props.setPNR(this.state.response.pnr);
		this.props.setbooked(this.state.seatsbooked);
		fetch('http://localhost:3001/SeatsBooking',{
		method:'post',
		headers:{'Content-Type':'application/json'},
		body:JSON.stringify({
		pnr:this.state.response.pnr,
		traveldate:this.props.seldate,
		busregnno:this.props.bus.BusRegnNo,
		seatsbooked:this.state.seatsbooked,
		starttime:this.props.bus.StartTime,
		routeid:this.props.bus.RouteID,
		driverid:this.props.bus.DriverID
		})
		})
		.then(res=> res.json())
		.then(data=>{this.setState({response2:JSON.parse(data)})})
		.then(x=>{
		if(this.state.response2.error===null)
		{ 
		console.log("Entered into SeatsBooked")
		fetch('http://localhost:3001/Through',{
		method:'post',
		headers:{'Content-Type':'application/json'},
		body:JSON.stringify({
		pnr:this.state.response.pnr,
		traveldate:this.props.seldate,
		busregnno:this.props.bus.BusRegnNo,
		seatsbooked:this.state.seatsbooked,
		starttime:this.props.bus.StartTime,
		routeid:this.props.bus.RouteID,
		driverid:this.props.bus.DriverID
		})
		})
		.then(res=> res.json())
		.then(data=>{this.setState({response3:JSON.parse(data)})})
		.then(x=>{
		if(this.state.response3.error===null)
		{ 
		console.log("Entered into Through")
		alert("Succesfully Booked!!!")
		this.props.onRouteChange('testing');


		}
		else
		alert("Error inserting. Please follow all restrictions:"+JSON.stringify(this.state.response.error));
		})

		}
		else
		alert("Error inserting. Please follow all restrictions:"+JSON.stringify(this.state.response.error));
		})

		}
							else
								alert("Error inserting. Please follow all restrictions:"+JSON.stringify(this.state.response.error));
								})

			}
			



}


pay=(text,op)=>
{	
		text=text.toString(10);
		

		let ul = document.getElementById('mylist');
        if(op==='1')
    {    let li = document.createElement('li');
        li.appendChild(document.createTextNode(text));
        this.state.seatsbooked.includes(parseInt(text))?    console.log("1"):this.state.seatsbooked.push(parseInt(text));
        ul.appendChild(li);
    }
    	else
    {
    	
    	for(var x=0; x<ul.childNodes.length;x++)
    	{
    		
    		if(ul.childNodes[x].textContent===text)
    			{
    				ul.removeChild(ul.childNodes[x]);		
    				this.state.seatsbooked=this.state.seatsbooked.filter( function(n)
    					{
    					 return n!=(parseInt(text)) 
    					})
    				
    			}
    	}
    	
    }
    console.log(this.state)
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
								<SeatRow filled={this.state.seatsfilled} seatrow={seatrow[0]} change={this.pay} reserve={this.onreserved}/>
						 		<SeatRow filled={this.state.seatsfilled} seatrow={seatrow[1]} change={this.pay} reserve={this.onreserved}/>
						  		<SeatRow filled={this.state.seatsfilled} seatrow={seatrow[2]} change={this.pay} reserve={this.onreserved}/>
						 		<SeatRow filled={this.state.seatsfilled} seatrow={seatrow[3]} change={this.pay} reserve={this.onreserved}/>
								<SeatRow filled={this.state.seatsfilled} seatrow={seatrow[4]} change={this.pay} reserve={this.onreserved}/>
						 		<SeatRow filled={this.state.seatsfilled} seatrow={seatrow[5]} change={this.pay} reserve={this.onreserved}/>
						  		<SeatRow filled={this.state.seatsfilled} seatrow={seatrow[6]} change={this.pay} reserve={this.onreserved}/>
						 		<SeatRow filled={this.state.seatsfilled} seatrow={seatrow[7]} change={this.pay} reserve={this.onreserved}/>
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
										Total: <b>₹<span id="total">({this.state.reserved*300})</span></b>

										<button className="checkout-button" onClick={this.handleBooking1} >Pay Now</button>
									</div>


						  		</div>
						  		
						</ScrollPanel>
					  </div>
			  </div>




		);
}

}



export default Seat;
