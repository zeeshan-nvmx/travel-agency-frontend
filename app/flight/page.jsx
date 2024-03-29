'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import FlightResultCard from './flightResultCard';
import { citiesArray } from '@/data/cities';
import { randomNumberGenerator } from '@/utility/utility';
import FlightBookingModal from './flightBookingModal';

const Flight = () => {
	const [data, setData] = useState();
	const [showFlightData, setShowFlightData] = useState(false);
	const [showModal, setShowModal] = useState(false);
	function handleChange(event) {
		const { name, value } = event.target;
		setData({ ...data, [name]: value });
	}

	useEffect(() => {
		if (data?.from && data?.to) {
			if (data?.from === data?.to) {
				setShowFlightData(false);
			}
		}
	}, [data]);

	const renderDestinationFrom = () => {
		return (
			<>
				{citiesArray.map((item, i) => {
					return (
						<option key={i} value={item}>
							{item}
						</option>
					);
				})}
			</>
		);
	};

	function searchValidation() {
		if (!data) {
			return false;
		}
		if (data?.from && data?.to && data?.departing && data?.passenger) {
			if (data?.from !== data?.to) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}

	function renderSearchResultForRandomNumberOfTime() {
		const randomCount = randomNumberGenerator(1, 15);
		const renderArray = Array.from({ length: randomCount });
		return (
			<>
				{renderArray.map((_, index) => (
					<div key={index}>
						<FlightResultCard
							from={data?.from}
							to={data?.to}
							passenger={data?.passenger}
							departing={data?.departing}
							returning={data?.returning}
							showModal={setShowModal}
						/>
					</div>
				))}
			</>
		);
	}

	return (
		<>
			{showModal && <FlightBookingModal showModal={setShowModal} />}
			<div className={styles.main}>
				<div className={styles.header}>
					<div className={styles.overlay}></div>
					<br />
					<div className={styles.topContainer}>
						<div className={styles.flightContainer}>
							<div className={styles.top}>
								<div className={styles.left}>
									<div className={styles.inputContainer}>
										<label
											className={styles.inputLabel}
											htmlFor="from"
										>
											Departure
										</label>
										<select
											name="from"
											className={styles.input}
											onChange={handleChange}
											defaultValue={'departure'}
										>
											<option
												disabled
												hidden
												value={'departure'}
											>
												Departure
											</option>
											{renderDestinationFrom()}
										</select>
									</div>
									<div className={styles.inputContainer}>
										<label
											className={styles.inputLabel}
											htmlFor="to"
										>
											Destination
										</label>
										<select
											name="to"
											className={styles.input}
											onChange={handleChange}
											defaultValue={'destination'}
										>
											<option
												disabled
												hidden
												value={'destination'}
											>
												Destination
											</option>
											{renderDestinationFrom()}
										</select>
									</div>
									<div className={styles.inputContainer}>
										<label
											className={styles.inputLabel}
											htmlFor="departing"
										>
											Departing Date
										</label>
										<input
											className={styles.input}
											type="date"
											name="departing"
											onChange={handleChange}
										/>
									</div>
									<div className={styles.inputContainer}>
										<label
											className={styles.inputLabel}
											htmlFor="departing"
										>
											Returning Date
										</label>
										<input
											className={styles.input}
											type="date"
											name="returning"
											onChange={handleChange}
										/>
									</div>

									<div className={styles.inputContainer}>
										<label
											className={styles.inputLabel}
											htmlFor="passenger"
										>
											Passengers
										</label>
										<select
											name="passenger"
											className={styles.input}
											onChange={handleChange}
											defaultValue={'passenger'}
										>
											<option
												disabled
												hidden
												value={'passenger'}
											>
												Passenger
											</option>
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="3">3</option>
											<option value="4">4</option>
											<option value="5">5</option>
										</select>
									</div>
								</div>

								<div className={styles.right}>
									<p
										className={styles.button}
										onClick={() =>
											searchValidation()
												? setShowFlightData(true)
												: alert(
														'Please fill all the fields'
												  )
										}
									>
										Search
									</p>
								</div>
							</div>

						</div>
					</div>

					<div
						className={styles.container}
						style={!showFlightData ? { display: 'none' } : {}}
					>
						{renderSearchResultForRandomNumberOfTime()}
					</div>
				</div>
			</div>
		</>
	);
};

export default Flight;
