import React from "react";

import './Featured.css';

const featured = () => {
	return (
		<section className="py-5 featured">
			<div className="container">
				<div className="row mb-3">
					<div className="col-md-12">
						<h2>Популарни понуди</h2>
					</div>
				</div>
				<div className="row soon-overlay-row">
					<div className="soon-overlay">
						<p>НАСКОРО</p>
					</div>
					<div className="col-md-12 text-center ">
						<nav className="nav-justified ">
							<div className="nav nav-tabs " id="nav-tab" role="tablist">
								<span className="nav-item nav-link active" id="pop1-tab" data-toggle="tab"
									 role="tab" aria-controls="pop1" aria-selected="true">Сите</span>
								<span className="nav-item nav-link" id="pop2-tab" data-toggle="tab"
									 role="tab" aria-controls="pop2" aria-selected="false">Од Скопје</span>
								<span className="nav-item nav-link" id="pop3-tab" data-toggle="tab"
									 role="tab" aria-controls="pop3" aria-selected="false">До Скопје</span>

							</div>
						</nav>
						<div className="tab-content" id="nav-tabContent">
							<div className="tab-pane fade show active" id="pop1" role="tabpanel"
									 aria-labelledby="pop1-tab">
								<div className="pt-4"/>
								<div className="container">
									<div className="row">
										<div className="text-center">
											<div className="card-group">
												<span className="col">
													<div className="card">
														<img className="card-img-top"
																 src="https://imgd.aeplcdn.com/310x174/cw/ec/22803/Audi-New-SQ7-Right-Front-Three-Quarter-70082.jpg?wm=0&q=85"
																 alt="Card cap"/>
														<div className="card-body">
															<h4 className="card-title">Понуда 1</h4>
															<p className="card-text">Податоци</p>
														</div>
														<div className="card-footer">
															<button type="button"
																			className="btn btn-primary btn-block">Дознај повеќе
															</button>
														</div>
													</div>
												</span>
												<span className="col">
													<div className="card">
														<img className="card-img-top"
																 src="https://imgd.aeplcdn.com/310x174/cw/ec/34253/Mitsubishi-New-Outlander-Exterior-126541.jpg?wm=0&q=85"
																 alt="Card cap"/>
														<div className="card-body">
															<h4 className="card-title">Понуда 2</h4>
															<p className="card-text">Податоци</p>
														</div>
														<div className="card-footer">
															<button type="button"
                                                                    className="btn btn-primary btn-block">Дознај повеќе
															</button>
														</div>
													</div>
												</span>
												<span className="col">
													<div className="card">
														<img className="card-img-top"
																 src="https://imgd.aeplcdn.com/310x174/cw/ec/26523/Maruti-Suzuki-Ciaz-Facelift-Exterior-87489.jpg?wm=0&q=85"
																 alt="Card cap"/>
														<div className="card-body">
															<h4 className="card-title">Понуда 3</h4>
															<p className="card-text">Податоци</p>
														</div>
														<div className="card-footer">
															<button type="button"
																	className="btn btn-primary btn-block">Дознај повеќе
															</button>
														</div>
													</div>
												</span>
											</div>
										</div>
									</div>
								</div>

							</div>
							<div className="tab-pane fade" id="pop2" role="tabpanel" aria-labelledby="pop2-tab">
								<div className="pt-3"/>
								<p>2. There's another way to do this for layouts that doesn't have to put the navbar
									inside the container, and which doesn't require any CSS or Bootstrap overrides.

									Simply place a div with the Bootstrap container class around the navbar. This
									will center the links inside the navbar
								</p>
							</div>
							<div className="tab-pane fade" id="pop3" role="tabpanel" aria-labelledby="pop3-tab">
								<div className="pt-3"/>
								<p>3. There's another way to do this for layouts that doesn't have to put the navbar
									inside the container, and which doesn't require any CSS or Bootstrap overrides.

									Simply place a div with the Bootstrap container class around the navbar. This
									will center the links inside the navbar
								</p>
							</div>

						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default featured;