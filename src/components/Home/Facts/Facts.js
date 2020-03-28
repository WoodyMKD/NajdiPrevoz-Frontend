import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {
	faCar,
	faCarSide,
	faGraduationCap,
	faUsers
} from "@fortawesome/free-solid-svg-icons";

import './Facts.css';

const facts = () => {
	return (
		<div id="projectFacts" className="sectionClass">
			<div className="fullWidth eight columns">
				<div className="projectFactsWrap ">
					<div className="item wow fadeInUpBig animated animated" data-number="12"
							 style={{visibility: "visible"}}>
						<FontAwesomeIcon icon={faUsers}/>
						<p id="number1" className="number">12</p>
						<p>Корисници</p>
					</div>
					<div className="item wow fadeInUpBig animated animated" data-number="55"
							 style={{visibility: "visible"}}>
						<FontAwesomeIcon icon={faCar}/>
						<p id="number2" className="number">359</p>
						<p>Вкупно понуди</p>
					</div>
					<div className="item wow fadeInUpBig animated animated" data-number="359"
							 style={{visibility: "visible"}}>
						<FontAwesomeIcon icon={faCarSide}/>
						<p id="number3" className="number">55</p>
						<p>Активни понуди</p>
					</div>
					<div className="item wow fadeInUpBig animated animated" data-number="246"
							 style={{visibility: "visible"}}>
						<FontAwesomeIcon icon={faGraduationCap}/>
						<p id="number4" className="number">10</p>
						<p>Оценка ВП</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default facts;