/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-require-imports */
import puppeteer = require('puppeteer');
import connection from '../model/connection';
import Tracking from '../model/tracking';
import ErrorHandler from '../helpers/ErrorHandler';
import type TrackingInterface from '../interfaces/TrackingInterface';

export default class TrackingService {
	private readonly _trackingModel = new Tracking(connection);
	async create(prefix: string, number: string) {
		const consultation_date = new Date(Date.now());
		const awb = prefix + number;
		const browser = await puppeteer.launch({headless: false});
		const page = await browser.newPage();
		await page.goto(
			`https://www.latamcargo.com/en/trackshipment?docNumber=${number}&docPrefix=${prefix}`,
			{
				waitUntil: 'networkidle2',
			},
		);
		const valueFinal = await page.evaluate(() => {
			const isError = document.querySelector('.alert-warning')?.innerHTML;
			const mensageError
        = 'No result found for the given input. Please check your input value correctness and try again.';
			if (isError === mensageError) {
				return;
			}

			const getOrigin = document.querySelector('#shipment_origin')?.innerHTML;
			const getDestination = document.querySelector(
				'#shipment_destination',
			)?.innerHTML;
			const getFlightNo = document.querySelector('.flightNumber')?.innerHTML;
			const getEtd = document.querySelector('[titledata="ETD"]')?.innerHTML;
			const getEta = document.querySelector('[titledata="ETA"]')?.innerHTML;
			const getPieces = document.querySelector(
				'[titledata="Pieces"]',
			)?.innerHTML;
			const getWeight = document.querySelector(
				'[titledata="Weight"]',
			)?.innerHTML;
			const final = {
				origin: getOrigin,
				destination: getDestination,
				flight_no: getFlightNo,
				etd: getEtd,
				eta: getEta,
				actual_p: getPieces,
				actual_k: getWeight,
			};
			return final;
		});
		await browser.close();

		if (!valueFinal) {
			throw new ErrorHandler('Dados inválidos, AWB incorreto', 404);
		}

		await this._trackingModel.searchTracking({
			...valueFinal,
			...{awb, consultation_date},
		});

		return {...valueFinal, ...{awb, consultation_date}};
	}

	async getTracking() {
		const result = await this._trackingModel.getTracking();

		return result as TrackingInterface[];
	}
}
