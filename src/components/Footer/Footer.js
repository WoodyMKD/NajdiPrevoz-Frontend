import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {faFacebookF, faTwitter, faYoutube} from "@fortawesome/free-brands-svg-icons";

import './Footer.css';

const footer = () => {
	return (
		<footer className="footer">
			<div className="container">
				<ul className="social-icon">
					<li><a className="fb-icon" href="http://www.facebook.com" title="facebook" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon
						icon={faFacebookF} size="lg"/></a></li>
					<li><a className="twitter-icon" href="http://www.twitter.com" title="twitter" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon
						icon={faTwitter} size="lg"/></a></li>
					<li><a className="yt-icon" href="http://www.youtube.com" title="youtube" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon
						icon={faYoutube} size="lg"/></a>
					</li>
				</ul>
			</div>
		</footer>
	);
};

export default footer;