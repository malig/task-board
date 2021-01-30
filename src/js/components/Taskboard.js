import React, {Component} from 'react';
import DragSortableList from 'react-drag-sortable'
import Task from './Task';
import Button from './Button';
import Dialog from './Dialog';
import Form from './Form';
import '../../css/components/taskboard.css';
import '../../css/components/search.css';
import '../../css/draggable.css';

class Taskboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: props.initialData      
		};

		this.counter = 0;
		this._preSearchData = null;    
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

	_startSearching() {
		this._preSearchData = this.state.data;
	}

	_doneSearching() {
		this.setState({
			data: this._preSearchData,
		});
	}

	_search(e) {
		var needle = e.target.value.toLowerCase();
		var searchdata;

		if (!needle) {
			this.setState({
				data: this._preSearchData
			});

			return;
		}
		
		searchdata = this._preSearchData.filter(row => {
			if (row.title.toString().toLowerCase().indexOf(needle) === 0 || 
					row.developer.toString().toLowerCase().indexOf(needle) === 0) {
				return true;
			}

			return false;
		});

		this.setState({
			data: searchdata
		});
	}	

	_taskDelete(idx) {
		let data = Array.from(this.state.data);

		data.splice(idx, 1);	

		this.setState({
			data: data
		});		
	}

	_taskAdd() {
		let data = Array.from(this.state.data);

		data.unshift(this.refs.form.getData());

		this.setState({
			dialogVisible: false,
			data: data
		});
	}

	_taskEdit(idx, item) {
		let data = Array.from(this.state.data);

		data[idx] = item;

		this.setState({			
			data: data
		});		
	}	

	_sort(sortedList) {		
		let data = [];
		let stateData = this.state.data;
		
		sortedList.forEach((item, i) => data[i] = stateData[item.idx]);

		this.setState({			
			data: data
		});		 		
	 }	
   
	render() {
		return (
			<div className = 'taskboard'>
		        <div className = 'taskboard__toolbar'>
		        	<div className = 'taskboard__toolbar-item'>
						<Button 
							onClick = {this._showDialog.bind(this)}
							className = 'button_dark fas fa-plus'>						
						</Button>		        	
		        	</div>

		        	<div className = 'taskboard__toolbar-item taskboard__toolbar-item_search'>
						<input 
							className = 'search'
							placeholder = 'Search...' 
							onChange = {this._search.bind(this)}
							onFocus = {this._startSearching.bind(this)}
							onBlur = {this._doneSearching.bind(this)}
						/>		        	
		        	</div>
		        </div>

				<div className = 'taskboard__content'>
					<DragSortableList 
						items = {
							this.state.data.map((task, taskIdx) => {
								return {content: (
									<Task 										
										initialData = {task} 
										key = {this.counter++} 
										onDelete = {this._taskDelete.bind(this, taskIdx)}
										onEdit = {this._taskEdit.bind(this, taskIdx)}
									/>
								), idx: taskIdx};
							})
						} 
						onSort={this._sort.bind(this)}
						type = 'grid'
					/>
				</div>

				{
					this.state.dialogVisible ? 
						<Dialog header = 'Добавление' onAction = {this._taskAdd.bind(this)} onCancel = {this._hideDialog.bind(this)}>
							<Form ref = 'form'/>
						</Dialog>
						: 
						null
				}				
			</div>
		);
	}
}

export default Taskboard