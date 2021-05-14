'use strict';

const {access} = require('fs/promises');
const {execFile} = require('child_process');

const matchers = [
	[/Farming status: ([^\n]+)/m, 'farmingStatus'],
	[/Total chia farmed: ([^\n]+)/m, 'totalChiaFarmed'],
	[/User transaction fees: ([^\n]+)/m, 'userTransactionFees'],
	[/Block rewards: ([^\n]+)/m, 'blockRewards'],
	[/Last height farmed: ([^\n]+)/m, 'lastHeightFarmed'],
	[/Plot count: ([^\n]+)/m, 'plotCount'],
	[/Total size of plots: ([^\s|\n]+)(\s(\w{3}))?/m, 'totalSizePlots',, 'totalSizePlotsUnit'],
	[/Estimated network space: ([^\s|\n]+)(\s(\w{3}))?/m, 'estimatedNetworkSpace',, 'estimatedNetworkSpaceUnit'],
	[/Expected time to win: ([^\n]+)/m, 'expectedTimeToWin']
];

async function getChiaFarmSummary(chiaExecutable) {
	try {
		await access(chiaExecutable);
	} catch (err) {
		throw new Error(`Unable to access chia executable: ${chiaExecutable}`);
	}

	return new Promise((resolve, reject) => {
		execFile(chiaExecutable, ['farm', 'summary'], (err, stdout) => {
			if (err) {
				return reject(err);
			}

			const output = stdout.toString();
			resolve(parseOutput(output));
		});
	});
}

function parseOutput(output) {
	return matchers.reduce((acc, [regexp, ...keys]) => {
		const match = regexp.exec(output);
		if (match) {
			for (const [idx, key] of keys.entries()) {
				const value = match[idx + 1] ? match[idx + 1].trim() : undefined;
				if (key && value !== undefined) {
					acc[key] = /^\d+(\.\d+)?$/.test(value) ? Number(value) : value;
				}
			}
		}
		return acc;
	}, {});
}

module.exports = getChiaFarmSummary;
module.exports.parseOutput = parseOutput;
