import Button from './Button';
import React, {Component} from 'react';
import '../../css/components/dialog.css';

class Dialog extends Component {
    render() {
        return (
            <div className = 'dialog'>
                <div className = 'dialog__wrap'>
                    <div className = 'dialog__header'>{this.props.header}</div>

                    <div className = 'dialog__content'>{this.props.children}</div>

                    <div className = 'dialog__footer'>
                        <div className = 'dialog__footer-item'>
                            <Button 
                                onClick = {this.props.onAction.bind(this)}
                                className = 'button_dark fas fa-check'>                            
                            </Button>                        
                        </div>

                        <div className = 'dialog__footer-item'>
                            <Button 
                                onClick = {this.props.onCancel.bind(this)}
                                className = 'button_dark fas fa-ban'>                            
                            </Button>                         
                        </div>                                               
                    </div>
                </div>
            </div>
        );
    }
}

export default Dialog