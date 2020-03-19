import React from 'react';

import './Loading.css';

const loading = (props) => {
	return (
		<div id="loader-wrapper">
			<div id="loader"/>
			<div className="loader-section section-left"/>
			<div className="loader-section section-right"/>
		</div>
	);
};

export default loading;