import React from 'react';
import {Container} from "reactstrap";

import AppTripRow from './Row/AppTripRow'

import './AppTrips.css';

const AppTrips = (props) => {
	let appTripRows;
	if (props.appTrips.length !== 0) {
		appTripRows = props.appTrips.map((trip, index) => {
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
		<Container>
			{appTripRows}
		</Container>
	);
};

export default AppTrips;