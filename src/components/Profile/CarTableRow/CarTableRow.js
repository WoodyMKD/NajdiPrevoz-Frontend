import React from 'react';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
	faPencilAlt,
	faTrashAlt
} from "@fortawesome/free-solid-svg-icons";

import 'moment/locale/mk';
import {soonNotification} from "../../../utils/notifications";

const carTableRow = (props) => {
	return (
		<tr key={props.car.id}>
			<td className="vertical-align-center">{props.car.manufacturer}</td>
			<td className="vertical-align-center">{props.car.model}</td>
			<td className="vertical-align-center">{props.car.color}</td>
			<td className="td-actions text-center">
				<button type="button" className="btn btn-success btn-round btn-just-icon btn-sm" onClick={() => {props.toggleEditCarModal(props.car)}}>
					<FontAwesomeIcon className="material-icons" icon={faPencilAlt}/>
				</button>
				<button type="button" className="btn btn-danger btn-round btn-just-icon btn-sm" onClick={() => props.confirmCarDelete(props.car.id)}>
					<FontAwesomeIcon className="material-icons" icon={faTrashAlt}/>
				</button>
			</td>
		</tr>
	)
};

export default carTableRow;