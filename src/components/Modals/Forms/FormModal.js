import React, {Component} from 'react'
import {Button, Modal, ModalBody, ModalHeader} from 'reactstrap'
import AddAppTripForm from './AddAppTripForm/AddAppTripForm'
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AddEditCarModalForm from "./AddEditCarModalForm/AddEditCarModalForm";
import AddTelNumberModalForm from "./AddTelNumberModalForm/AddTelNumberModalForm";

class FormModal extends Component {
	render() {
		const closeBtn = <button className="close" onClick={this.props.toggleFunction}>&times;</button>;

		const action = this.props.action;
		const label = this.props.buttonLabel;

		let button = '';
		let title = '';
		let form = '';

		if (action === 'CreateAppTrip') {
			button = <Button
				color="success"
				onClick={this.props.toggleFunction}
				style={{float: "left", marginRight:"10px"}}>
				<FontAwesomeIcon icon={faPlusCircle}/> {label}
			</Button>;
			title = 'Нова понуда';
			form = (
				<AddAppTripForm
					createTrip={this.props.createTrip}
					updateState={this.props.updateState}
					item={this.props.item}
					cityFrom={this.props.cityFrom}
					cityTo={this.props.cityTo}
					isModalLoading={this.props.isModalLoading}
				/>
			);
		} else if (action === 'EditCar') {
			title = 'Измени возило';

			form = (
				<AddEditCarModalForm
					editCar={this.props.editCar}
					car={this.props.car}
					isModalLoading={this.props.isModalLoading}
				/>
			);
		} else if (action === 'AddCar') {
			button = <Button
				color="success"
				onClick={this.props.toggleFunction}
				style={{float: "left", marginRight:"10px"}}>
				<FontAwesomeIcon icon={faPlusCircle}/> {label}
			</Button>;
			title = 'Ново возило';

			form = (
				<AddEditCarModalForm
					addCar={this.props.addCar}
					isModalLoading={this.props.isModalLoading}
				/>
			);
		} else if (action === 'AddTelNumber') {
			button = <Button
				color="success"
				onClick={this.props.toggleFunction}
				style={{float: "left", marginRight: "10px"}}>
				<FontAwesomeIcon icon={faPlusCircle}/> {label}
			</Button>;
			title = 'Нов број';

			form = (
				<AddTelNumberModalForm
					addTelNumber={this.props.addTelNumber}
					isModalLoading={this.props.isModalLoading}
				/>
			);
		}


		return (
			<span>
				{button}
				<Modal isOpen={this.props.modalOpened} toggle={this.props.toggleFunction} className={this.props.className}>
					<ModalHeader toggle={this.props.toggleFunction} close={closeBtn}>{title}</ModalHeader>
					<ModalBody>
						{form}
					</ModalBody>
				</Modal>
			</span>
		)
	}
}

export default FormModal