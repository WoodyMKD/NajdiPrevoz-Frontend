import React from 'react';
import {Button, Form, FormGroup, Label, Input, Alert, FormFeedback, Col, Row} from 'reactstrap';
import {allCities, MIN_PRICE} from "../../../../utils/constants";
import DropdownList from 'react-widgets/lib/DropdownList'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import LoadingOverlay from "react-loading-overlay";
import * as moment from "moment";
import AuthService from "../../../../services/authService";

class AddEditAppTripForm extends React.Component {
	constructor(props) {
		super(props);

		const statusField = !!(props.car);
		const errorMsgField = (props.car) ? '' : `Ова поле е задолжително!`;

		this.state = {
			manufacturer: {
				value: (props.car) ? props.car.manufacturer : "",
				valid: {
					status: statusField,
					errorMsg: errorMsgField
				}
			},
			model: {
				value: (props.car) ? props.car.model : "",
				valid: {
					status: statusField,
					errorMsg: errorMsgField
				}
			},
			color: {
				value: (props.car) ? props.car.color : "",
				valid: {
					status: statusField,
					errorMsg: errorMsgField
				}
			},
			formValidated: false,
			errorsVisible: false,
			errorMessage: "",
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.onDismissAlert = this.onDismissAlert.bind(this);
		this.isFormValid = this.isFormValid.bind(this);
	}

	handleSubmit(event, action) {
		event.preventDefault();
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.stopPropagation();
		}

		if(!this.isFormValid()) {
			this.setState({
				errorsVisible: true,
				formValidated: true,
				errorMessage: "Пополнете ги бараните задолжителни полиња!"
			});
		} else {
			const form = event.target;

			if(action === "Add") {
				const car = {
					manufacturer: form.manufacturer.value,
					model: form.model.value,
					color: form.color.value
				};
				this.props.addCar(car);
			} else {
				const car = {
					id: this.props.car.id,
					manufacturer: form.manufacturer.value,
					model: form.model.value,
					color: form.color.value
				};
				this.props.editCar(car);
			}
		}
	};

	handleInputChange(event, validationFun) {
		const target = event.target;
		const inputName = target.name;
		const inputValue = target.value;

		this.setState({
			[inputName]: {
				value: inputValue,
				valid: validationFun(inputValue)
			}
		});
	}

	onDismissAlert = () => {
		this.setState({
			errorsVisible: true,
			errorMessage: ""
		});
	};

	isFormValid() {
		return (this.state.manufacturer.valid.status === true &&
			this.state.model.valid.status === true &&
			this.state.color.valid.status === true
		);
	}

	render() {
		let alerts = null;
		if (this.state.errorMessage.length !== 0) {
			alerts = (
				<Alert color="danger" isOpen={this.state.errorsVisible} toggle={this.onDismissAlert}>
					{this.state.errorMessage}
				</Alert>
			);
		}

		return (
			<LoadingOverlay
				active={this.props.isModalLoading}
				spinner
				text='Процесирање...'
			>
				<Form onSubmit={(e) => {
					return this.props.car ? this.handleSubmit(e, "Edit") : this.handleSubmit(e, "Add")
				}} className="needs-validation" noValidate>

					{alerts}

					<FormGroup>
						<Label for="manufacturer">Производител</Label>
						<CustomInput name="manufacturer" id="manufacturer" inputType="text"
												 value={this.state.manufacturer.value}
												 validationFun={this.validateNonEmpty} parentFunction={this.handleInputChange}
												 isValid={this.state.manufacturer.valid.status} formValidated={this.state.formValidated}/>
						<FormFeedback>{this.state.manufacturer.valid.errorMsg}</FormFeedback>
					</FormGroup>

					<FormGroup>
						<Label for="model">Модел</Label>
						<CustomInput name="model" id="model" inputType="text"
												 value={this.state.model.value}
												 validationFun={this.validateNonEmpty} parentFunction={this.handleInputChange}
												 isValid={this.state.model.valid.status} formValidated={this.state.formValidated}/>
						<FormFeedback>{this.state.model.valid.errorMsg}</FormFeedback>
					</FormGroup>

					<FormGroup>
						<Label for="color">Боја</Label>
						<CustomInput name="color" id="color" inputType="text"
												 value={this.state.color.value}
												 validationFun={this.validateNonEmpty} parentFunction={this.handleInputChange}
												 isValid={this.state.color.valid.status} formValidated={this.state.formValidated}/>
						<FormFeedback>{this.state.color.valid.errorMsg}</FormFeedback>
					</FormGroup>

					<Button color="primary" block type="submit">
						Потврди
					</Button>
				</Form>
			</LoadingOverlay>
		);
	}

	validateNonEmpty = (string) => {
		if (string.length === 0) {
			return {
				status: false,
				errorMsg: `Ова поле е задолжително!`
			}
		} else {
			return {
				status: true,
				errorMsg: null,
			};
		}
	};
}

class CustomInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inputVal: ""
		};
		this.changeHandler = this.changeHandler.bind(this)
	}

	changeHandler(e) {
		this.props.parentFunction(e, this.props.validationFun);
	}

	render() {
		let validPseudoClass = "";
		if (this.props.formValidated === true) {
			validPseudoClass = (this.props.isValid) ? 'is-valid' : 'is-invalid';
		}

		return (
			<Input
				type={this.props.inputType}
				name={this.props.name}
				id={this.props.id}
				placeholder={this.props.placeholder}
				onChange={this.changeHandler}
				className={validPseudoClass}
				onBlur={this.props.onBlur}
				value={this.props.value}/>
		)
	}
}

export default AddEditAppTripForm