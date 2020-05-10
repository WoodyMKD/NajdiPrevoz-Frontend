import React, {Component} from 'react';

import './MyTrips.css';
import {Col, Container, Row, Table} from "reactstrap";
import appTripService from "../../services/appTripService";
import LoadingOverlay from "react-loading-overlay";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCarSide, faPhone, faTimes} from "@fortawesome/free-solid-svg-icons";
import {notificationError} from "../../utils/notifications";
import {store} from "react-notifications-component";
import TripTableRow from "./TripTableRow/TripTableRow";
import {TRIP_STATUS} from "../../utils/constants";

class MyTrips extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userTrips: [],
            tablesLoading: false,
		};

		this.loadTrips = this.loadTrips.bind(this);
	}

	componentDidMount() {
		this.loadTrips();
	}

    loadTrips = () => {
		this.setState({
            tablesLoading: true
		});

		appTripService.getUserTrips(TRIP_STATUS.ALL).then((response) => {
			this.setState({
                userTrips: response.content,
                tablesLoading: false
			});
		}).catch((error) => {
			store.addNotification({
				...notificationError,
				message: error.toString()
			});
		});
	};

	render() {
        const userTrips = this.state.userTrips.map((trip) => {
            return (
                <TripTableRow key={trip.id} trip={trip} />
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
									Мои понуди
								</Col>
							</Row>
						</div>
						<div className="profile-section-body">
							<Table responsive hover>
								<thead>
								<tr>
									<th>Поставена</th>
									<th>Поаѓање</th>
									<th>Статус</th>
									<th className="text-center">Акција</th>
								</tr>
								</thead>
								<tbody>
                                    {userTrips}
								</tbody>
							</Table>
						</div>
					</LoadingOverlay>
				</div>
            </Container>
		);
	}
}

export default MyTrips;