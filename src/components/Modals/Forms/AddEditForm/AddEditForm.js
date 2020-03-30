import React from 'react';
import {Button, Form, FormGroup, Label, Input, Alert, FormFeedback} from 'reactstrap';
import authService from "../../../../services/authService";
import {MIN_PRICE} from "../../../../utils/constants";

class AddEditForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			carManufacturer: {
				value: '',
				valid: {
					status: false,
					errorMsg: `Ова поле е задолжително!`
				}
			},
			carModel: {
				value: '',
				valid: {
					status: false,
					errorMsg: `Ова поле е задолжително!`
				}
			},
			carColor: {
				value: '',
				valid: {
					status: false,
					errorMsg: `Ова поле е задолжително!`
				}
			},
			telNumber: {
				value: '',
				valid: {
					status: false,
					errorMsg: `Ова поле е задолжително!`
				}
			},
			availableSeats: {
				value: 0,
				valid: {
					status: false,
					errorMsg: `Ова поле е задолжително!`
				}
			},
			price: {
				value: 0,
				valid: {
					status: false,
					errorMsg: `Ова поле е задолжително!`
				}
			},
			cityFrom: {
				value: '',
				valid: {
					status: false,
					errorMsg: `Ова поле е задолжително!`
				}
			},
			cityTo: {
				value: '',
				valid: {
					status: false,
					errorMsg: `Ова поле е задолжително!`
				}
			},
			formValidated: false,
			errorsVisible: false,
			errorMessage: ""
		};
		this.handleAddSubmit = this.handleAddSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.onDismissAlert = this.onDismissAlert.bind(this);
		this.isFormValid = this.isFormValid.bind(this);
	}

	handleAddSubmit(event) {
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

		}

		// fetch('http://localhost:3000/crud', {
		// 	method: 'post',
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	},
		// 	body: JSON.stringify({
		// 		first: this.state.first,
		// 		last: this.state.last,
		// 		email: this.state.email,
		// 		phone: this.state.phone,
		// 		location: this.state.location,
		// 		hobby: this.state.hobby
		// 	})
		// })
		// 	.then(response => response.json())
		// 	.then(item => {
		// 		if(Array.isArray(item)) {
		// 			this.props.addItemToState(item[0])
		// 			this.props.toggle()
		// 		} else {
		// 			console.log('failure')
		// 		}
		// 	})
		// 	.catch(err => console.log(err))
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

		console.log(this.state);
	}

	onDismissAlert = () => {
		this.setState({
			errorsVisible: true,
			errorMessage: ""
		});
	};

	isFormValid() {
		return (this.state.carManufacturer.valid.status === true &&
			this.state.carModel.valid.status === true &&
			this.state.carColor.valid.status === true &&
			this.state.telNumber.valid.status === true &&
			this.state.availableSeats.valid.status === true &&
			this.state.price.valid.status === true &&
			this.state.cityFrom.valid.status === true &&
			this.state.cityTo.valid.status === true);
	}

	componentDidMount() {
		// if item exists, populate the state with proper data
		// if(this.props.item){
		// 	const { id, first, last, email, phone, location, hobby } = this.props.item;
		// 	this.setState({ id, first, last, email, phone, location, hobby })
		// }
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

		console.log()

		return (
			<Form onSubmit={this.props.item ? this.submitFormEdit : this.handleAddSubmit} className="needs-validation"
						noValidate>

				{alerts}

				{/*<Row form>*/}
				{/*	<Col md={6}>*/}
				{/*		<FormGroup>*/}
				{/*			<Label for="cityFrom">Тргнување од</Label>*/}
				{/*			<Input type="select" name="cityFrom" id="cityFrom">*/}
				{/*				<option>1</option>*/}
				{/*				<option>2</option>*/}
				{/*				<option>3</option>*/}
				{/*				<option>4</option>*/}
				{/*				<option>5</option>*/}
				{/*			</Input>*/}
				{/*		</FormGroup>*/}
				{/*	</Col>*/}
				{/*	<Col md={6}>*/}
				{/*		<FormGroup>*/}
				{/*			<Label for="cityTo">Пристигнување во</Label>*/}
				{/*			<Input type="select" name="cityTo" id="cityTo">*/}
				{/*				<option>1</option>*/}
				{/*				<option>2</option>*/}
				{/*				<option>3</option>*/}
				{/*				<option>4</option>*/}
				{/*				<option>5</option>*/}
				{/*			</Input>*/}
				{/*		</FormGroup>*/}
				{/*	</Col>*/}
				{/*</Row>*/}

				<FormGroup>
					<Label for="availableSeats">Слободни места</Label>
					<CustomInput name="availableSeats" id="availableSeats" inputType="number"
											 value={this.state.availableSeats.value === null ? '' : this.state.availableSeats.value}
											 validationFun={this.validateName} parentFunction={this.handleInputChange}
											 isValid={this.state.availableSeats.valid.status} formValidated={this.state.formValidated}/>
					<FormFeedback>{this.state.availableSeats.valid.errorMsg}</FormFeedback>
				</FormGroup>

				<FormGroup>
					<Label for="price">Цена</Label>
					<CustomInput name="price" id="price" inputType="number"
											 value={this.state.price.value === null ? '' : this.state.price.value}
											 validationFun={this.validatePrice} parentFunction={this.handleInputChange}
											 isValid={this.state.price.valid.status} formValidated={this.state.formValidated}/>
					<FormFeedback>{this.state.price.valid.errorMsg}</FormFeedback>
				</FormGroup>

				<FormGroup>
					<Label for="telNumber">Телефонски број</Label>
					<CustomInput name="telNumber" id="telNumber" inputType="text"
											 value={this.state.telNumber.value === null ? '' : this.state.telNumber.value}
											 validationFun={this.validateTelNumber} parentFunction={this.handleInputChange}
											 isValid={this.state.telNumber.valid.status} formValidated={this.state.formValidated}/>
					<FormFeedback>{this.state.telNumber.valid.errorMsg}</FormFeedback>
				</FormGroup>

				<FormGroup>
					<Label for="carManufacturer">Производител</Label>
					<CustomInput name="carManufacturer" id="carManufacturer" inputType="text"
											 value={this.state.carManufacturer.value === null ? '' : this.state.carManufacturer.value}
											 validationFun={this.validateCarManufacturer} parentFunction={this.handleInputChange}
											 isValid={this.state.carManufacturer.valid.status} formValidated={this.state.formValidated}/>
					<FormFeedback>{this.state.carManufacturer.valid.errorMsg}</FormFeedback>
				</FormGroup>

				<FormGroup>
					<Label for="carModel">Модел</Label>
					<CustomInput name="carModel" id="carModel" inputType="text"
											 value={this.state.carModel.value === null ? '' : this.state.carModel.value}
											 validationFun={this.validateCarModel} parentFunction={this.handleInputChange}
											 isValid={this.state.carModel.valid.status} formValidated={this.state.formValidated}/>
					<FormFeedback>{this.state.carModel.valid.errorMsg}</FormFeedback>
				</FormGroup>

				<FormGroup>
					<Label for="carColor">Боја</Label>
					<CustomInput name="carColor" id="carColor" inputType="text"
											 value={this.state.carColor.value === null ? '' : this.state.carColor.value}
											 validationFun={this.validateCarColor} parentFunction={this.handleInputChange}
											 isValid={this.state.carColor.valid.status} formValidated={this.state.formValidated}/>
					<FormFeedback>{this.state.carColor.valid.errorMsg}</FormFeedback>
				</FormGroup>

				<Button color="primary" block type="submit">
					Потврди
				</Button>
			</Form>
		);
	}

	validateName = (seats) => {
		if (seats <= 0) {
			return {
				status: false,
				errorMsg: `Мора да имате барем едно слободно место!`
			}
		} else {
			return {
				status: true,
				errorMsg: null,
			};
		}
	};

	validatePrice = (price) => {
		console.log(price);
		if (price < MIN_PRICE) {
			return {
				status: false,
				errorMsg: `Цената мора да изнесува повеќе од 50 денари!`
			}
		} else {
			return {
				status: true,
				errorMsg: null,
			};
		}
	};

	// TODO: Validation constraints

	validateTelNumber = (telNumber) => {
		return {
			status: true,
			errorMsg: null,
		};
	};

	validateCarManufacturer = (carManufacturer) => {
		return {
			status: true,
			errorMsg: null,
		};
	};

	validateCarModel = (carModel) => {
		return {
			status: true,
			errorMsg: null,
		};
	};

	validateCarColor = (carColor) => {
		return {
			status: true,
			errorMsg: null,
		};
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

export default AddEditForm