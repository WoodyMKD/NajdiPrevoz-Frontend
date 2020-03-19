import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {faBriefcase, faCamera, faCoffee, faSmile} from "@fortawesome/free-solid-svg-icons";

import './Facts.css';

const facts = () => {
	return (
		<div id="projectFacts" className="sectionClass">
			<div className="fullWidth eight columns">
				<div className="projectFactsWrap ">
					<div className="item wow fadeInUpBig animated animated" data-number="12"
							 style={{visibility: "visible"}}>
						<FontAwesomeIcon icon={faBriefcase}/>
						<p id="number1" className="number">12</p>
						<p>Projects done</p>
					</div>
					<div className="item wow fadeInUpBig animated animated" data-number="55"
							 style={{visibility: "visible"}}>
						<FontAwesomeIcon icon={faSmile}/>
						<p id="number2" className="number">55</p>
						<p>Happy clients</p>
					</div>
					<div className="item wow fadeInUpBig animated animated" data-number="359"
							 style={{visibility: "visible"}}>
						<FontAwesomeIcon icon={faCoffee}/>
						<p id="number3" className="number">359</p>
						<p>Cups of coffee</p>
					</div>
					<div className="item wow fadeInUpBig animated animated" data-number="246"
							 style={{visibility: "visible"}}>
						<FontAwesomeIcon icon={faCamera}/>
						<p id="number4" className="number">246</p>
						<p>Photos taken</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default facts;