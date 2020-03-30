import React from 'react';

import './FacebookTripRow.css';
import 'moment/locale/mk';
import * as moment from "moment";

const FacebookAppTripRow = (props) => {
	const timePosted = moment.unix(props.trip.postDate).locale("mk").format("Do MMMM, HH:mm");

	return (
		<div className="col-md-4">
			<div className="product product-border">
				<div className="product-header">
					<div className="row">
						<div className="col-12">
							<div className="driver-name">
								<p>
									{props.trip.driverName}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="product-block">
					<div className="row trip-info-fb">
						{props.trip.postContent}
					</div>
				</div>
				<div className="product-footer">
					<div className="row">
						<div className="col-md-12 text-center">
							<p>Објавено на {timePosted} часот</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
};

export default FacebookAppTripRow;