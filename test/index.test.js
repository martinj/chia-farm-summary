'use strict';
const {parseOutput} = require('../');
const expect = require('expect');

describe('chia-farm-summary', () => {

	it('parses output from non running farm', () => {
		const data = parseOutput(`
			Connection error. Check if wallet is running at 9256
			Connection error. Check if harvester is running at 8560
			Connection error. Check if full node is running at 8555
			Connection error. Check if farmer is running at 8559
			Farming status: Not available\r\n
			Total chia farmed: Unknown
			User transaction fees: Unknown
			Block rewards: Unknown
			Last height farmed: Unknown
			Plot count: Unknown
			Total size of plots: Unknown
			Estimated network space: Unknown
			Expected time to win: Unknown
			Note: log into your key using 'chia wallet show' to see rewards for each key
		`);

		expect(data).toEqual({
			farmingStatus: 'Not available',
			totalChiaFarmed: 'Unknown',
			userTransactionFees: 'Unknown',
			blockRewards: 'Unknown',
			lastHeightFarmed: 'Unknown',
			plotCount: 'Unknown',
			totalSizePlots: 'Unknown',
			estimatedNetworkSpace: 'Unknown',
			expectedTimeToWin: 'Unknown'
		});
	});

	it('parses output from running farm', () => {
		const data = parseOutput(`
			Farming status: Farming
			Total chia farmed: 100.0
			User transaction fees: 0.0
			Block rewards: 2.0
			Last height farmed: 123
			Plot count: 228
			Total size of plots: 2.71 TiB
			Estimated network space: 208.778 PiB
			Expected time to win: 1 months and 3 weeks
			Note: log into your key using 'chia wallet show' to see rewards for each key
		`);

		expect(data).toEqual({
			farmingStatus: 'Farming',
			totalChiaFarmed: 100,
			userTransactionFees: 0,
			blockRewards: 2,
			lastHeightFarmed: 123,
			plotCount: 228,
			totalSizePlots: 2.71,
			totalSizePlotsUnit: 'TiB',
			estimatedNetworkSpace: 208.778,
			estimatedNetworkSpaceUnit: 'PiB',
			expectedTimeToWin: '1 months and 3 weeks'
		});
	});
});
