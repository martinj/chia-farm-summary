# Chia Farm Summary

Parses chia farm summary output

## Install

	npm i chia-farm-summary

## Example

```javascript
const chiaFarmSummary = require('chia-farm-summary');
const output = await chiaFarmSummary('path/to/chia');
/*
Example outputs
{
	farmingStatus: 'Not available',
	totalChiaFarmed: 'Unknown',
	userTransactionFees: 'Unknown',
	blockRewards: 'Unknown',
	lastHeightFarmed: 'Unknown',
	plotCount: 'Unknown',
	totalSizePlots: 'Unknown',
	estimatedNetworkSpace: 'Unknown',
	expectedTimeToWin: 'Unknown'
}
{
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
}
 */
```
