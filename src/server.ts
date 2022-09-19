/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import {App} from './app';
import 'dotenv/config';

const port = process.env.PORT || 3001;

new App().start(port);
