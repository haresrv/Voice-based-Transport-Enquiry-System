import React,{Component} from 'react';
import tachyons from 'tachyons';
import ReactToPrint from 'react-to-print';
import './Ticket.css';
import img from './tkt.jpg';

class Ticket extends React.Component {
  render() {
    return (
      <div>
        <Ticket1 ref={ el => (this.componentRef = el)} />
        <ReactToPrint
          trigger={() => <a className="bg-gold ma2 pa3" href="#">Print this out!</a>}
          content={() => this.componentRef}
        />
        
      </div>
    );
  }
}


class Ticket1 extends Component {

constructor(props)
{
	super(props);
	this.state={
	}
}




handleSubmit=(event)=>{
event.preventDefault();
}


render()
{

const t="            "
const t1="      "


	return(
	
<div className="bg-white black tc" style={{margin:"0 auto",width:"300px",height:"auto"}}>

<h3 className="no">YOUR TICKET DETAILS</h3><hr/>
<div>
<img src={img} width="200px" height="auto"/>
</div>
<div className="bodydiv">
<i><b>DATE OF TRAVEL:{this.props.dot}</b></i><br/>
<i><b>BOOKED ON:{new Date()}</b></i><br/>
<i><b>SERVICE START POINT:{this.props.start}</b></i><br/>
<i><b>SERVICE END POINT:{this.props.to}</b></i><br/>
<i><b>Booked Seats:{this.props.seats}</b></i><br/>

</div>
</div>


		);
}

}



export default Ticket;
