import React, {Component} from 'react';
import {Alert, Button, Container, Form, FormFeedback, FormGroup, Input, Label} from "reactstrap";
import {withRouter} from 'react-router';

import authService from '../../../services/authService';
import {
	EMAIL_MAX_LENGTH,
	NAME_MAX_LENGTH,
	NAME_MIN_LENGTH,
	PASSWORD_MAX_LENGTH,
	PASSWORD_MIN_LENGTH,
	USERNAME_MAX_LENGTH,
	USERNAME_MIN_LENGTH
} from '../../../utils/constants';

import './Register.css';

class RegisterForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: {
				value: '',
				valid: {
					status: false,
					errorMsg: `Ова поле е задолжително!`
				}
			},
			username: {
				value: '',
				valid: {
					status: false,
					errorMsg: `Ова поле е задолжително!`
				}
			},
			email: {
				value: '',
				valid: {
					status: false,
					errorMsg: `Ова поле е задолжително!`
				}
			},
			password: {
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
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
    this.onDismissAlert = this.onDismissAlert.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
		this.validateUsernameAvailability = this.validateUsernameAvailability.bind(this);
		this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
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

	handleSubmit(event) {
		event.preventDefault();
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.stopPropagation();
		}

		const signupRequest = {
			name: this.state.name.value,
			username: this.state.username.value,
			email: this.state.email.value,
			password: this.state.password.value
		};

		if(!this.isFormValid()) {
			this.setState({
				errorsVisible: true,
				formValidated: true,
				errorMessage: "Пополнете ги бараните задолжителни полиња!"
			});
		} else {
			authService.signup(signupRequest)
				.then(response => {
					this.props.onRegister();
				}).catch(error => {
				console.log(error);
			});
		}
	}

	onDismissAlert = () => {
		this.setState({
			errorsVisible: true,
			errorMessage: ""
		});
	};

  isFormValid() {
    return (this.state.name.valid.status === true &&
      this.state.username.valid.status === true &&
      this.state.email.valid.status === true &&
      this.state.password.valid.status === true);
  }

	render() {
		let alerts = null;
		if(this.state.errorMessage.length !== 0) {
			alerts = (
				<Alert color="danger" isOpen={this.state.errorsVisible} toggle={this.onDismissAlert}>
					{this.state.errorMessage}
				</Alert>
			);
		}

		return (
			<Container>
				<Form onSubmit={this.handleSubmit} className="needs-validation" noValidate>

					{alerts}

					<FormGroup>
						<Label for="name">Име и презиме: </Label>
						<CustomInput name="name" id="name" inputType="text" placeholder="Име и презиме"
												 validationFun={this.validateName} parentFunction={this.handleInputChange}
												 isValid={this.state.name.valid.status} formValidated={this.state.formValidated}/>
						<FormFeedback>{this.state.name.valid.errorMsg}</FormFeedback>
					</FormGroup>

					<FormGroup>
						<Label for="username">Корисничко име</Label>
						<CustomInput name="username" id="username" inputType="text" placeholder="Корисничко име"
												 validationFun={this.validateUsername} parentFunction={this.handleInputChange}
												 isValid={this.state.username.valid.status} formValidated={this.state.formValidated}
												 onBlur={this.validateUsernameAvailability}/>
						<FormFeedback>{this.state.username.valid.errorMsg}</FormFeedback>
					</FormGroup>

					<FormGroup>
						<Label for="email">Е-Пошта</Label>
						<CustomInput name="email" id="email" inputType="text" placeholder="Е-Пошта"
												 validationFun={this.validateEmail} parentFunction={this.handleInputChange}
												 isValid={this.state.email.valid.status} formValidated={this.state.formValidated}
												 onBlur={this.validateEmailAvailability}/>
						<FormFeedback>{this.state.email.valid.errorMsg}</FormFeedback>
					</FormGroup>

					<FormGroup>
						<Label for="password">Лозинка</Label>
						<CustomInput name="password" id="password" inputType="password" placeholder="Лозинка"
												 validationFun={this.validatePassword} parentFunction={this.handleInputChange}
												 isValid={this.state.password.valid.status} formValidated={this.state.formValidated}/>
						<FormFeedback>{this.state.password.valid.errorMsg}</FormFeedback>
					</FormGroup>

					<Button color="primary" block type="submit">
						Регистрирај се
					</Button>
				</Form>
			</Container>
		);
	}

	validateName = (name) => {
		if (name.length < NAME_MIN_LENGTH) {
			return {
				status: false,
				errorMsg: `Името е прекратко (Потребни се најмалку ${NAME_MIN_LENGTH} карактери.)`
			}
		} else if (name.length > NAME_MAX_LENGTH) {
			return {
				status: false,
				errorMsg: `Името е предолго (Дозволено е најмногу ${NAME_MAX_LENGTH} карактери.)`
			}
		} else {
			return {
				status: true,
				errorMsg: null,
			};
		}
	};

	validateEmail = (email) => {
		if (!email) {
			return {
				status: false,
				errorMsg: 'Ова поле е задолжително!'
			}
		}

		const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
		if (!EMAIL_REGEX.test(email)) {
			return {
				status: false,
				errorMsg: 'Е-Поштата не е во валиден формат.'
			}
		}

		if (email.length > EMAIL_MAX_LENGTH) {
			return {
				status: false,
				errorMsg: `Е-Поштата е предолга (Дозволено е најмногу ${EMAIL_MAX_LENGTH} карактери.)`
			}
		}

		return {
			status: true,
			errorMsg: null
		}
	};

	validateUsername = (username) => {
		if (username.length < USERNAME_MIN_LENGTH) {
			return {
				status: false,
				errorMsg: `Корисничкото име е прекратко (Потребни се најмалку ${USERNAME_MIN_LENGTH} карактери.)`
			}
		} else if (username.length > USERNAME_MAX_LENGTH) {
			return {
				status: false,
				errorMsg: `Корисничкото име е предолго (Дозволено е најмногу ${USERNAME_MAX_LENGTH} карактери.)`
			}
		} else {
			return {
				status: true,
				errorMsg: null
			}
		}
	};

	validatePassword = (password) => {
		if (password.length < PASSWORD_MIN_LENGTH) {
			return {
				status: false,
				errorMsg: `Лозинката е прекратка (Потребни се најмалку ${PASSWORD_MIN_LENGTH} карактери.)`
			}
		} else if (password.length > PASSWORD_MAX_LENGTH) {
			return {
				status: false,
				errorMsg: `Името е предолго (Дозволено е најмногу ${PASSWORD_MAX_LENGTH} карактери.)`
			}
		} else {
			return {
				status: true,
				errorMsg: null,
			};
		}
	}

	validateUsernameAvailability() {
		const usernameValue = this.state.username.value;
		const usernameValidation = this.validateUsername(usernameValue);

		if (usernameValidation.status === false) return;

		authService.checkUsernameAvailability(usernameValue)
			.then(response => {
				if (response.available) {
					this.setState({
						username: {
							value: usernameValue,
							valid: {
								status: true,
								errorMsg: null
							}
						}
					});
				} else {
					this.setState({
						username: {
							value: usernameValue,
							valid: {
								status: false,
								errorMsg: "Ова корисничко име е веќе регистрирано!"
							}
						}
					});
				}
			}).catch(error => {
				console.log(error);
		});
	}

	validateEmailAvailability() {
		const emailValue = this.state.email.value;
		const emailValidation = this.validateEmail(emailValue);

		if (emailValidation.status === false) return;

		authService.checkEmailAvailability(emailValue)
			.then(response => {
				if (response.available) {
					this.setState({
						email: {
							value: emailValue,
							valid: {
								status: true,
								errorMsg: null
							}
						}
					});
				} else {
					this.setState({
						email: {
							value: emailValue,
							valid: {
								status: false,
								errorMsg: "Оваа е-пошта е веќе регистрирана!"
							}
						}
					});
				}
			}).catch(error => {
				console.log(error);
		});
	}
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
		this.props.parentFunction(e, this.props.validationFun)
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
				onBlur={this.props.onBlur}/>
		)
	}
}

export default withRouter(RegisterForm);