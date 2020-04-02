import React from "react";
import {Col, Form, FormGroup, Row} from "reactstrap";

import Featured from "./Featured/Featured";
import Facts from "./Facts/Facts";
import Testimonials from "./Testimonials/Testimonials";

import './Home.css';
import {allCities} from "../../utils/constants";
import DropdownList from 'react-widgets/lib/DropdownList'

class Home extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			cityFrom: this.props.cityFrom,
			cityTo: this.props.cityTo,
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleDropdownInputChange = this.handleDropdownInputChange.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const inputName = target.name;
		const inputValue = target.value;

		this.setState({
			[inputName] : inputValue
		});
	}

	handleDropdownInputChange(value, stateName) {
		this.setState({
			[stateName] : value
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		this.props.onCityChange(this.state.cityFrom, this.state.cityTo, true);
	}

	render() {
		let ValueInput = ({item}, prefix) => {
			return (
				<span>
    			<strong>{prefix}</strong>{item}
 	 			</span>
			);
		};

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
								<Form className="row" onSubmit={this.handleSubmit}>
									<Col>
										<div className="card bg-light card-body ">
											<div className="row">
												<div className="col-md-6">
													<FormGroup>
														<DropdownList
															filter={(item, searchTerm, idx) => {
																return item.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
															}}
															name="cityFrom"
															id="cityFrom"
															data={allCities}
															onChange={value => this.handleDropdownInputChange(value, "cityFrom")}
															defaultValue={this.props.cityFrom}
															valueComponent={item => ValueInput(item, "Од: ")}
														/>
													</FormGroup>
												</div>
												<div className="col-md-6">
													<FormGroup>
														<DropdownList
															filter={(item, searchTerm, idx) => {
																return item.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
															}}
															name="cityTo"
															id="cityTo"
															data={allCities}
															onChange={value => this.handleDropdownInputChange(value, "cityTo")}
															defaultValue={this.props.cityTo}
															valueComponent={item => ValueInput(item, "До: ")}
														/>
													</FormGroup>
												</div>
												<div className="col-md-12">
													<button type="submit"
																	className="btn btn-primary btn-block">Пребарувај
													</button>
												</div>
											</div>
										</div>
									</Col>
								</Form>
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
	}
}

export default Home;