import type {Pool, RowDataPacket} from 'mysql2/promise';

type Itracking = {
	getTracking: () => Promise<any>;
	searchTracking: (awb: number) => Promise<void>;
};

export default class Tracking implements Itracking {
	_connection: Pool;

	constructor(connection: Pool) {
		this._connection = connection;
	}

	getTracking = async (): Promise<any> => {
		const [result] = await this._connection.execute<RowDataPacket[]>(
			'SELECT * FROM trackingiDATA.tracking',
		);
		return result;
	};

	searchTracking = async ({
		awb,
		origin,
		destination,
		flight_no,
		etd,
		eta,
		actual_p,
		actual_k,
		consultation_date,
		last_update,
	}: any): Promise<void> => {
		await this._connection.execute<RowDataPacket[]>(
			`
      INSERT INTO trackingiDATA.tracking (
        awb,
        origin,
        destination,
        flight_no,
        etd,
        eta,
        actual_p,
        actual_k,
        consultation_date,
				last_update
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			[
				awb,
				origin,
				destination,
				flight_no,
				etd,
				eta,
				actual_p,
				actual_k,
				consultation_date,
				last_update,
			],
		);
	};
}
