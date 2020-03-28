import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {faQuoteLeft} from "@fortawesome/free-solid-svg-icons";

import './Testimonials.css';

const testimonials = () => {
	return (
		<div className='container testimonial-container mt-5'>
			<div className="header text-muted">Што велат луѓето за нас?</div>
			<div className="row" style={{justifyContent: "center"}}>
				<div className="card col-md-3 col-11">
					<div className="card-content">
						<div className="card-body p-0">
							<div className="profile mb-4 mt-3"><img
								src="img/fic.png" alt="user"/></div>
							<div className="card-subtitle">
								<p><small className="text-muted"> <FontAwesomeIcon icon={faQuoteLeft}/> Конечно
									решение на хаосот од фејсбук групите. Дефинитивно ќе продолжам да ја користам
									оваа апликација. <FontAwesomeIcon icon={faQuoteLeft} flip="horizontal"/> </small></p>
							</div>
							<div className="card-body company"> <small
								className="intro text-muted">Филип Величковски</small></div>
						</div>
					</div>
				</div>
				<div className="card col-md-3 col-11 second">
					<div className="card-content">
						<div className="card-body p-0">
							<div className="profile mb-4 mt-3"><img
								src="img/dame.png" alt="user"/></div>
							<div className="card-subtitle">
								<p><small className="text-muted"> <FontAwesomeIcon icon={faQuoteLeft}/> Идеална апликација
									за оние кои често патуваат и сакаат да ги одбегнат гужвите и
									автобусите. <FontAwesomeIcon icon={faQuoteLeft} flip="horizontal"/> </small>
								</p>
							</div>
							<div className="card-body company"><small
								className="intro text-muted">Дамјан Ангеловски</small></div>
						</div>
					</div>
				</div>
				<div className="card col-md-3 col-11 third">
					<div className="card-content">
						<div className="card-body p-0">
							<div className="profile mb-4 mt-3"><img
								src="img/nexus.png" alt="user"/></div>
							<div className="card-subtitle">
								<p><small className="text-muted"> <FontAwesomeIcon icon={faQuoteLeft}/> Одлична апликација!
									Најдобар и најлесен начин за барање и споделување на
									превоз. <FontAwesomeIcon icon={faQuoteLeft} flip="horizontal"/> </small></p>
							</div>
							<div className="card-body company padding-rem"><small
								className="intro text-muted">Никола Младеновски</small></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default testimonials;