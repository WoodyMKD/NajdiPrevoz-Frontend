import React from 'react';
import {Button, Form, FormGroup, Label, Input, Alert, FormFeedback, Col, Row} from 'reactstrap';
import {allCities, MIN_PRICE} from "../../../../utils/constants";
import DropdownList from 'react-widgets/lib/DropdownList'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import LoadingOverlay from "react-loading-overlay";
import * as moment from "moment";
import AuthService from "../../../../services/authService";
import {store} from "react-notifications-component";
import {notificationError} from "../../../../utils/notifications";

class AddAppTripForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			car: {
				value: {},
				valid: {
					status: false,
					errorMsg: `Ова поле е задолжително!`
				}
			},
			telNumber: {
				value: {},
				valid: {
					status: false,
					errorMsg: `Ова поле е задолжително!`
				}
			},
			availableSeats: {
				value: 1,
				valid: {
					status: true,
					errorMsg: null
				}
			},
			price: {
				value: 50,
				valid: {
					status: true,
					errorMsg: null
				}
			},
			cityFrom: '',
			cityTo: '',
			startDate: moment(new Date()).locale('mk').format("L"),
			startTime: moment(new Date()).locale('mk').format("LT"),
			formValidated: false,
			errorsVisible: false,
			errorMessage: "",
			carDropDownLoading: false,
			carList: [],
			telNumberDropDownLoading: false,
			telNumberList: []
		};
		this.handleAddSubmit = this.handleAddSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleDropdownInputChange = this.handleDropdownInputChange.bind(this);
		this.onDismissAlert = this.onDismissAlert.bind(this);
		this.isFormValid = this.isFormValid.bind(this);
		this.loadCarsForDropDown = this.loadCarsForDropDown.bind(this);
		this.loadTelNumberForDropDown = this.loadTelNumberForDropDown.bind(this);
	}

	componentDidMount() {
		this.loadCarsForDropDown();
		this.loadTelNumberForDropDown();
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

			const form = event.target;
			let dateTime = moment(this.state.startDate + " " + this.state.startTime, "DD.MM.YYYY HH:mm").unix();

			const newTrip = {
				carId: this.state.car.value.id,
				telNumber: this.state.telNumber.value,
				availableSeats: form.availableSeats.value,
				price: form.price.value,
				cityFrom: form.cityFrom.value,
				cityTo: form.cityTo.value,
				startTime: dateTime
			};
			this.props.createTrip(newTrip);
		}
	};

	handleDropdownInputChange(value, stateName) {
		if(stateName === "car" || stateName === "telNumber") {
			this.setState({
				[stateName]: {
					value: value,
					valid: {
						status: true,
						errorMsg: ''
					}
				}
			});
		} else {
			this.setState({
				[stateName] : value
			});
		}
	}

	handleDateAndTimeInputChange(value, stateName) {
		let format = '';
		if(stateName === "startDate") format="L";
		else format = "LT";

		value = moment(value).locale('mk').format(format);

		this.setState({
			[stateName] : value
		});
	}

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
		return (this.state.car.valid.status === true &&
			this.state.telNumber.valid.status === true &&
			this.state.availableSeats.valid.status === true &&
			this.state.price.valid.status === true
		);
	}

	loadCarsForDropDown() {
		this.setState({
			carDropDownLoading: true
		});

		AuthService.getUserCars().then((response) => {
			const cars = response.map((response) => {
				return {
					id: response.id,
					car: response.manufacturer + " " + response.model
				};
			});

			this.setState({
				carList: cars,
				carDropDownLoading: false
			});
		}).catch((error) => {
			store.addNotification({
				...notificationError,
				message: error.toString()
			});
		});
	}

	loadTelNumberForDropDown() {
		this.setState({
			telNumberDropDownLoading: true
		});

		AuthService.getUserTelNumbers().then((response) => {
			const numbers = response.map((response) => {
				return response.number;
			});

			this.setState({
				telNumberList: numbers,
				telNumberDropDownLoading: false
			});
		}).catch((error) => {
			store.addNotification({
				...notificationError,
				message: error.toString()
			});
		});
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

		const oneWookFromNow = new Date();
		oneWookFromNow.setDate(oneWookFromNow.getDate() + 7);

		return (
			<LoadingOverlay
				active={this.props.isModalLoading}
				spinner
				text='Процесирање...'
			>
				<Form onSubmit={this.props.item ? this.submitFormEdit : this.handleAddSubmit} className="needs-validation"
						noValidate>

					{alerts}

					<Row form>
						<Col md={6}>
							<FormGroup>
								<Label for="cityFrom">Поаѓање од</Label>
								<DropdownList
									filter={(item, searchTerm, idx) => {
										return item.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
									}}
									name="cityFrom"
									id="cityFrom"
									data={allCities}
									onChange={value => this.handleDropdownInputChange(value, "cityFrom")}
									defaultValue={this.props.cityFrom}
									placeholder="Град"
								/>
							</FormGroup>
						</Col>
						<Col md={6}>
							<FormGroup>
								<Label for="cityTo">Пристигнување во</Label>
								<DropdownList
									filter={(item, searchTerm, idx) => {
										return item.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
									}}
									name="cityTo"
									id="cityTo"
									data={allCities}
									onChange={value => this.handleDropdownInputChange(value, "cityTo")}
									defaultValue={this.props.cityTo}
									placeholder="Град"
								/>
							</FormGroup>
						</Col>
					</Row>

					<Row form>
						<Col md={6}>
							<FormGroup>
								<Label for="startDate">Датум</Label>
								<DateTimePicker
									format='Do MMMM'
									defaultValue={new Date()}
									min={new Date()}
									max={oneWookFromNow}
									time={false}
									onChange={value => this.handleDateAndTimeInputChange(value, "startDate")}
								/>
							</FormGroup>
						</Col>
						<Col md={6}>
							<FormGroup>
								<Label for="startTime">Време</Label>
								<DateTimePicker
									defaultValue={new Date()}
									date={false}
									onChange={value => this.handleDateAndTimeInputChange(value, "startTime")}
								/>
							</FormGroup>
						</Col>
					</Row>

					<FormGroup>
						<Label for="availableSeats">Слободни места</Label>
						<CustomInput name="availableSeats" id="availableSeats" inputType="number"
												 value={this.state.availableSeats.value === null ? '' : this.state.availableSeats.value}
												 validationFun={this.validateSeats} parentFunction={this.handleInputChange}
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
						<DropdownList
							filter={(item, searchTerm, idx) => {
								return item.includes(searchTerm);
							}}
							busy={this.state.telNumberDropDownLoading}
							name="telNumber"
							id="telNumber"
							data={this.state.telNumberList}
							containerClassName={(this.state.formValidated) ? ((this.state.telNumber.valid.status) ? 'form-control is-valid' : 'form-control is-invalid') : ''}
							onChange={value => this.handleDropdownInputChange(value, "telNumber")}
							placeholder="Избери"
						/>
						<FormFeedback>{this.state.telNumber.valid.errorMsg}</FormFeedback>
					</FormGroup>

					<FormGroup>
						<Label for="car">Возило</Label>
						<DropdownList
							filter={(item, searchTerm, idx) => {
								return item.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
							}}
							busy={this.state.carDropDownLoading}
							name="car"
							id="car"
							data={this.state.carList}
							valueField="id"
							textField="car"
							containerClassName={(this.state.formValidated) ? ((this.state.car.valid.status) ? 'form-control is-valid' : 'form-control is-invalid') : ''}
							onChange={value => this.handleDropdownInputChange(value, "car")}
							placeholder="Избери"
						/>
						<FormFeedback>{this.state.car.valid.errorMsg}</FormFeedback>
					</FormGroup>

					<Button color="primary" block type="submit">
						Потврди
					</Button>
				</Form>
			</LoadingOverlay>
		);
	}

	validateSeats = (seats) => {
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

export default AddAppTripForm