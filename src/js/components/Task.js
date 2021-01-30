import React, {Component} from 'react';
import Button from './Button';
import Dialog from './Dialog';
import Form from './Form';
import developers from '../developers';
import '../../css/components/task.css';

class Task extends Component { 
	constructor(props) {
		super(props);

		this.state = {
			data: props.initialData,
			dialogVisible: false     
		};    
	} 

	_showDialog() {
		this.setState({
			dialogVisible: true
		});
	}

	_hideDialog() {
		this.setState({
			dialogVisible: false
		});
	}	

	_edit() {
	 	let data = this.refs.form.getData();

		this.setState({
			dialogVisible: false,
			data: data
		});

		this.props.onEdit(data);
	}	

	render() {		
		return (
			<div className = 'task'>
				<div className = 'task__toolbar'>
					<div className = 'task__toolbar-item'>
						<Button 
							onClick = {this._showDialog.bind(this)}
							className = 'far fa-edit'>						
						</Button>					
					</div>

					<div className = 'task__toolbar-item'>
						<Button 
							onClick = {this.props.onDelete.bind(this)}
							className = 'far fa-trash-alt'>						
						</Button>					
					</div>            				
				</div>

				<div className = 'task__content'>
					<h3>{this.state.data.title}</h3>
					<p><em>{this.state.data.desc}</em></p>										
					<p>{developers[this.state.data.developer]}</p>				
				</div>

				{
					this.state.dialogVisible ? 
						<Dialog header = 'Редактирование' onAction = {this._edit.bind(this)} onCancel = {this._hideDialog.bind(this)}>
							<Form ref = 'form' {...this.state.data}/>
						</Dialog>
						: 
						null
				}					
			</div>
		);
	}
}

export default Task