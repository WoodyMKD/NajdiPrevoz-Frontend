import React from 'react';
import {Alert, Button, Form, FormFeedback, FormGroup, Input, Label} from 'reactstrap';
import LoadingOverlay from "react-loading-overlay";

class AddTelNumberModalForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			telNumber: {
				value: "",
				valid: {
					status: false,
					errorMsg: `Ова поле е задолжително!`
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

	handleSubmit(event) {
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

			const telNumber = {
				number: form.telNumber.value
			};
			this.props.addTelNumber(telNumber);
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
		return (this.state.telNumber.valid.status === true);
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
				<Form onSubmit={this.handleSubmit} className="needs-validation" noValidate>

					{alerts}

					<FormGroup>
						<Label for="telNumber">Телефонски број</Label>
						<CustomInput name="telNumber" id="telNumber" inputType="text"
												 validationFun={this.validateTelNumber} parentFunction={this.handleInputChange}
												 isValid={this.state.telNumber.valid.status} formValidated={this.state.formValidated}
												 placeholder="07XXXXXXX"
						/>
						<FormFeedback>{this.state.telNumber.valid.errorMsg}</FormFeedback>
					</FormGroup>

					<Button color="primary" block type="submit">
						Потврди
					</Button>
				</Form>
			</LoadingOverlay>
		);
	}

	validateTelNumber = (number) => {
		if (number.length === 0) {
			return {
				status: false,
				errorMsg: `Ова поле е задолжително!`
			}
		} else if((new RegExp("^07([0-9]{7})$")).test(number) === false) {
			return {
				status: false,
				errorMsg: `Внесениот телефонски број не е во бараниот формат! (Пример: 07XXXXXXX)`
			};
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

export default AddTelNumberModalForm;