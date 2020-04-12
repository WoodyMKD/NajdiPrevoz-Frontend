import React, {Component} from 'react';

import './Profile.css';
import {Col, Container, Row, Table} from "reactstrap";
import AuthService from "../../services/authService";
import LoadingOverlay from "react-loading-overlay";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCarSide, faPencilAlt, faPhone, faTimes, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import FormModal from "../Modals/Forms/FormModal";
import CarTableRow from "./CarTableRow/CarTableRow";
import AppTripsService from "../../services/appTripService";
import {soonNotification} from "../../utils/notifications";

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cars: [],
			carTableLoading: false,
			phoneNumbers: [],
			phoneNumberListLoading: false,
			isModalLoading: false,
			addCarModalOpened: false,
			editCarModalOpened: false,
			editCarId: null,
			addTelNumberModalOpened: false
		};

		this.loadCars = this.loadCars.bind(this);
		this.loadPhoneNumbers = this.loadPhoneNumbers.bind(this);
		this.editCar = this.editCar.bind(this);
		this.addCar = this.addCar.bind(this);
		this.toggleAddCarModal = this.toggleAddCarModal.bind(this);
		this.toggleEditCarModal = this.toggleEditCarModal.bind(this);
		this.toggleAddTelNumberModal = this.toggleAddTelNumberModal.bind(this);
	}

	componentDidMount() {
		this.loadCars();
		this.loadPhoneNumbers();
	}

	editCar = (car) => {
		this.setState({
			isModalLoading: true,
			carTableLoading: true
		});

		return AuthService.updateUserCar(car).then((response) => {
			this.loadCars();
			this.setState(() => {
				return {
					isModalLoading: false,
					editCarModalOpened: false
				}
			});
		})
	};

	toggleEditCarModal = (carId) => {
		this.setState(prevState => ({
			editCarModalOpened: !prevState.editCarModalOpened,
			editCarId: carId
		}));
	};

	toggleAddCarModal = () => {
		this.setState(prevState => ({
			addCarModalOpened: !prevState.addCarModalOpened
		}));
	};

	toggleAddTelNumberModal = () => {
		this.setState(prevState => ({
			addTelNumberModalOpened: !prevState.addTelNumberModalOpened
		}));
	};

	addCar = (car) => {
		this.setState({
			isModalLoading: true,
			carTableLoading: true
		});

		return AuthService.addUserCar(car).then((response) => {
			this.loadCars();
			this.setState(() => {
				return {
					isModalLoading: false,
					addCarModalOpened: false
				}
			});
		})
	};

	addTelNumber = (telNumber) => {
		this.setState({
			isModalLoading: true,
			phoneNumberListLoading: true
		});

		return AuthService.addUserTelNumber(telNumber).then((response) => {
			this.loadPhoneNumbers();
			this.setState(() => {
				return {
					isModalLoading: false,
					addTelNumberModalOpened: false
				}
			});
		})
	};

	loadCars = () => {
		this.setState({
			carTableLoading: true
		});

		AuthService.getUserCars().then((response) => {
			this.setState({
				cars: response,
				carTableLoading: false
			});
		}).catch((error) => {
			console.log(error);
		});
	};

	loadPhoneNumbers = () => {
		this.setState({
			phoneNumberListLoading: true
		});

		AuthService.getUserTelNumbers().then((response) => {
			this.setState({
				phoneNumbers: response,
				phoneNumberListLoading: false
			});
		}).catch((error) => {
			console.log(error);
		});
	};

	render() {
		const carRows = this.state.cars.map((car) => {
			return (
					<CarTableRow key={car.id} car={car} isModalLoading={this.state.isModalLoading} toggleEditCarModal={this.toggleEditCarModal} editCarModalOpened={this.state.editCarModalOpened} editCar={this.editCar}/>
			);
		});

		const phoneNumbers = this.state.phoneNumbers.map((num) => {
			return (
				<Col md="auto" key={num.number}>
					<div className="number-wrapper">
						<div className="number-text">
							{num.number}
						</div>
						<div className="number-button" onClick={soonNotification}>
							<FontAwesomeIcon icon={faTimes}/>
						</div>
					</div>
				</Col>
			);
		});

		return (
			<Container className="profile-container page-container">
				<div className="profile-section">
					<LoadingOverlay
						active={this.state.carTableLoading}
						spinner
						text='Се вчитува...'
					>
						<div className="profile-section-header">
							<Row>
								<Col xs="auto" className="header-icon pt-2 ml-2">
									<FontAwesomeIcon icon={faCarSide}/>
								</Col>
								<Col className="pt-2">
									Мои возила
								</Col>
								<Col xs="auto">
									<FormModal buttonLabel="Ново возило" action="AddCar" addCar={this.addCar}
														 isModalLoading={this.state.isModalLoading} toggleFunction={this.toggleAddCarModal} modalOpened={this.state.addCarModalOpened}/>
								</Col>
							</Row>
						</div>
						<div className="profile-section-body">
							<Table responsive hover>
								<thead>
								<tr>
									<th>Производител</th>
									<th>Модел</th>
									<th>Боја</th>
									<th className="text-center">Акција</th>
								</tr>
								</thead>
								<tbody>
								{carRows}
								</tbody>
							</Table>
						</div>
					</LoadingOverlay>
				</div>

				<div className="profile-section">
					<LoadingOverlay
						active={this.state.phoneNumberListLoading}
						spinner
						text='Се вчитува...'
					>
						<div className="profile-section-header">
							<Row>
								<Col xs="auto" className="header-icon pt-2 ml-2">
									<FontAwesomeIcon icon={faPhone}/>
								</Col>
								<Col className="pt-2">
									Мои телефонски броеви
								</Col>
								<Col md="auto">
									<FormModal buttonLabel="Нов број" action="AddTelNumber" addTelNumber={this.addTelNumber}
														 isModalLoading={this.state.isModalLoading} toggleFunction={this.toggleAddTelNumberModal} modalOpened={this.state.addTelNumberModalOpened}/>
								</Col>
							</Row>
						</div>
						<div className="profile-section-body p-3">
							<div className="phone-list">
								<Row className="justify-content-md-center">
									{phoneNumbers}
								</Row>
							</div>
						</div>
					</LoadingOverlay>
				</div>

				<FormModal buttonLabel="Измени возило" action="EditCar" car={this.state.editCarId} editCar={this.editCar}
									 isModalLoading={this.state.isModalLoading} toggleFunction={this.toggleEditCarModal} modalOpened={this.state.editCarModalOpened}/>
			</Container>
		);
	}
}

export default Profile;