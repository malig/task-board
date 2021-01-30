import React, {Component} from 'react';
import '../../css/components/button.css';

class Button extends Component {  
	render() {		
		return (
			<i {...this.props} className = {'button ' + this.props.className}></i>
		);
	}
}

export default Button