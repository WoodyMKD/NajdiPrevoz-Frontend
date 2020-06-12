import React, {Component} from 'react';

import './Profile.css';
import {Col, Container, Row, Table} from "reactstrap";
import UserService from "../../services/userService";
import LoadingOverlay from "react-loading-overlay";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCarSide, faPhone, faTimes} from "@fortawesome/free-solid-svg-icons";
import FormModal from "../Modals/Forms/FormModal";
import CarTableRow from "./CarTableRow/CarTableRow";
import {notificationError, notificationSuccess, soonNotification} from "../../utils/notifications";
import {store} from "react-notifications-component";
import { confirmAlert } from 'react-confirm-alert';
import {ACCESS_TOKEN} from "../../utils/constants"; // Import

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
        this.confirmTelNumberDelete = this.confirmTelNumberDelete.bind(this);
        this.deleteTelNumber = this.deleteTelNumber.bind(this);
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

		return UserService.updateUserCar(car).then((response) => {
            if(response.status !== 200 && response.statusCode === undefined || response.statusCode !== 200 && response.statusCode !== undefined) {
                throw new Error(response.status);
            }

			this.loadCars();
			this.setState(() => {
				return {
					isModalLoading: false,
					editCarModalOpened: false
				}
			});

			store.addNotification({
				...notificationSuccess,
				message: "Успешна промена на постоечко возило."
			});
		}).catch((error) => {
			store.addNotification({
				...notificationError,
				message: error.message
			});
		});
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

		return UserService.addUserCar(car).then((response) => {
            if(response.status !== 200 && response.statusCode === undefined || response.statusCode !== 201 && response.statusCode !== undefined) {
                throw new Error(response.status);
            }

			this.loadCars();
			this.setState(() => {
				return {
					isModalLoading: false,
					addCarModalOpened: false
				}
			});

			store.addNotification({
				...notificationSuccess,
				message: "Успешно додавање на ново возило."
			});
		}).catch((error) => {
			store.addNotification({
				...notificationError,
				message: error.message
			});
		});
	};

	addTelNumber = (telNumber) => {
		this.setState({
			isModalLoading: true,
			phoneNumberListLoading: true
		});

		return UserService.addUserTelNumber(telNumber).then((response) => {
			console.log(response);
            if(response.status !== 200 && response.statusCode === undefined || response.statusCode !== 201 && response.statusCode !== undefined) {
                throw new Error(response.status);
            }

			this.loadPhoneNumbers();
			this.setState(() => {
				return {
					isModalLoading: false,
					addTelNumberModalOpened: false
				}
			});

			store.addNotification({
				...notificationSuccess,
				message: "Успешно додавање на нов телефонски број."
			});
		}).catch((error) => {
			store.addNotification({
				...notificationError,
				message: error.message
			});
		});
	};

	loadCars = () => {
		this.setState({
			carTableLoading: true
		});

        UserService.getUserCars().then((response) => {
            if(response.status !== 200 && response.statusCode === undefined || response.statusCode !== 200 && response.statusCode !== undefined) {
                throw new Error(response.status);
            }

        	this.setState({
				cars: response.response,
				carTableLoading: false
			});
		}).catch((error) => {
			store.addNotification({
				...notificationError,
				message: error.message
			});
		});
	};

	loadPhoneNumbers = () => {
		this.setState({
			phoneNumberListLoading: true
		});

        UserService.getUserTelNumbers().then((response) => {
            if(response.status !== 200 && response.statusCode === undefined || response.statusCode !== 200 && response.statusCode !== undefined) {
                throw new Error(response.status);
            }

        	this.setState({
				phoneNumbers: response.response,
				phoneNumberListLoading: false
			});
		}).catch((error) => {
			store.addNotification({
				...notificationError,
				message: error.message
			});
		});
	};

	confirmTelNumberDelete = (number) => {
        confirmAlert({
            title: 'Бришење телефонски број',
            message: 'Дали сте сигурни?',
            buttons: [
                {
                    label: 'Да',
                    onClick: () => {
                    	console.log(number);
                    	this.deleteTelNumber(number)
                    }
                },
                {
                    label: 'Не'
                }
            ]
        });
	};

    deleteTelNumber = (number) => {
        return UserService.deleteUserTelNumber(number).then((response) => {
            if(response.status !== 200 && response.statusCode === undefined || response.statusCode !== 200 && response.statusCode !== undefined) {
                throw new Error(response.status);
            }

        	this.loadPhoneNumbers();

            store.addNotification({
                ...notificationSuccess,
                message: "Успешна го избришавте телефонскиот број."
            });
        }).catch((error) => {
            store.addNotification({
                ...notificationError,
                message: error.message
            });
        });
    };

    confirmCarDelete = (carId) => {
        confirmAlert({
            title: 'Бришење возило',
            message: 'Дали сте сигурни?',
            buttons: [
                {
                    label: 'Да',
                    onClick: () => {
                        console.log(carId);
                        this.deleteCar(carId)
                    }
                },
                {
                    label: 'Не'
                }
            ]
        });
    };

    deleteCar = (id) => {
        return UserService.deleteUserCar(id).then((response) => {
            if(response.status !== 200 && response.statusCode === undefined || response.statusCode !== 200 && response.statusCode !== undefined) {
                throw new Error(response.status);
            }

        	this.loadCars();

            store.addNotification({
                ...notificationSuccess,
                message: "Успешна го избришавте возилото."
            });
        }).catch((error) => {
            store.addNotification({
                ...notificationError,
                message: error.message
            });
        });
    };

	render() {
		const carRows = this.state.cars.map((car) => {
			return (
				<CarTableRow key={car.id} car={car} isModalLoading={this.state.isModalLoading} toggleEditCarModal={this.toggleEditCarModal} editCarModalOpened={this.state.editCarModalOpened} editCar={this.editCar} confirmCarDelete={this.confirmCarDelete}/>
			);
		});

		const phoneNumbers = this.state.phoneNumbers.map((num) => {
			return (
				<Col md="auto" key={num.number}>
					<div className="number-wrapper">
						<div className="number-text">
							{num.number}
						</div>
                        <div className="number-button" onClick={() => this.confirmTelNumberDelete(num.number)}>
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