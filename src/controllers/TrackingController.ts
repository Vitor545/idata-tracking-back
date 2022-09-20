/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import ErrorHandler from '../helpers/ErrorHandler';
import type {NextFunction, Request, Response} from 'express';
import TrackingService from '../services/TrackingService';

export type TypeRequest = {
	prefix: string;
	number: string;
};
export default class TrackingController {
	private readonly _trackingService = new TrackingService();

	public async searchAwb(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<any> {
		try {
			const {prefix, number}: TypeRequest = req.body;
			if (!prefix || !number) {
				throw new ErrorHandler('Preencha todos os campos', 400);
			}

			const createAwb = await this._trackingService.create(prefix, number);

			return res.status(201).json(createAwb);
		} catch (err: unknown) {
			next(err);
		}
	}

	public async getTracking(
		_req: Request,
		res: Response,
		next: NextFunction,
	): Promise<any> {
		try {
			const getTracking = await this._trackingService.getTracking();

			return res.status(200).json(getTracking);
		} catch (err: unknown) {
			next(err);
		}
	}

	public async getTrackingById(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<any> {
		try {
			const {id} = req.params;
			const getTracking = await this._trackingService.getTrackingById(id);

			return res.status(200).json(getTracking);
		} catch (err: unknown) {
			next(err);
		}
	}
}
