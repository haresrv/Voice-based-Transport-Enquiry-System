import React,{Component} from 'react';
import tachyons from 'tachyons';
import ReactToPrint from 'react-to-print';
import './Ticket.css';
import img from './tkt.jpg';

class Ticket extends Component {


  render() {
      
    
    return (
      <div>
        <div style={{marginBottom:"30px",marginTop:"30px"}}>

          <Ticket1 onRouteChange={this.props.onRouteChange}  dot={this.props.dot} start={this.props.start} to={this.props.to} stime={this.props.stime} seats={this.props.seats} ref={ el => (this.componentRef = el)} />
         </div>
        
         <div> 
          
          <ReactToPrint

            trigger={() => <a className="bg-gold ma2 pa3" href="#">Print this out!</a>}
            content={() => this.componentRef}
          />
          
        </div>
      </div>
    );
  }
}


class Ticket1 extends Component {

constructor(props)
{
	super(props);
	this.state={
	 tx:new Date(),
   txs:props.dot
  }
}


render()
{

const t="            "
const t1="      "


	return(
	
<div className="bg-white black tc" style={{margin:"0 auto",width:"1000px",height:"400px"}}>

<h3 className="no">YOUR TICKET DETAILS</h3><hr/>
<div>
<img src={img} width="100px" height="auto"/>
</div>
<div className="bodydiv">
<i><b>DATE OF TRAVEL:{this.state.txs.toDateString()}</b></i><br/>
<i><b>BOOKED ON:{this.state.tx.toDateString()}</b></i><br/>
<i><b>SERVICE START POINT:{this.props.start}</b></i><br/>
<i><b>SERVICE END POINT:{this.props.to}</b></i><br/>
<i><b>Booked Seats:{this.props.seats}</b></i><br/>

</div>
</div>


		);
}

}



export default Ticket;
