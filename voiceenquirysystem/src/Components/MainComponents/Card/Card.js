import React,{Component} from 'react';
import tachyons from 'tachyons';

class Card extends Component
{

	constructor(props)
	{
		super(props);
		this.state={
			Buses:[]
		}
	}

    componentDidMount() {
        fetch('http://localhost:3001/Buses/from='+this.props.from+'&to='+this.props.to).then(res=> res.json())
        .then(data=>{this.setState({Buses:JSON.parse(data)})})
        .catch((err)=>{console.log(err);})
    }

handleLocation = (event) =>
{
	event.preventDefault();
	var string="10.8978,76.9038";
	window.open("//" + "google.com/maps?q="+string, '_blank');    
}

	render()
	{
		var url='https://robohash.org/'+this.props.id+'?200x200';
		console.log(this.props);

		if(this.props.sbus===true)
		{
		return (
					<div className="bg-light-yellow dib br3 pa3 ma2 grow" >
						<img alt='bus' src={url} style={{width:'80px',height:'auto'}}/>
						<div>
							<h4>{this.props.name}</h4>
							<p>FROM: {this.props.from}</p>
							<p> TO:  {this.props.to}</p>

						</div>
						<input className="bg-light-blue dib br3 pa3 ma2" type='submit' onClick={() => this.props.onRouteChange('test')} value='BOOK'/>
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
						<input type='submit' value='Search Location' style={{marginLeft:'10px'}} onClick={this.handleLocation} className="btn btn-primary"/>
					</div>

			);
		}

	}
}

export default Card;