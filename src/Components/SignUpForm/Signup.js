import React,{Component} from 'react';
import tachyons from 'tachyons';
import Tilt from 'react-tilt';

class Signup extends Component
{

	constructor(props)
	{
		super(props);
		
	}

	render()
	{
		return (

			<Tilt className="Tilt br4 shadow-2" options={{ max : 25 }} style={{ height: 100, width: 100 ,marginInlineStart:'20%'}} >
				 <div className="Tilt-inner">



	  			  </div>

			</Tilt>

			);
	}
}

export default Signup;

