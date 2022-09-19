import * as express from 'express';
import TrackingRoute from './Tracking';

export default class {
	private readonly _router: express.Router;
	private readonly _trackingRouter: TrackingRoute;

	constructor() {
		// eslint-disable-next-line new-cap
		this._router = express.Router();
		this._trackingRouter = new TrackingRoute();
		this.init();
	}

	get router(): express.Router {
		return this._router;
	}

	private init() {
		this._router.use('/search', this._trackingRouter.route);
	}
}
