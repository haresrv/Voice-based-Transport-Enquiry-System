import React,{Component} from 'react';
import tachyons from 'tachyons';
import './Navigation.css';
import App from '../VoiceResolver/App';


class Navigation extends Component
{

	render()
	{
return(
		<div>
    <App id={1000}/>
{
 (this.props.route==='register' || this.props.route==='signin')?
                           ( 
                           		<div>
									<nav  style={{display:'flex' , justifyContent:'flex-end'}}>
									<p onClick={() => this.props.onRouteChange('admin')} className="f3 link b blue hover-black bg-animate hover-bg-gold dim black underline pa3 pointer">Admin Login </p>
									<p onClick={() => this.props.onRouteChange('signin')} className="f3 link b blue hover-black bg-animate hover-bg-gold dim black underline pa3 pointer">Sign In </p>
									<p onClick={() => this.props.onRouteChange('register')} className="f3 link b blue hover-black bg-animate hover-bg-gold dim black underline pa3 pointer">Register </p>
									</nav>
                           			<h1 className="face f3 black b--dashed bg-gold dim black pa3"> DELOS DESTINATIONS </h1>
									
								</div>
                             )
                        ://else
                           (this.props.route==='home')?
                               (
                                  <div>
                                  									
	                                    <nav  style={{display:'flex' , justifyContent:'flex-end'}}>
										<p onClick={() => this.props.onRouteChange('signin')} className="f3 link b blue hover-black bg-animate hover-bg-gold dim black underline pa3 pointer">Sign Out </p>
										</nav>
										<h1  className="face f3 black b--dashed bg-gold dim black pa3"> DELOS DESTINATIONS </h1>	
                                  </div>
                               )
                               :
                                (this.props.route==='search')? (
                                                      <div>
															<h1  className="face f3 black b--dashed bg-gold dim black pa3"> DELOS DESTINATIONS </h1>
                              <p onClick={() => this.props.onRouteChange('t')} className="f3 link b blue hover-black bg-animate hover-bg-gold dim black underline pa3 pointer">Home Page </p>                              
                                                      </div>
                                                  ): (this.props.route==='test')?

                                             (
                                                <div>
                                                	<h1  className="face f3 black b--dashed bg-gold dim black pa3"> DELOS DESTINATIONS </h1>
                                                </div>
                                                
                                              ): (this.props.route==='testing')?

                                             (
                                                <div>
                                                	<h1  className="face f3 black b--dashed bg-gold dim black pa3"> DELOS DESTINATIONS </h1>
                                                </div>
                                                
                                              ): (this.props.route==='t')?
                                                           (
                                                              <div>  
                                                                <h1  className="face f3 black b--dashed bg-gold dim black pa3"> DELOS DESTINATIONS </h1>  
                                                              </div>
                                                           )  :  (this.props.route==='admin')?
                                                                   (
                                                                      <div>  
                                                                        <h1  className="face f3 black b--dashed bg-gold dim black pa3"> DELOS DESTINATIONS </h1>  
                                                                        <p onClick={() => this.props.onRouteChange('signin')} className="f3 link b blue hover-black bg-animate hover-bg-gold dim black underline pa3 pointer">Go back</p>
                                                                      </div>
                                                                   ): 


                                                                     (
                                                                      <div>  
                                                                        <h1  className="face f3 black b--dashed bg-gold dim black pa3"> DELOS DESTINATIONS </h1>  
                                                                        <p onClick={() => this.props.onRouteChange('t')} className="f3 link b blue hover-black bg-animate hover-bg-gold dim black underline pa3 pointer">Go back</p>
                                                                      </div>
                                                                      )
               


}
	</div>

	);

}


}

export default Navigation;