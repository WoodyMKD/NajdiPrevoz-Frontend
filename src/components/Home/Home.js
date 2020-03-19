import React from "react";
import {Col, Row} from "reactstrap";

import Featured from "./Featured/Featured";
import Facts from "./Facts/Facts";
import Testimonials from "./Testimonials/Testimonials";

import './Home.css';

const Home = () => {
	return (
		<div>
			<section id="jumbotron" className="bg-blue text-white  pt-5 pb-4">
				<div className="container py-5">
					<Row sm="1" lg="2">
						<Col>
							<Row>
								<Col>
									<h1>Патувај <span className="yellow-text">удобно</span></h1>
									<p>Пронајди ги најдобрите понуди за превоз.</p>
								</Col>
							</Row>
							<Row>
								<Col>
									<div className="card bg-light card-body ">
										<div className="row">
											<div className="col-md-6">
												<div className="form-group">
													<select id="inputState" className="form-control">
														<option selected>Од</option>
														<option>BMW</option>
														<option>Audi</option>
														<option>Maruti</option>
														<option>Tesla</option>
													</select>
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-group">
													<select id="inputState" className="form-control">
														<option selected>До</option>
														<option>BMW</option>
														<option>Audi</option>
														<option>Maruti</option>
														<option>Tesla</option>
													</select>
												</div>
											</div>
											<div className="col-md-12">
												<button type="button"
																className="btn btn-primary btn-block">Пребарувај
												</button>
											</div>
										</div>
									</div>
								</Col>
							</Row>
						</Col>
						<Col className="d-none d-sm-none d-md-none d-lg-block jumbotron-car">
							<img src="http://www.freepngimg.com/download/car/4-2-car-png-hd.png" alt="car"/>
						</Col>
					</Row>
				</div>
			</section>

			<Featured/>
			<Facts/>
			<Testimonials/>
		</div>
	);
};

export default Home;