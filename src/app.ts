import * as express from 'express';
import * as cors from 'cors';
import Routes from './routes';
import ErrorMiddleware from './middlewares/ErrorMiddleware';

export class App {
	public app: express.Express;
	private readonly routes: Routes;

	constructor() {
		this.app = express();
		this.routes = new Routes();
		this.config();
	}

	public start(PORT: string | number): void {
		this.app.listen(PORT, () => {
			console.log(`Rodando na porta ${PORT}`);
		});
	}

	private config(): void {
		const accessControl: express.RequestHandler = (_req, res, next) => {
			res.header('Access-Control-Allow-Origin', '*');
			res.header(
				'Access-Control-Allow-Methods',
				'GET,POST,DELETE,OPTIONS,PUT,PATCH',
			);
			res.header('Access-Control-Allow-Headers', '*');
			next();
		};

		const {app} = this;

		app.use(accessControl);
		app.use(express.json());
		app.use(cors());
		app.use(this.routes.router);
		app.use(ErrorMiddleware);
	}
}

export const {app} = new App();
