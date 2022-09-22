/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/naming-convention */
import puppeteer = require('puppeteer');

export const latamCrawler = async (number: string, prefix: string) => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.setUserAgent(
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
	);
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
		const getStatus = document.querySelectorAll(
			'tbody.stripeTableBlue > tr > [titledata="Description"]',
		);
		const getStatusArray = [...getStatus];
		const getStatusFinal = getStatusArray.map(el => el.innerHTML)[0];
		const getDestination = document.querySelector(
			'#shipment_destination',
		)?.innerHTML;
		const getFlightNo = document.querySelector('.flightNumber')?.innerHTML;
		const getEtd = document.querySelector('[titledata="ETD"]')?.innerHTML;
		const getEta = document.querySelector('[titledata="ETA"]')?.innerHTML;
		const getPieces = document.querySelector('[titledata="Pieces"]')?.innerHTML;
		const getWeight = document.querySelector('[titledata="Weight"]')?.innerHTML;
		const final = {
			origin: getOrigin,
			destination: getDestination,
			flight_no: getFlightNo,
			etd: getEtd?.replace('<br>', ' '),
			eta: getEta?.replace('<br>', ' '),
			actual_p: getPieces,
			actual_k: getWeight,
			last_update: getStatusFinal,
		};
		return final;
	});
	await browser.close();
	return valueFinal;
};

export const unitedCrawler = async (number: string) => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
	await page.goto(`https://www.unitedcargo.com/en/us/track/awb/016-${number}`, {
		waitUntil: 'networkidle2',
	});
	try {
		await page.click('.ant-collapse-item.ant-collapse-no-arrow.css-17co2aq');
	} catch (e: unknown) {
		return;
	}

	const valueFinal = await page.evaluate(() => {
		const getOriginDestination = document.querySelectorAll('span.code > a');
		const getOriginDesArray = [...getOriginDestination];
		const originAndDestination = getOriginDesArray.map(a => a.innerHTML);
		const getStatus = document.querySelector('h4.css-1d1auv8')?.innerHTML;
		const getFlightNo = document.querySelectorAll(
			'.ant-col.table-border.ant-col-lg-5 > span.text',
		);
		const getFlightNoArray = [...getFlightNo];
		const flightNoArray = getFlightNoArray.map(span => span.innerHTML)[0];
		const getEtdAndEta = document.querySelectorAll(
			'.ant-col.ant-col-24.table-border.table-title.ant-col-lg-9 > span.subtitle',
		);
		const getEtdAndEtaArray = [...getEtdAndEta];
		const etdAndEta = getEtdAndEtaArray.map(span => span.innerHTML);
		const getPiecesAndWeight = document.querySelectorAll('.css-qjeuzj');
		const getPiecesAndWeightArray = [...getPiecesAndWeight];
		const piecesAndWeight = getPiecesAndWeightArray.map(el => el.innerHTML);
		const final = {
			origin: originAndDestination[0],
			destination: originAndDestination[1],
			flight_no: flightNoArray,
			etd: etdAndEta[etdAndEta.length - 1],
			eta: etdAndEta[0],
			actual_p: piecesAndWeight[1],
			actual_k: piecesAndWeight[2],
			last_update: getStatus,
		};
		return final;
	});
	await browser.close();

	return valueFinal;
};
