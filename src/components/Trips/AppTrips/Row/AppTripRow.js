import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import {faCar, faIndustry, faPaintBrush} from "@fortawesome/free-solid-svg-icons";

import './AppTripRow.css';

const appTripRow = (props) => {
	return (
		<div className="b-goods-group">
			<div className="b-goods b-goods_list row">
				<button className="b-goods__img col-auto">
					<img className="img-scale" src="img/1.jpg" alt="car"/>
					<span className="b-goods__label b-goods__label_blue">NEW</span>
				</button>
				<div className="b-goods__main col">
					<div className="row no-gutters">
						<div className="col-auto">
							<button className="b-goods__title">{props.trip.cityFrom} - {props.trip.cityTo}</button>
						</div>
						<div className="col-auto ml-auto">
							<div className="b-goods__price text-primary"><span className="b-goods__price-title">Цена</span><span
								className="b-goods__price-number">{props.trip.price}ден.</span></div>
						</div>
					</div>
					<div className="row no-gutters b-goods__info">
						Оглас од: {props.trip.driver.name} <br/>
						Слободни места: {props.trip.availableSeats} <br/>
						Број: {props.trip.telNumber.number}
					</div>
					<div className="b-goods-descrip row no-gutters">
						<div className="b-goods-descrip__item col">
							<div className="b-goods-descrip__inner">
								<div className="b-goods-descrip__wrap">
									<FontAwesomeIcon className="ic b-goods-descrip__info" icon={faIndustry}/>
									<div className="b-goods-descrip__full-info"><span
										className="b-goods-descrip__title">Производител</span>
										<span className="b-goods-descrip__text">{props.trip.car.manufacturer}</span>
									</div>
								</div>
							</div>
						</div>
						<div className="b-goods-descrip__item col">
							<div className="b-goods-descrip__inner">
								<div className="b-goods-descrip__wrap">
									<FontAwesomeIcon className="ic b-goods-descrip__info" icon={faCar}/>
									<div className="b-goods-descrip__full-info"><span
										className="b-goods-descrip__title">Модел</span>
										<span className="b-goods-descrip__text">{props.trip.car.model}</span>
									</div>
								</div>
							</div>
						</div>
						<div className="b-goods-descrip__item b-goods-descrip__item_list col">
							<div className="b-goods-descrip__inner">
								<div className="b-goods-descrip__wrap">
									<FontAwesomeIcon className="ic b-goods-descrip__info" icon={faPaintBrush}/>
									<div className="b-goods-descrip__full-info"><span
										className="b-goods-descrip__title">Боја</span>
										<span className="b-goods-descrip__text">{props.trip.car.color}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
};

export default appTripRow;