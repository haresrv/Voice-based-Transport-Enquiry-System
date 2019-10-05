import React,{Component} from 'react';
import './AdminForms.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import TimePicker from 'react-bootstrap-time-picker';
import tachyons from 'tachyons';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {InputTextarea} from 'primereact/inputtextarea';
import { RadioGroup, RadioButton, ReversedRadioButton } from 'react-radio-buttons';
import {Calendar} from 'primereact/calendar';

class AdminForm extends Component
{
	constructor(props){
		super(props);
		
		
        let today = new Date();
		let month = today.getMonth();
		let year = today.getFullYear();
		let prevMonth = month === 0 ? 11 : month - 1;
		let prevYear = prevMonth === 11 ? year - 1 : year;
		let nextMonth = month === 11 ? 0 : month + 1;
		let nextYear = nextMonth === 0 ? year + 1 : year;

		let minDate = new Date();
		minDate.setMonth(prevMonth+1);
        minDate.setFullYear(prevYear);
        
		let maxDate = new Date();
		maxDate.setMonth(0);
        maxDate.setFullYear(year-60);
        
		this.state = {
			minDate:maxDate,
			maxDate:minDate,
			existingroutes:[],
			existingdrivers:[],
			existingbuses:[],
			existingagency:[],
			stateid:'',			
			routeid:'',
			driverid:'',
			starttime:'',
			endtime:'',
			esttraveltime:'',
			reservedseats:'',
			busregnno:'',
			busregnnoo:'',
			agencyaddr:'',
			agencyname:'',
			capacity:0,
			ac:0,
			doj:'',
			drivername:'',
			driverphone:'',
			driverage:'',
			fare:0
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleSubmit = (event) => {
		event.preventDefault();
		console.log(this.state);
		if(this.state.user==='a' && this.state.pass==='p')
			this.setState({logged:true});

	}
 handleSubmit1 = (event) =>
  {
    event.preventDefault();
    
      fetch('http://localhost:3001/busSchedule',{
      method:'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
      routeid:this.state.routeid,
      driverid:this.state.driverid,
      starttime:this.state.starttime,
      endtime:this.state.endtime,
      busregnno:this.state.busregnnoo,
      esttraveltime:this.state.esttraveltime,
      reservedseats:this.state.reservedseats,
      fare:this.state.fare
      })
      }).then(res=> res.json())
      .then(data=>{this.setState({response:JSON.parse(data)})})
      .then(x=>{
       if(this.state.response.error==="")
      { 
       alert('Record insertion done');
      
      }
      else
        alert("Error inserting. Please follow all restrictions:"+JSON.stringify(this.state.response.error));
      })
      

  }


  handleSubmit2 = (event) =>
  {

    event.preventDefault();
      console.log(this.state);

      fetch('http://localhost:3001/bus',{
      method:'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        busregnno:this.state.busregnno,
      agencyaddr:this.state.agencyaddr,
      agencyname:this.state.agencyname,
      capacity:this.state.capacity,
      ac:this.state.ac
      })
      }).then(res=> res.json())
      .then(data=>{this.setState({response2:JSON.parse(data)})})
      .then(x=>{
       if(this.state.response2.error==='')
      { 
       alert('Record insertion done');
      
      }
      else
        alert("Error inserting. Please follow all restrictions:"+JSON.stringify(this.state.response2.error));
      })
      
  }

  handleSubmit3 = (event) =>
  {
    event.preventDefault();
  
      fetch('http://localhost:3001/driver',{
      method:'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
      driverid:this.state.driveid,
      drivername:this.state.drivername,
      driverphone:this.state.driverphone,
      age:this.state.driverage,
      date_of_join:this.state.doj
      })
      }).then(res=> res.json())
      .then(data=>{this.setState({response3:JSON.parse(data)})})
      .then(x=>{
              if(this.state.response3.error==='')
      { 
       alert('Record insertion done');
      
      }
      else
        alert("Error inserting. Please follow all restrictions:"+JSON.stringify(this.state.response3.error));
      })

  }

    handleClick1 = () =>
    {
      this.speak("Add a Bus Schedule to existing routes");
    }


    handleClick2 = () =>
    {
      this.speak("Add new Bus Details");
    }


    handleClick3 = () =>
    {
      this.speak("View Transaction Logs");
    }

	componentDidMount() {
        fetch('http://localhost:3001/RouteId').then(res=> res.json())
        .then(data=>{this.setState({existingroutes:JSON.parse(data)})})
        .catch((err)=>{console.log(err);})
		
		fetch('http://localhost:3001/BusRegnNo').then(res=> res.json())
			.then(data=>{this.setState({existingbuses:JSON.parse(data)})})
			.catch((err)=>{console.log(err);})
			
			
		fetch('http://localhost:3001/Drivers').then(res=> res.json())
		.then(data=>{this.setState({existingdrivers:JSON.parse(data)})})
		.catch((err)=>{console.log(err);})
	

		fetch('http://localhost:3001/Agencies').then(res=> res.json())
		.then(data=>{this.setState({existingagency:JSON.parse(data)})})
		.catch((err)=>{console.log(err);})
			
	}


	handleChange = (event) => {
		
		const {name,value}=event.target;
		this.setState({[name]:value});
		// console.log(name)
	}

	render()
	{
		const options=["TN","KL","KA","TS","AP"];
		const optionsage=[];
		for(var i=30;i<=60;i++)
			optionsage.push(i);
		
		return(
  			<div className="Ap bg-green pa3">
              {
                  (this.props.reason === "busschedule")?
                    (
                    	<div className='formwarpx pa2 ma2 shadow-2 center'>					
							<div className='bg-gold pa3 ma2'>				
							<span className='bg-gold'>Add Bus Schedule</span>
							</div>
								<Dropdown options={this.state.existingroutes} onChange={(e)=>{this.setState({routeid:e.label})}} value={"Route ID:"+this.state.routeid} placeholder="Select an option" />
								<Dropdown options={this.state.existingdrivers} onChange={(e)=>{this.setState({driverid:e.label})}} value={"Driver ID:"+this.state.driverid}  placeholder="Select an option" />
								<Dropdown options={this.state.existingbuses} onChange={(e)=>{this.setState({busregnnoo:e.label})}} value={"Bus:"+this.state.busregnnoo}  placeholder="Select an option" />
								
							  <div className='FormGroup'>
					             <span className='Subheads'>Enter Journey Start Time:</span>
								 <TimePicker style={{width:"200px",margin:"0 auto"}} name='starttime' onChange={(e)=>{this.setState({starttime:e},function(){console.log(this.state)})}} start="0:00" end="24:00" step={30} />
							  </div>

								<div className='FormGroup'>
					             <span className='Subheads'>Enter Journey Fare:</span>
					             <input id="uid" autoComplete='off' pattern="^([1-9][0-9]{0,3}|10000)$" className='Boxesx' type='text' onChange={this.handleChange} required name='fare' placeholder='Fare'/>
							     </div>

				        	    <div className='FormGroup'>
					             <span className='Subheads'>Estimated Travel Time(in hrs.):</span>
					             <input id="uid" autoComplete='off' pattern="^(1[0-5]|[1-9])$" className='Boxesx' type='text' onChange={this.handleChange} required name='esttraveltime' placeholder='Estimated Travel Time'/>	
					             					             				             
				        	    <div className='FormGroup'>
					             <span className='Subheads'>Reserved Seats:</span>
					             <input id="uid" autoComplete='off' pattern="^(4[0]|3[0-9]|2[0-9]|1[0-9]|[0-9])$" className='Boxesx' type='text' onChange={this.handleChange} required name='reservedseats' placeholder='Reserved Seats'/>	
					             </div>

	        				    <input className="btn-lg btn btn-dark xysa" type="button" value="Submit" onClick={this.handleSubmit1}/>
				        	    </div>


                    	</div>
                      
                    )
                    : (this.props.reason === "buses")?
                    (
                    	<div className='formwarpx pa2 ma2 shadow-2 center'>					
							<div className='bg-gold pa3 ma2'>				
							<span className='bg-gold'>Add New Bus</span>
							</div>

								<span className='Subheadss'>Enter Bus Regn No.:</span>
								<div style={{marginLeft:"40px",width:"60px",display:"flex"}}>
								<Dropdown   options={options} onChange={(e)=>{this.setState({stateid:e.label})}} value={this.state.stateid}/>
			  	           		 <div  className='FormGroups'>
					             <input id="uid" style={{height:"40px"}} autoComplete='off' pattern="\d{8}" className='Boxesx' type='text' required onChange={this.handleChange} name='busregnno' placeholder='Bus Registration Number'/>
				        	    </div>
								</div>
								
								
				        	    <div className='FormGroup'>
									
								<span className='Subheads'>Enter Agency Name:</span><br/>
					             
					            <Dropdown options={this.state.existingagency} onChange={(e)=>{this.setState({agencyname:e.label})}} value={"Agency Name:"+this.state.agencyname} placeholder="Select an option" />
					             {/* <input autoComplete='off' className='Boxesx' type='text' required onChange={this.handleChange} name='agencyaddr' placeholder='Agency Address'/> */}
				        	    </div>

				        	    <div className='FormGroup'>
					             <span className='Subheads'>Total Capacity:</span>
								 <input 	id="uid" autoComplete='off' pattern="^(4[0]|3[0-9]|2[0-9]|1[0-9]|[0-9])$" className='Boxesx' type='text' onChange={this.handleChange} required name='capacity' placeholder='Total Capacity'/>
				        	    </div>

								<div className='FormGroup'>
								<span className='Subheads'>AC Available(Yes/No)?</span>
								<RadioGroup name='ac' style={{color:"#c71c1c",background:"#ffffff",margin:"0 auto",width:"150px",display:"flex"}} onChange={ this.onChange } horizontal>
									<RadioButton iconSize={25} iconInnerSize={12} rootColor="#00ff00" pointColor="#00ff00" value="yes" onClick={(e)=>{this.setState({ac: 1})}}>
										Yes
									</RadioButton>
									<RadioButton iconSize={25} iconInnerSize={12} rootColor="#c71c1c" pointColor="#c71c1c" value="no" onClick={(e)=>{this.setState({ac: 0})}}>
										No
									</RadioButton>
								</RadioGroup>
								</div>
				        	    <input className="btn-lg btn btn-dark xysa" type="submit" value="Submit" onClick={this.handleSubmit2} />

                    	</div>
                      
                    ):
                    (this.props.reason === "logs")?
                    (

                    	<div>
			  	           		 <div className='FormGroup'>
					             <span className='Subheads'>Total Costs Earned</span>
					             <input autoComplete='off' className='Boxes' type='text' onChange={this.handleChange} required name='COST' disabled/>
				        	    </div>

                    	</div>
                      
                    ):
                    (this.props.reason === "driverinfo")?
                    (

                    	<div className='formwarpx pa2 ma2 shadow-2 center'>					
								<div className='bg-gold pa3 ma2'>				
								<span className='bg-gold'>Add New Driver</span>
								</div>
						
						  	    <div className='FormGroup'>
					             <span className='Subheads'>Enter Driver Name:</span>
					             <input style={{width:"300px",height:"30px"}} autoComplete='off' className='Boxesx' type='text' onChange={this.handleChange} required name='drivername' placeholder='Driver Name'/>
				        	    </div>

								<div className='FormGroup'>
					             <span className='Subheads'>Enter Driver Age:</span>
					           <Dropdown   options={optionsage} onChange={(e)=>{this.setState({driverage:e.label})}} value={"AGE:"+this.state.driverage}/>
				        	    </div>
								
								<div className='FormGroup'>
					             <span className='Subheads'>Enter Date of Joining:</span>
					             <Calendar 
									dateFormat="dd/mm/yy" 
									value={this.state.doj} 
									minDate={this.state.minDate}
									maxDate={this.state.maxDate}
									onChange={(e) => this.setState({doj: e.value},function(){console.log(this.state)})} 
									showIcon={true} />

				        	    </div>

		        	      	    <div className='FormGroup'>
					             <span className='Subheads'>Enter Driver Phone no.</span>
					             <input style={{width:"300px",height:"30px"}} autoComplete='off' className='Boxesx' id="uid" pattern="\d{10}" type='text' onChange={this.handleChange} required name='driverphone' placeholder='Driver Phone'/>
				        	    </div>
			  	      			<input className="btn-lg btn btn-dark" type="submit" value="Submit" onClick={this.handleSubmit3}/>

                    	</div>
                      
                    ):


                      <p>ERROR 404</p>
          
                
                }
    </div>             
          
      );

	}

	
}

export default AdminForm;

