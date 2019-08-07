import React,{Component} from 'react';
import tachyons from 'tachyons';

class Navigation extends Component
{

	render()
	{
		return (
					<nav style={{display:'flex',justifyContent:'flex-end'}}>
					<p className='f3 link dim black underline pa3 pointer'>Sign Out</p>
					</nav>
			);
	}
}

export default Navigation;