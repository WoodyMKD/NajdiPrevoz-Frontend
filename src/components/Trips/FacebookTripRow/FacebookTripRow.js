import React from 'react';

import './FacebookTripRow.css';
import {Row} from "reactstrap";

const FacebookAppTripRow = (props) => {
	return (
		<Row>
			<div className="col-md-4">
				<div className="product product-border">
					<div className="product-header">
						<div className="row">
							<div className="col-12">
								<div className="driver-name">
									<p>Име Именковски</p>
								</div>
							</div>
						</div>
					</div>
					<div className="product-block">
						<div className="row trip-info-fb">
							asdasdasdasdsadsadas
						</div>
					</div>
					<div className="product-footer">
						<div className="row">
							<div className="col-md-12 text-center">
								<p>Објавено на asd часот</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Row>
	)
};

export default FacebookAppTripRow;