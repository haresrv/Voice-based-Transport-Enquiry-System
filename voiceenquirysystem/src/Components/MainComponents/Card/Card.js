import React,{Component} from 'react';
import tachyons from 'tachyons';
import './Card.css'

class Card extends Component
{

	constructor(props)
	{
		super(props);
		this.state={
			Buses:[],
			bookedbus:-1
		}
	}

    componentDidMount() {
    	if(this.props.sbus===true)
    	{
    				var buses=[]
    				var r=this.props.routeids;
    				for(var i=0;i<r.length;i++)
	    				{

					        fetch(`http://localhost:3001/fetchBuses/${r[i]}`)
					        .then(res=> res.json())
					        .then(data=>{(JSON.parse(data)).forEach(function(items){buses.push(items)})})
					        .then(xyz=>this.setState({Buses:buses}))
					        .catch((err)=>{console.log(err)})

	    				}
	    			console.log("GOT ");
    				console.log(this.state);
    				
    	}
	}

	handleBooking = (event) =>
	{
		console.log(event.target.name)

		this.setState({bookedbus:event.target.name},function(){
			// this.props.selectedBus(this.state.Buses[bookedbus]);	
		this.props.SetBus(this.state.Buses[this.state.bookedbus]);		
		 this.props.onRouteChange('test');
		})
		 
	}


	handleLocation = (event) =>
	{
		event.preventDefault();
		var string="10.8978,76.9038";
		window.open("//" + "google.com/maps?q="+string, '_blank');    
	}

	LoadBuses=()=>{
		return (this.state.Buses.map((key, index) => {
     		return <div key={index} className="bg-light-yellow br3 pa3 ma2 br2" style={{width:"550px",margin:"0 auto",marginBottom:"20px"}}>
						<div>
						<div className="clearfix row-one">
							<div className="column-two p-right-10 w-30 fl">
								<div className="travels lh-24 f-bold d-color">{this.state.Buses[index].AgencyName} 		</div>
								<div className="bus-type f-15 m-top-16 l-color">{this.state.Buses[index].AC===0?"AC":"Non-AC"}		</div>
								<img src={"https://robohash.org/"+index+"?200x200"} alt='img' style={{width:"50px",height:"50px"}}/>
							</div>
							<div className="column-three p-right-10 w-10 fl">
							<div className="dp-time f-15 d-color f-bold">{this.state.Buses[index].StartTime}</div>
							
							</div>

							<div className="column-four p-right-10 w-20 fl">
								
								<div className="dur l-color lh-12">{this.state.Buses[index].TravelTime} hrs.</div>
								<div className="bus-type f-15 m-top-16 d-color">Travel Time</div>
							</div>
							
							<div className="column-five p-right-10 w-10 fl">
								<div className="bp-time f-15 d-color disp-Inline">05:00</div>
							</div>
							<div className="bg-gold column-seven p-right-10 w-15 fl">
								<div className="seat-fare ">
									<div className="fare d-block">INR<br/>
										 <span className="f-19 f-bold">{this.state.Buses[index].Fare}</span>
									</div>
								</div>
							</div>
							<div className="column-eight w-15 fl">
								<div className="seat-bar ">
									<div className="light-g-bar">
										<div className="green-bar w-10"></div>
									</div>
								</div>
								<div className="seat-left m-top-16">{this.state.Buses[index].TotalSeats-this.state.Buses[index].ReservedSeats}
									<span className="l-color"> Seats available</span>
								</div>
								<input name={index} className="bg-light-blue dib br3 pa3 ma2" type='submit' onClick={this.handleBooking} value='BOOK'/>
							</div>
						</div>
					</div>
					
					</div>

  			


  			}))

	}

	render()
	{
		var url='https://robohash.org/'+this.props.id+'?200x200';
		console.log(this.props);

		if(this.props.sbus===true)
		{
		return (
					<div>
						
					{this.LoadBuses()}
					</div>
			);
		}
		else
		{
			return (
					<div className="bg-light-yellow dib br3 pa3 ma2 grow" >
						<img alt='bus' src={url} style={{width:'80px',height:'auto'}}/>
						<div>
							<h4>BUS</h4>
							<p>FROM: Place1</p>
							<p>TO:  Place2</p>
							<p>Driver Name: --</p>
							<p>Driver Phone:  --</p>
						</div>					
						<input type='button' value='Search Location' style={{marginLeft:'10px'}} onClick={this.handleLocation} className="btn btn-primary"/>
					</div>

			);
		}

	}
}

export default Card;