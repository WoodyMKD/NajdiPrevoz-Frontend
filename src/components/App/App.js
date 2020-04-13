import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {Redirect, withRouter} from "react-router";
import ReactNotification, {store} from 'react-notifications-component'
import {CSSTransition, TransitionGroup} from "react-transition-group";

import { ACCESS_TOKEN } from '../../utils/constants';
import AppTripsRepository from "../../services/appTripService";
import authService from "../../services/authService";
import {notificationError, notificationSuccess} from "../../utils/notifications";

import Trips from "../Trips/Trips";
import LoginForm from "../Auth/Login/Login";
import RegisterForm from "../Auth/Register/Register";
import Header from "../Header/Header";
import LoadingComponent from "../Loading/Loading";
import Footer from "../Footer/Footer";
import Home from "../Home/Home";

import './App.css';
import Profile from "../Profile/Profile";

// TODO: Protected LINKS (authentication)
// TODO: Validation methods for the forms
// TODO: DropDown and DateTimePicker for forms
// TODO: Create, Edit, Finish AppTrip

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      cityFrom: "Скопје",
      cityTo: "Крива Паланка",
      featuredAppTrips: []
    };

    this.finishLoading = this.finishLoading.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.loadFeaturedAppTrips = this.loadFeaturedAppTrips.bind(this);
    this.onCityChange = this.onCityChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    authService.getCurrentUser().then(response => {
      this.setState({
        currentUser: response,
        isAuthenticated: true
      });
      this.finishLoading();
    }).catch((error) => {
      store.addNotification({
        ...notificationError,
        message: error
      });
    });
    this.finishLoading();
  }

  loadFeaturedAppTrips = (page=0) => {
    AppTripsRepository.getTrips().then((data) => {
      this.setState({
        featuredAppTrips: data.content
      });
      this.finishLoading();
    }).catch((error) => {
      store.addNotification({
        ...notificationError,
        message: error
      });
    });
  };

  onCityChange = (cityFrom, cityTo, redirect) => {
    if(cityFrom === cityTo) {
      store.addNotification({
        ...notificationError,
        message: "Изберете два различни градови!"
      });
    } else {
      this.setState({
        cityFrom: cityFrom,
        cityTo: cityTo
      });

      if(redirect === true) this.props.history.push("/trips");
    }
  };

  handleRegister() {
    this.props.history.push("/");

    store.addNotification({
      ...notificationSuccess,
      message: "Успешно се регистриравте на апликацијата. Сега може да се најавите."
    });
  }

  handleLogin() {
    this.loadCurrentUser();
    this.props.history.push("/");

    store.addNotification({
      ...notificationSuccess,
      message: "Успешно се најавивте на апликацијата."
    });
  }

  handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    this.props.history.push("/");

    this.setState({
        currentUser: null,
        isAuthenticated: false,
        featuredAppTrips: []
    });

    store.addNotification({
        ...notificationSuccess,
        message: "Успешно се одјавивте од апликацијата."
    });
  }

  finishLoading() {
    document.body.classList.add('loaded');
  }


  render() {
    const location = this.props.location;

    const routing = (
      <TransitionGroup className="transition-group">
        <CSSTransition
          key={location.pathname}
          timeout={{ enter: 350, exit: 350 }}
          classNames={'fade'}>
          <section className="route-section">
            <Switch location={location}>
              <Route path={"/login"} exact render={() =>
                <LoginForm onLogin={this.handleLogin}/>
              }/>
              <Route path={"/register"} exact render={() =>
                <RegisterForm onRegister={this.handleRegister}/>
              }/>
              <Route path={"/trips"} exact render={() =>
                <Trips cityFrom={this.state.cityFrom} cityTo={this.state.cityTo} onCityChange={this.onCityChange} currentUser={this.state.currentUser}/>
              }/>
              <Route path={"/my-profile"} exact render={() =>
                <Profile />
              }/>
              <Route path={"/"} exact render={() =>
                <Home onCityChange={this.onCityChange} cityFrom={this.state.cityFrom} cityTo={this.state.cityTo}/>
              }/>
              <Route>
                <Redirect to={"/"} />
              </Route>
            </Switch>
          </section>
        </CSSTransition>
      </TransitionGroup>
    );

    return (
        <div className="main-container">
          <ReactNotification />
          <LoadingComponent/>

          <Header isAuthenticated={this.state.isAuthenticated}
                  currentUser={this.state.currentUser}
                  onLogout={this.handleLogout}
          />

          {routing}

          <Footer/>
        </div>
    );
  }
}

export default withRouter(App);

