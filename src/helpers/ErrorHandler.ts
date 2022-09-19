export default class ErrorHandler extends Error {
	readonly type: string;
	constructor(readonly message: string, readonly statusCode: number) {
		super(message);
		this.statusCode = statusCode;
		this.type = 'ErrorHandler';
	}
}
