import React,{Component} from 'react';
import tachyons from 'tachyons';
import Tilt from 'react-tilt';
import Icon from './icons.png';

class Logo extends Component
{

	render()
	{
		return (

			<Tilt className="Tilt br4 shadow-2" options={{ max : 25 }} style={{ height: 100, width: 100 ,marginInlineStart:'10%'}} >
				 <div className="Tilt-inner">
				 				{/* 👽 */}
					<img src={Icon} alt="icon"/>
	  			  </div>

			</Tilt>

			);
	}
}

export default Logo;

