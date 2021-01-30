import React, {Component} from 'react';
import developers from '../developers';
import '../../css/components/form.css';

class Form extends Component {
	getData() {
	 	let data = {};

		for(var key in this.refs){
			data[key] = this.refs[key].value;
		}		
		
		return data;
	}

	render() {
		return (
			<form className = 'form'>
				<input className = 'form__control' type = 'text' ref = 'title' defaultValue = {this.props.title}/>

				<textarea className = 'form__control form__control_textarea' ref = 'desc' defaultValue = {this.props.desc}/>

				<select className = 'form__control form__control_last' ref = 'developer' defaultValue = {this.props.developer || 0}>
					{developers.map((developer, idx) => {
						return <option value = {idx}>{developer}</option>;
					})}
				</select>				
			</form>
		);
	}
}

export default Form