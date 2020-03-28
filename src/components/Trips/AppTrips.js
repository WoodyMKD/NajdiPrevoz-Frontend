import React, {Component} from 'react';
import {Col, Container, Form, FormGroup, Input, Row} from "reactstrap";

import AppTripRow from './Row/AppTripRow'

import './AppTrips.css';
import {faArrowRight, faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {allCities} from "../../utils/constants";

class AppTrips extends Component {

	constructor(props) {
		super(props);
		this.state = {
			cityFrom: this.props.cityFrom,
			cityTo: this.props.cityTo
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
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

		// refresh the first form also
		this.props.onCityChange(this.state.cityFrom, this.state.cityTo, false);

		// get new Trips
	}

	render() {
		let allCitiesOptions;
		allCitiesOptions = allCities.map((city, index) => {
			return (
				<option key={index}>{city}</option>
			);
		});

		let appTripRows;
		if (this.props.appTrips.length !== 0) {
			appTripRows = this.props.appTrips.map((trip, index) => {
				return (
					<AppTripRow appTripId={trip.id} trip={trip} key={index} colClass={"col-md-6 mt-2 col-sm-12"}/>
				);
			});
		} else {
			appTripRows = (
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
				<Row xs="1" sm="1" md="1" lg="2">
					<Col>
						<div className="app-trips-container">
							<div className="trips-header">
								Понуди од апликацијата
							</div>
							<div className="trips-content">
								asdasd
							</div>
						</div>
					</Col>
					<Col>
						<div className="app-trips-container">
							<div className="trips-header">
								Понуди од facebook групата
							</div>
							<Row>
								<Col>
									<div className="trips-content">
										asdasdas
									</div>
								</Col>
							</Row>
						</div>
					</Col>
				</Row>
				{appTripRows}
			</Container>
		);
	};
}

export default AppTrips;