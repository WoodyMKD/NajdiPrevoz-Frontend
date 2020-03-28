import React, {Component} from 'react';
import {
	Col,
	Container,
	Form,
	FormGroup,
	Input,
	Nav,
	NavItem,
	NavLink,
	Row,
	TabContent,
	TabPane
} from "reactstrap";

import LoadingOverlay from 'react-loading-overlay';

import AppTripRow from './AppTripRow/AppTripRow'

import './AppTrips.css';
import {faArrowRight, faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {allCities} from "../../utils/constants";
import classnames from 'classnames';
import AppTripsRepository from "../../services/appTripService";
import FacebookAppTripRow from "./FacebookTripRow/FacebookTripRow";

class AppTrips extends Component {

	constructor(props) {
		super(props);
		this.state = {
			appTrips: [],
			fbTrips: [],
			isListLoading: false,
			cityFrom: this.props.cityFrom,
			cityTo: this.props.cityTo,
			activeTab: '1'
		};
		this.loadTrips = this.loadTrips.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	componentDidMount() {
		this.loadTrips(this.state.cityFrom, this.state.cityTo);
	}

	loadTrips = (cityFrom, cityTo, page=0) => {
		this.setState({
			isListLoading: true
		});

		const appTrips = AppTripsRepository.getTrips();
		const fbTrips = AppTripsRepository.getTrips();

		Promise.all([ appTrips, fbTrips ]).then((responses) => {
			console.log(responses);
			this.setState({
				isListLoading: false,
				appTrips: responses[0].content,
				fbTrips: responses[1].content
			});
		}).catch((error) => {
			console.log(error);
		});
	};

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

		// refresh the home page form also
		this.props.onCityChange(this.state.cityFrom, this.state.cityTo, false);
		this.loadTrips(this.state.cityFrom, this.state.cityTo);
	}

	render() {
		const toggle = tab => {
			console.log("TAB:" + this.state.activeTab);
			if(this.state.activeTab !== tab) {
				this.setState({
					activeTab : tab
				});
			}
		};

		let allCitiesOptions;
		allCitiesOptions = allCities.map((city, index) => {
			return (
				<option key={index}>{city}</option>
			);
		});

		let appTripRows;
		if (this.state.appTrips.length !== 0) {
			appTripRows = this.state.appTrips.map((trip, index) => {
				return (
					<AppTripRow appTripId={trip.id} trip={trip} key={index}/>
				);
			});
		} else {
			appTripRows = (
				<div className="row">
					<h2 style={{marginLeft: "auto", marginRight: "auto"}}>Нема огласи...</h2>
				</div>
			);
		}

		let fbTripRows;
		if (this.state.fbTrips.length !== 0) {
			fbTripRows = this.state.appTrips.map((trip, index) => {
				return (
					<FacebookAppTripRow appTripId={trip.id} trip={trip} key={index}/>
				);
			});
		} else {
			fbTripRows = (
				<div className="row">
					<h2 style={{marginLeft: "auto", marginRight: "auto"}}>Нема огласи...</h2>
				</div>
			);
		}

		return (
			<Container className="mt-3">
				<Form className="row" onSubmit={this.handleSubmit}>
					<Col>
						<div className="city-info">
							<Row xs="1" sm="1" md="1" lg="2">
								<div className="col-lg-5 text">
									{this.props.cityFrom} <FontAwesomeIcon icon={faArrowRight}/> {this.props.cityTo}
								</div>
								<div className="col-lg-7 form">
									<div className="row">
										<div className="col-md-5">
											<FormGroup>
												<Input type="select" name="cityFrom" defaultValue={this.props.cityFrom} onChange={this.handleInputChange}>
													{allCitiesOptions}
												</Input>
											</FormGroup>
										</div>
										<div className="col-md-5">
											<FormGroup>
												<Input type="select" name="cityTo" defaultValue={this.props.cityTo} onChange={this.handleInputChange}>
													{allCitiesOptions}
												</Input>
											</FormGroup>
										</div>
										<div className="col-md-2">
											<button type="submit"
															className="btn btn-primary btn-block">
												<FontAwesomeIcon icon={faSearch}/>
											</button>
										</div>
									</div>
								</div>
							</Row>
						</div>
					</Col>
				</Form>

				<LoadingOverlay
					active={this.state.isListLoading}
					spinner
					text='Се вчитува...'
				>
					<div className="trips-content">
						<Nav tabs className="nav-justified cursor-pointer">
							<NavItem>
								<NavLink
									className={classnames({ active: this.state.activeTab === '1' })}
									onClick={() => { toggle('1'); }}
								>
									Огласи од апликацијата
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink
									className={classnames({ active: this.state.activeTab === '2' })}
									onClick={() => { toggle('2'); }}
								>
									Огласи од фејсбук станица
								</NavLink>
							</NavItem>
						</Nav>
						<TabContent activeTab={this.state.activeTab}>
							<TabPane tabId="1">
								{appTripRows}
							</TabPane>
							<TabPane tabId="2">
								{fbTripRows}
							</TabPane>
						</TabContent>
					</div>
				</LoadingOverlay>
			</Container>
		);
	};
}

export default AppTrips;