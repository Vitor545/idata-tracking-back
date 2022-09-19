import * as express from 'express';
import TrackingController from '../controllers/TrackingController';

export default class TrackingRoute {
	private readonly _route: express.Router;
	private readonly _trackingController: TrackingController;

	constructor() {
		// eslint-disable-next-line new-cap
		this._route = express.Router();
		this._trackingController = new TrackingController();
		this.init();
	}

	get route(): express.Router {
		return this._route;
	}

	private init() {
		const controller = this._trackingController;
		this._route.post('/', controller.searchAwb.bind(controller));
		this._route.get('/', controller.getTracking.bind(controller));
	}
}
