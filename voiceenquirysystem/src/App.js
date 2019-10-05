import React,{Component} from 'react';
import logo from './Images/home.jpg';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Welcome from './Components/Welcome/Welcome';
import Card from './Components/MainComponents/Card/Card';
import {bus} from './buses';
import AdminLogin from './Components/AdminLogin/AdminLogin';
import SignUpForm from './Components/SignUpForm/SignUpForm';
import Signin from './Components/Signin/Signin';
import Seat from './Components/Seat/Seat';
import Payment from './Components/Payment/Payment';
import Message from './Components/Message/Message';
import Text2Speech from './Components/Text2Speech/Text2Speech';
import Ticket from './Components/Ticket/Ticket';


const initial_state={
      busy:false,
      isSignedin:false,
      isAdmin:false,
      route:'home'} 
   

class App extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      busy:false,
      isSignedin:false,
      isAdmin:false,
      route:'t',
      error:'',
      routeid:[3,4],
      selbus:[]
    }
  }

componentDidMount() {
  setTimeout(
    function() 
  { //Start the timer
      this.setState({busy: false});  // put true here if u want to see opening animation
  }.bind(this), 0);
this.speak("WELCOME TO DELOS DESTINATIONS. Enjoy your Stay. Please Select what you're looking for!!");
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

RouteChanger = (str,from,to) =>{
  this.setState({from:from});
  this.setState({to:to},function(){console.log(this.state)});
  this.onRouteChange(str);
  
}

onRouteChange = (route) => {
if(route=== 'signout')
{
 this.setState(initial_state);
}
else if(route === 'home')
{
  this.setState({isSignedIn:true});

}

else if(route === 'signin')
{
  this.setState({isSignedIn:false});
}

else if(route === 'register')
{
  this.setState({isSignedIn:false});
}

  this.setState({route:route});
}

  Reset=()=>{    
    this.setState({routeid:[]});
    this.setState({pnr:[]});
    this.setState({selbus:[]});
  }

  SetRouteId = (resx) => {

    this.state.routeid.push(resx);
    
    console.log("Inside Set RouteID")
    this.setState({done:"True"},function() {
      console.log("EVERYthing")  
    });
  }

  setPlaces= (resx1,resx2) => {

    this.setState({from:resx1});
    this.setState({to:resx2});
    console.log("Inside Set Places")
    this.setState({done:"True"},function() {
      console.log(this.state)  
    });
  }

  setPNR= (resx) => {

    this.setState({pnr:resx[0]});
    
    console.log("Inside Set PNR")
    this.setState({done:"True"},function() {
      console.log(this.state)  
    });
  }

  setbooked= (resx) => {

    this.setState({bookedseats:resx});
    
    console.log("Inside Set Booked")
    this.setState({done:"True"},function() {
      console.log(this.state)  
    });
  }


  SetBus = (resx) => {
    this.setState({selbus:resx});
    
    console.log("Inside Set Bus")
    this.setState({done:"True"},function() {
      console.log(this.state)  
    });
  }

  SetTravelDate = (resx) => {
    this.setState({traveldate:resx});
    
    console.log("Inside Set Date")
    this.setState({done:"True"},function() {
      console.log(this.state)  
    });
  }


  handleSubmit = (event) => {

  event.preventDefault();

  fetch('http://localhost:3001/',{
  method:'post',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({
        
  })
  }).then(res=> res.json())
  .then(data=>{this.setState({response:JSON.parse(data)})})
  .then(x=>{
   if(JSON.stringify(this.state.response.error)==='null')
  { 
   alert('Record insertion done. S3 File upload started');
  this.handleUpload(event);
  }
  else
    alert("Error inserting. Please follow all restrictions:"+JSON.stringify(this.state.response.error));
  })
  
  }


  render(){
      return(
  <div className="App">
              {
                  (this.state.busy===true)?
                      //animation for first few seconds
                    (
                       <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                       </header>
                      
                    )
                    ://else
                      (this.state.route==='register')?
                           ( 
                              <div>
                                 <Navigation route={this.state.route} onRouteChange={this.onRouteChange} isSignedin={this.state.isSignedin}/>
                                 <Logo/>
                                 <SignUpForm onRouteChange={this.onRouteChange}/> 
                              </div>
                             )
                        ://else
                           (this.state.route==='home')?
                               (
                                  <div>
                                    <Navigation route={this.state.route} onRouteChange={this.onRouteChange} isSignedin={this.state.isSignedin}/>
                                    <Logo/>
                                    <Welcome setPlaces={this.setPlaces} SetTravelDate={this.SetTravelDate} onRouteChange={this.onRouteChange} Reset={this.Reset} SetRouteId={this.SetRouteId} RouteChanger={this.RouteChanger} sbus={true} /> 
                                  </div>
                               )
                               ://else
                                  (this.state.route==='signin')?
                                    (
                                      <div>
                                           <Navigation route={this.state.route} onRouteChange={this.onRouteChange} isSignedin={this.state.isSignedin}/>
                                           <Logo/>
                                           <Signin onRouteChange={this.onRouteChange}/> 
                                      </div>

                                    )    
                                            ://else
                                             (this.state.route==='admin')? (
                                                <div>
                                                  <Navigation route={this.state.route} onRouteChange={this.onRouteChange} isSignedin={this.state.isSignedin}/>
                                                  {/* <Logo/> */}
                                                  <AdminLogin onRouteChange={this.onRouteChange}/>
                                                </div>
                                              ):
                                                (this.state.route==='search')? (
                                                      <div>
                                                          <Navigation route={this.state.route} onRouteChange={this.onRouteChange} isSignedin={this.state.isSignedin}/>
                                                  
                                                          {
                                                            
                                                            <Card SetBus={this.SetBus} onRouteChange={this.onRouteChange} routeids={this.state.routeid} from={this.state.from} to={this.state.to} sbus={true} onRouteChange={this.onRouteChange} id={bus[0].id} name={bus[0].name} />
                                                          }
                                                      </div>
                                                  ): (this.state.route==='test')?

                                             (
                                                <div>
                                                    <Navigation route={this.state.route} onRouteChange={this.onRouteChange} isSignedin={this.state.isSignedin}/>
                                                    <Seat onRouteChange={this.onRouteChange} bus={this.state.selbus}  seldate={this.state.traveldate} routeid={this.state.selbus.routeid} SetBus={this.SetBus} setPNR={this.setPNR} setbooked={this.setbooked} onRouteChange={this.onRouteChange}/>                  
                                                </div>
                                                
                                              ): (this.state.route==='testing')?

                                             (
                                                <div>
                                                    <Navigation route={this.state.route} onRouteChange={this.onRouteChange} isSignedin={this.state.isSignedin}/>
                                                    <Payment onRouteChange={this.onRouteChange}/>
                                                </div>
                                                
                                              ): (this.state.route==='t')?
                                             (  
                                              <div>
                                                <Navigation route={this.state.route} onRouteChange={this.onRouteChange} isSignedin={this.state.isSignedin}/>
                                                <Message onRouteChange={this.onRouteChange}/>
                                              </div>
                                              ):
                                                (this.state.route==='locate')? (
                                                      <div>
                                                          <Navigation route={this.state.route} onRouteChange={this.onRouteChange} isSignedin={this.state.isSignedin}/>
                                                          <Card sbus={false} onRouteChange={this.onRouteChange} />
                                                          <Card sbus={false} onRouteChange={this.onRouteChange} />
                                                          <Card sbus={false} onRouteChange={this.onRouteChange} />
                                                          <Card sbus={false} onRouteChange={this.onRouteChange} />
                                                      </div>
                                                  ):(this.state.route==='locating')? (
                                                      <div>
                                                          <Navigation route={this.state.route} onRouteChange={this.onRouteChange} isSignedin={this.state.isSignedin}/>
                                                          <Welcome onRouteChange={this.onRouteChange} sbus={false}/> 
                                                      </div>
                                                  ):(this.state.route==='voice')? (
                                                      <div>
                                                            <Text2Speech />
                                                      </div>
                                                  ):(this.state.route==='ticket')? (
                                                  
                                                         <Ticket onRouteChange={this.onRouteChange}  dot={this.state.traveldate} start={this.state.from} to={this.state.to} stime={this.state.selbus.StartTime} seats={this.state.bookedseats}/>
                                                  ):

                                             <p>ERROR 404</p>
          
                
                }
    </div>             
          
      );  // end of return
    } //end of render <p>ERROR 404</p>
  

  }

export default App;
