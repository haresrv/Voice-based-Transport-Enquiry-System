import React,{Component} from 'react';
import tachyons from 'tachyons';
import './Welcome.css';
import {Calendar} from 'primereact/calendar';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {AutoComplete} from 'primereact/autocomplete';
import App from '../VoiceResolver/App';

const def_state = {'to': {'value':'','label':'','link':''}}

class Welcome extends Component
{

	constructor(props)
	{
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
		maxDate.setMonth(nextMonth);
        maxDate.setFullYear(year);
        
		this.state=
    {
            minDate:minDate,
            maxDate:maxDate,
			onwarddate:'',
			fromSelect:'',
            toSelect:'',
            countriesData: [],
            Stops:[],
            filteredFrom: [] ,
            filteredTo: [] ,
   }
     this.filterFromPlace = this.filterFromPlace.bind(this);
     this.filterToPlace = this.filterToPlace.bind(this);
    }
    
    speak = (xyz) => {
      // Check if speaking
      console.log(this.state);
      const synth = window.speechSynthesis;
      if (synth.speaking) {
        console.error('Already speaking...');
        return;
      }
        
        // Get speak text
        const speakText = new SpeechSynthesisUtterance(xyz);

        // Speak end
        speakText.onend = e => {
          console.log('Done speaking...');

        };

        // Speak error
        speakText.onerror = e => {
          console.error('Something went wrong');
        };

        // Speak
        synth.speak(speakText);
      
    };

    componentDidMount() {
        fetch('http://localhost:3001/BusStops').then(res=> res.json())
        .then(data=>{this.setState({Stops:JSON.parse(data)})})
        .catch((err)=>{console.log(err);})
        console.log(this.state.minDate);
    }

    filterFromPlace(event) {
        setTimeout(() => {
            
            var results = this.state.Stops.filter((place) => {
                return place.toLowerCase().startsWith(event.query.toLowerCase());
            });
            
            this.setState({ filteredFrom: results });
            
        }, 250);
        console.log(this.state);
    }

    filterToPlace(event) {
        setTimeout(() => {
            
            var results = this.state.Stops.filter((place) => {
                return place.toLowerCase().startsWith(event.query.toLowerCase());
            });
            var results= results.filter((r)=>{return r.toLowerCase()!=this.state.fromSelect.toLowerCase()}) 
            
            this.setState({ filteredTo: results });
        }, 250);
    }
    


	handleRegister = (event) => {
		event.preventDefault();
        // this.props.onRouteChange('home');
       
        console.log(this.state);
        //this.props.RouteChanger('search',this.state.fromSelect,this.state.toSelect)

        this.props.SetTravelDate(this.state.onwarddate);

		fetch('http://localhost:3001/CheckRoute',{
		  method:'post',
		  headers:{'Content-Type':'application/json'},
		  body:JSON.stringify({
            fromSelect:this.state.fromSelect,
            toSelect:this.state.toSelect
            })
		  }).then(res=> res.json())
		  .then(data=>{this.setState({response:JSON.parse(data)})})
		  .then(x=>{
		   if(this.state.response.error==='')
		  { 
            this.props.setPlaces(this.state.fromSelect,this.state.toSelect)
		   alert(this.state.response.response);
           
            this.props.Reset();
              if(this.props.sbus===true)
               {

                for(var i=0;i<this.state.response.response.length;i++)
                {
                    this.props.SetRouteId(this.state.response.response[i],1)   
                }
                    this.props.onRouteChange('search')
                }
            else
            {   
                this.props.onRouteChange('locate')
            } 
          }
          else
          {
		    alert("No such route exists"+JSON.stringify(this.state.response));
        } })
        .catch((err)=>{console.log(err)})
	}


    handleChange1 = (selectedOption) => {
      this.setState(def_state);
      this.setState({from:selectedOption},() => {
      document.getElementById('from').value=this.state.from.label;
      document.getElementById('to').value=this.state.to.label;
      })  };

    handleChange2 = (selectedOption) => {
      this.setState({to: selectedOption},() => {
      document.getElementById('to').value=this.state.to.label; 
        }) }

	render()
	{

return (

    <div className='formwarp pa2 shadow-2 center'>        

    <form>
    		<div className='wraap pa2 center'>
    			  <div className="form-group col-md-10">
    				    <label htmlFor="onwarddate">Pick a Date: </label>
                        <Calendar 
                            dateFormat="dd/mm/yy" 
                            value={this.state.onwarddate} 
                            minDate={this.state.minDate}
							maxDate={this.state.maxDate}
                            onChange={(e) => this.setState({onwarddate: e.value})} 
                            showIcon={true} />
    			  </div>
    			{/**/} 
    			 <div className="form-group col-md-10">
    			 	     <label htmlFor="from">Source Place:</label>
 
                                  <AutoComplete style={{background:"#000000"}}
                                                value={this.state.fromSelect} 
                                                suggestions={this.state.filteredFrom} 
                                                completeMethod={this.filterFromPlace}                                    
                                                size={30}
                                                placeholder="From Place" 
                                                minLength={1} 
                                                onChange={(e) => this.setState({fromSelect: e.value})} />
    			 </div>
                    <App id={1}/>


    			  <div className="form-group col-md-10">
    			      	 <label htmlFor="to">Destination</label>
    						
                           <AutoComplete style={{background:"#000000"}}
                                                value={this.state.toSelect} 
                                                suggestions={this.state.filteredTo} 
                                                completeMethod={this.filterToPlace}                                    
                                                size={30}
                                                placeholder="To Place" 
                                                minLength={1} 
                                                onChange={(e) => this.setState({toSelect: e.value})} />

    			  </div>
                    <App id={2}/>


    			  <div className="form-group col-md-10">
    			  
    			  <input type='submit' value='Search Buses' style={{marginLeft:'20px'}} onClick={this.handleRegister} className="btn btn-primary"/>
    			  
    			  
    			  </div>

    		</div>
    </form>
    </div>


			);
	}
}

export default Welcome;