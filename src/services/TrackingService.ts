/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/naming-convention */
import connection from '../model/connection';
import Tracking from '../model/tracking';
import ErrorHandler from '../helpers/ErrorHandler';
import type TrackingInterface from '../interfaces/TrackingInterface';
import {latamCrawler, unitedCrawler} from '../helpers/Crawler';

export default class TrackingService {
	private readonly _trackingModel = new Tracking(connection);
	async create(prefix: string, number: string) {
		const consultation_date = new Date(Date.now());
		const awb = prefix + number;
		const type_company = prefix === '016' ? 'UNITED' : 'LATAM';
		let valueFinal;

		if (prefix === '016') {
			valueFinal = await unitedCrawler(number);
		} else {
			valueFinal = await latamCrawler(number, prefix);
		}

		if (!valueFinal) {
			throw new ErrorHandler('Dados inválidos, AWB incorreto', 404);
		}

		await this._trackingModel.searchTracking({
			...valueFinal,
			...{awb, consultation_date, type_company},
		});

		return {...valueFinal, ...{awb, consultation_date, type_company}};
	}

	async getTracking() {
		const result = await this._trackingModel.getTracking();

		return result as TrackingInterface[];
	}

	async getTrackingById(id: string) {
		const result = await this._trackingModel.getTrackingById(id);

		return result as TrackingInterface[];
	}
}
