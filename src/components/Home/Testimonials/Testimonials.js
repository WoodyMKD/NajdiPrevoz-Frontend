import React from "react";
import './Testimonials.css';

const testimonials = () => {
	return (
		<div className='testimonial-container mx-auto mt-5 col-md-10 col-11'>
			<div className="header text-muted"> What people are saying about LXD</div>
			<div className="row" style={{justifyContent: "center"}}>
				<div className="card col-md-3 col-11">
					<div className="card-content">
						<div className="card-body p-0">
							<div className="profile mb-4 mt-3"><img
								src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1574583336/AAA/4.jpg" alt="user"/></div>
							<div className="card-subtitle">
								<p><small className="text-muted"> <i className="fas fa-quote-left"/> I expected
									anything less than perfect for the team of experts. They are the best team
									ever! <i className="fas fa-quote-left fa-flip-horizontal"/> </small></p>
							</div>
							<div className="card-body company"><i className="fab fa-ebay fa-2x"/> <small
								className="intro text-muted">Sam Diago, Marketer</small></div>
						</div>
					</div>
				</div>
				<div className="card col-md-3 col-11 second">
					<div className="card-content">
						<div className="card-body p-0">
							<div className="profile mb-4 mt-3"><img
								src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1574583319/AAA/3.jpg" alt="user"/></div>
							<div className="card-subtitle">
								<p><small className="text-muted"> <i className="fas fa-quote-left "/> I really
									enjoyed working with them, they are Group of Professionals and they know what
									they're Doing <i className="fas fa-quote-left fa-flip-horizontal"/> </small>
								</p>
							</div>
							<div className="card-body company"><i className="fab fa-amazon fa-2x"/><small
								className="intro text-muted">Monty Jones, Software Developer</small></div>
						</div>
					</div>
				</div>
				<div className="card col-md-3 col-11 third">
					<div className="card-content">
						<div className="card-body p-0">
							<div className="profile mb-4 mt-3"><img
								src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1574583246/AAA/2.jpg" alt="user"/></div>
							<div className="card-subtitle">
								<p><small className="text-muted"> <i className="fas fa-quote-left"/> I always
									wanted cool videos of my concerts never knew whom to talk to but they are
									amazing! <i className="fas fa-quote-left fa-flip-horizontal"/> </small></p>
							</div>
							<div className="card-body company"><i className="fab fa-yelp fa-2x"/><small
								className="intro text-muted">John Tim, Tech Support</small></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default testimonials;