import React,{Component} from 'react';
import logo from './Images/home.jpg';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';


class App extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      busy:false
    }
  }

componentDidMount() {
  setTimeout(function() { //Start the timer
      this.setState({busy: false}) 
  }.bind(this), 5000);
}

  render(){
      return(
  <div className="App">
        {
          (this.state.busy==true)?
              //if true
            (

               <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
               </header>
              
            )://else if false
              (
                <div>

                <Navigation/>
                <Logo/>
                </div>
              )
     }              
   </div>     
    
);
    }
}

export default App;
