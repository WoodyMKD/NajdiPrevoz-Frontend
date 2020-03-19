import React from 'react';
import {Alert, Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {withRouter} from 'react-router';

import authService from '../../../services/authService';
import {ACCESS_TOKEN} from '../../../utils/constants';

import './Login.scss';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
          username: "",
          password: "",
          formValidated: false,
          errorsVisible: false,
          errorMessage: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDismissAlert = this.onDismissAlert.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;

    this.setState({
      [inputName] : inputValue
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    let loginRequest = {
      usernameOrEmail: this.state.username,
      password: this.state.password
    };

    if(loginRequest.usernameOrEmail.length === 0 || loginRequest.password.length === 0) {
      this.setState({
        errorsVisible: true,
        errorMessage: "Внесете го вашето корисничко име и лозинка!"
      });
    } else {
      authService.login(loginRequest)
        .then(response => {
          localStorage.setItem(ACCESS_TOKEN, response.accessToken);
          this.props.onLogin();
        }).catch(error => {
          if(error.status === 401 && error.message === "Bad credentials") {
            error.message = "Внесовте невалидно корисничко име и лозинка!";
          }
          this.setState({
            errorsVisible: true,
            errorMessage: error.message
          });
        });
    }
  }

  onDismissAlert = () => {
    this.setState({
      errorsVisible: false,
      errorMessage: ""
    });
  };

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
        <Form onSubmit={this.handleSubmit} noValidate>

          {alerts}

          <FormGroup>
            <Label for="username">Корисничко име / Е-Пошта:</Label>
            <Input type="text"
                   name="username"
                   id="username"
                   placeholder="Корисничко име / Е-Пошта"
                   onChange={this.handleInputChange}
                   required/>
          </FormGroup>

          <FormGroup>
            <Label for="password">Лозинка:</Label>
            <Input type="password"
                   name="password"
                   id="password"
                   placeholder="Лозинка"
                   onChange={this.handleInputChange}
                   required/>
          </FormGroup>

          <Button color="primary" block type="submit">
            Најави се
          </Button>
        </Form>
      </Container>
    )
  }
}

export default withRouter(LoginForm);