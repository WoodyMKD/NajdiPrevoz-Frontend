import React, {Component} from 'react';
import {
	Col,
	Container,
	Form,
	FormGroup,
	Nav,
	NavItem,
	NavLink,
	Row,
	TabContent,
	TabPane
} from "reactstrap";

import LoadingOverlay from 'react-loading-overlay';
import ReactPaginate from 'react-paginate';

import AppTripRow from './AppTripRow/AppTripRow'

import './Trips.css';
import {faArrowRight, faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {allCities} from "../../utils/constants";
import classnames from 'classnames';
import AppTripsService from "../../services/appTripService";
import FbTripsService from "../../services/fbTripService";
import FacebookAppTripRow from "./FacebookTripRow/FacebookTripRow";
import FormModal from "../Modals/Forms/FormModal";
import DropdownList from 'react-widgets/lib/DropdownList'
import {store} from "react-notifications-component";
import {notificationError, notificationSuccess} from "../../utils/notifications";

class Trips extends Component {

	constructor(props) {
		super(props);
		this.state = {
			appTrips: [],
			fbTrips: [],
			appTripsPagination: {
				page:0,
				totalPages:0
			},
			fbTripsPagination: {
				page:0,
				totalPages:0
			},
			isListLoading: false,
			cityFrom: this.props.cityFrom,
			cityTo: this.props.cityTo,
			activeTab: '1',
			isModalLoading: false,
			addAppTripModalOpened: false
		};
		this.loadTrips = this.loadTrips.bind(this);
		this.createTrip = this.createTrip.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleDropdownInputChange = this.handleDropdownInputChange.bind(this);
		this.handleAppTripsPageChange = this.handleAppTripsPageChange.bind(this);
		this.handleFbTripsPageChange = this.handleFbTripsPageChange.bind(this);
	}

	componentDidMount() {
		this.loadTrips(this.state.cityFrom, this.state.cityTo);
	}

	toggleAddAppTripModal = () => {
		this.setState(prevState => ({
			addAppTripModalOpened: !prevState.addAppTripModalOpened
		}));
	};

	loadTrips = (cityFrom, cityTo, flag=0, page=0) => {
		//flag: 0 - both; 1 - appTrips; 2 - fbTrips

		this.setState({
			isListLoading: true
		});

		const appTrips = AppTripsService.getTripsByCity(cityFrom, cityTo, page);
		const fbTrips = FbTripsService.getTrips(page);

		if(flag === 0) {
			Promise.all([appTrips, fbTrips]).then((responses) => {
				this.setState({
					isListLoading: false,
					appTrips: responses[0].content,
					fbTrips: responses[1].content,
					fbTripsPagination: {
						page: responses[1].pageable.pageNumber,
						totalPages: responses[1].totalPages
					},
					appTripsPagination: {
						page: responses[0].pageable.pageNumber,
						totalPages: responses[0].totalPages
					}
				});
			}).catch((error) => {
				console.log(error);
				store.addNotification({
					...notificationError,
					message: error.toString()
				});
			});
		} else if(flag === 1) {
			appTrips.then((response) => {
				this.setState({
					isListLoading: false,
					appTrips: response.content,
					appTripsPagination: {
						page: response.pageable.pageNumber,
						totalPages: response.totalPages
					}
				});
			}).catch((error) => {
				store.addNotification({
					...notificationError,
					message: error.toString()
				});
			});
		} else if(flag === 2) {
			fbTrips.then((response) => {
				this.setState({
					isListLoading: false,
					fbTrips: response.content,
					fbTripsPagination: {
						page: response.pageable.pageNumber,
						totalPages: response.totalPages
					}
				});
			}).catch((error) => {
				store.addNotification({
					...notificationError,
					message: error.toString()
				});
			});
		}
	};

	createTrip = (newTrip) => {
		this.setState({
			isModalLoading: true,
			isListLoading: true
		});

		return AppTripsService.createTrip(newTrip).then((response) => {
			this.loadTrips(this.state.cityFrom, this.state.cityTo);
			this.setState((prevState) => {
				return {
					isModalLoading: false,
					addAppTripModalOpened: false
				}
			});

			store.addNotification({
				...notificationSuccess,
				message: "Успешно креирање на нова понуда."
			});
		}).catch((error) => {
			store.addNotification({
				...notificationError,
				message: error.toString()
			});
		});
	};

	handleSubmit(event) {
		event.preventDefault();

		this.props.onCityChange(this.state.cityFrom, this.state.cityTo, false);
		// refresh the home page form also
		if(this.state.cityFrom !== this.state.cityTo) {
			this.loadTrips(this.state.cityFrom, this.state.cityTo);
		}
	}

	handleDropdownInputChange(value, stateName) {
		this.setState({
			[stateName] : value
		});
	}

	handleInputChange(event) {
		const target = event.target;
		const inputName = target.name;
		const inputValue = target.value;

		this.setState({
			[inputName] : inputValue
		});
	}

	handleAppTripsPageChange(page) {
		this.loadTrips(this.props.cityFrom, this.props.cityTo, 1, page.selected);
	}

	handleFbTripsPageChange(page) {
		this.loadTrips(this.props.cityFrom, this.props.cityTo, 2, page.selected);
	}

	render() {
		const toggle = tab => {
			if(this.state.activeTab !== tab) {
				this.setState({
					activeTab : tab
				});
			}
		};

		let appTripRows;
		if (this.state.appTrips.length !== 0) {
			appTripRows = this.state.appTrips.map((trip, index) => {
				return (
					<AppTripRow appTripId={trip.id} trip={trip} key={index}/>
				);
			});

			if(this.state.appTripsPagination.totalPages > 1) {
				appTripRows.push(
					<Col sm="12" key="app-pagination">
						<ReactPaginate previousLabel={"Претходна"}
													 nextLabel={"Следна"}
													 breakLabel={<span className="gap">...</span>}
													 breakClassName={"break-me"}
													 pageCount={this.state.appTripsPagination.totalPages}
													 marginPagesDisplayed={2}
													 pageRangeDisplayed={5}
													 pageClassName={"page-item"}
													 pageLinkClassName={"page-link"}
													 previousClassName={"page-item"}
													 nextClassName={"page-item"}
													 previousLinkClassName={"page-link"}
													 nextLinkClassName={"page-link"}
													 forcePage={this.state.appTripsPagination.page}
													 onPageChange={this.handleAppTripsPageChange}
													 containerClassName={"pagination justify-content-center"}
													 activeClassName={"active"}/>
					</Col>
				);
			}
		} else {
			appTripRows = (
				<h2 style={{marginLeft: "auto", marginRight: "auto"}}>Нема огласи...</h2>
			);
		}

		let fbTripRows;
		if(
			(this.props.cityFrom === "Крива Паланка" && this.props.cityTo === "Скопје") ||
			(this.props.cityTo === "Крива Паланка" && this.props.cityFrom === "Скопје")
		) {
			if (this.state.fbTrips.length !== 0) {
				fbTripRows = this.state.fbTrips.map((trip, index) => {
					return (
						<FacebookAppTripRow appTripId={trip.id} trip={trip} key={index}/>
					);
				});

				if(this.state.fbTripsPagination.totalPages > 1) {
					fbTripRows.push(
						<Col sm="12" key="fb-pagination">
							<ReactPaginate previousLabel={"Претходна"}
														 nextLabel={"Следна"}
														 breakLabel={<span className="gap">...</span>}
														 breakClassName={"break-me"}
														 pageCount={this.state.fbTripsPagination.totalPages}
														 marginPagesDisplayed={2}
														 pageRangeDisplayed={5}
														 pageClassName={"page-item"}
														 pageLinkClassName={"page-link"}
														 previousClassName={"page-item"}
														 nextClassName={"page-item"}
														 previousLinkClassName={"page-link"}
														 nextLinkClassName={"page-link"}
														 forcePage={this.state.fbTripsPagination.page}
														 onPageChange={this.handleFbTripsPageChange}
														 containerClassName={"pagination justify-content-center"}
														 activeClassName={"active"}/>
						</Col>
					);
				}
			} else {
				fbTripRows = (
					<h2 style={{marginLeft: "auto", marginRight: "auto"}}>Нема огласи...</h2>
				);
			}
		} else {
			fbTripRows = (
				<h5 style={{marginLeft: "auto", marginRight: "auto", padding: "15px"}}>
					За оваа релација се уште немаме соодветна фејсбук страница. <br /> <br />
					Поддржани релации: <br />
					Крива Паланка - Скопје
				</h5>
			);
		}

		let ValueInput = ({item}, prefix) => {
			return (
				<span>
    			<strong>{prefix}</strong>{item}
 	 			</span>
			);
		};

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
												<DropdownList
													filter={(item, searchTerm, idx) => {
														return item.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
													}}
													name="cityFrom"
													id="cityFrom"
													data={allCities}
													defaultValue={this.props.cityFrom}
													onChange={value => this.handleDropdownInputChange(value, "cityFrom")}
													valueComponent={item => ValueInput(item, "Од: ")}
												/>
											</FormGroup>
										</div>
										<div className="col-md-5">
											<FormGroup>
												<DropdownList
													filter={(item, searchTerm, idx) => {
														return item.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
													}}
													name="cityTo"
													id="cityTo"
													data={allCities}
													defaultValue={this.props.cityTo}
													onChange={value => this.handleDropdownInputChange(value, "cityTo")}
													valueComponent={item => ValueInput(item, "До: ")}
												/>
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
									Огласи од фејсбук страница
								</NavLink>
							</NavItem>
						</Nav>
						<TabContent activeTab={this.state.activeTab}>
							<TabPane tabId="1">
								<Row>
									<div className="action-buttons">
										<FormModal buttonLabel="Нова понуда" action="CreateAppTrip" cityFrom={this.props.cityFrom} cityTo={this.props.cityTo} createTrip={this.createTrip}
															 isModalLoading={this.state.isModalLoading} toggleFunction={this.toggleAddAppTripModal} modalOpened={this.state.addAppTripModalOpened}/>
									</div>
								</Row>
								<Row>
									{appTripRows}
								</Row>
							</TabPane>
							<TabPane tabId="2">
								<Row>
									{fbTripRows}
								</Row>
							</TabPane>
						</TabContent>
					</div>
				</LoadingOverlay>
			</Container>
		);
	};
}

export default Trips;