import React from 'react';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
	faPencilAlt,
	faTrashAlt
} from "@fortawesome/free-solid-svg-icons";

import 'moment/locale/mk';
import {soonNotification} from "../../../utils/notifications";
import Moment from 'react-moment';
import * as moment from "moment";
import {TRIP_STATUS} from "../../../utils/constants";

const tripTableRow = (props) => {
	console.log(props);

    let actionButtons;

    if(props.trip.status === TRIP_STATUS.ACTIVE.toUpperCase()) {
        actionButtons = (
            <span>
				<button type="button" className="btn btn-success btn-round btn-just-icon btn-sm" onClick={soonNotification}>
					<FontAwesomeIcon className="material-icons" icon={faPencilAlt}/>
				</button>
				<button type="button" className="btn btn-danger btn-round btn-just-icon btn-sm" onClick={soonNotification}>
					<FontAwesomeIcon className="material-icons" icon={faTrashAlt}/>
				</button>
			</span>
        );
    } else if(props.trip.status === TRIP_STATUS.FINISHED.toUpperCase()) {
    	actionButtons = (
    		<p>/</p>
		)
    }

	return (
		<tr key={props.trip.id}>
			<td className="vertical-align-center"><Moment locale="mk" date={moment.unix(props.trip.creationDate)} format="Do MMMM, HH:mm" /></td>
			<td className="vertical-align-center"><Moment locale="mk" date={moment.unix(props.trip.startTime)} format="Do MMMM, HH:mm" /></td>
			<td className="vertical-align-center">{props.trip.status}</td>
			<td className="td-actions text-center">
				{actionButtons}
			</td>
		</tr>
	)
};

export default tripTableRow;