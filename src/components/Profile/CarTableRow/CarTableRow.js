import React from 'react';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
	faTrashAlt
} from "@fortawesome/free-solid-svg-icons";

import Moment from 'react-moment';
import * as moment from "moment";
import 'moment/locale/mk';
import FormModal from "../../Modals/Forms/FormModal";
import {soonNotification} from "../../../utils/notifications";

const carTableRow = (props) => {
	return (
		<tr key={props.car.id}>
			<td className="vertical-align-center">{props.car.manufacturer}</td>
			<td className="vertical-align-center">{props.car.model}</td>
			<td className="vertical-align-center">{props.car.color}</td>
			<td className="td-actions text-center">
				<FormModal buttonLabel="Измени возило" action="EditCar" car={props.car} editCar={props.editCar}
									 isModalLoading={props.isModalLoading} toggleFunction={props.toggleEditCarModal} modalOpened={props.editCarModalOpened}/>
				<button type="button" className="btn btn-danger btn-round btn-just-icon btn-sm" onClick={soonNotification}>
					<FontAwesomeIcon className="material-icons" icon={faTrashAlt}/>
				</button>
			</td>
		</tr>
	)
};

export default carTableRow;