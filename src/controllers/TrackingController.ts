import type {NextFunction, Request, Response} from 'express';

export default class TrackingController {
	public async searchAwb(_req: Request, res: Response, next: NextFunction): Promise<any> {
		try {
			return res.status(200).json('OK');
		} catch (err: unknown) {
			next(err);
		}
	}
}
