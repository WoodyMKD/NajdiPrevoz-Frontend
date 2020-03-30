import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import AddEditForm from './AddEditForm/AddEditForm'
import {faPlusCircle, faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class FormModal extends Component {

	constructor(props) {
		super(props);
		this.state = {
			opened: false
		}
	}

	toggle = () => {
		this.setState(prevState => ({
			opened: !prevState.opened
		}))
	};

	render() {
		const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>;

		const action = this.props.action;
		const label = this.props.buttonLabel;

		let button = '';
		let title = '';

		if(action === 'Edit'){
			button = <Button
				color="warning"
				onClick={this.toggle}
				style={{float: "left", marginRight:"10px"}}>
				<FontAwesomeIcon icon={faPlusSquare}/> {label}
			</Button>;
			title = 'Edit Item'
		} else if (action === 'Create') {
			button = <Button
				color="success"
				onClick={this.toggle}
				style={{float: "left", marginRight:"10px"}}>
				<FontAwesomeIcon icon={faPlusCircle}/> {label}
			</Button>;
			title = 'Нова понуда'
		}


		return (
			<span>
				{button}
				<Modal isOpen={this.state.opened} toggle={this.toggle} className={this.props.className}>
					<ModalHeader toggle={this.toggle} close={closeBtn}>{title}</ModalHeader>
					<ModalBody>
						<AddEditForm
							createTrip={this.props.createTrip}
							updateState={this.props.updateState}
							toggle={this.toggle}
							item={this.props.item} />
					</ModalBody>
				</Modal>
			</span>
		)
	}
}

export default FormModal