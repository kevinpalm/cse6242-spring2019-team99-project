import { Topics } from "./topics.js";
import { Dictionary } from "./dictionary.js";
import { Statistics } from "./statistics.js";

class Dataset {
	constructor(promisedData) {
		this.data = new Data(promisedData);
		this.topics = new Topics(this.data.coreData);
		this.dictionary = new Dictionary(this.data.coreData);
		this.stats = new Statistics(this.data.statsData);
	}
}

class Data {
	constructor(promisedData) {
		this.weekData = promisedData[0];
		this.fortnightData = promisedData[1];
		this.monthData = promisedData[2];
		this.quarterData = promisedData[3];
		this.weekDataCm = promisedData[4];
		this.fortnightData = promisedData[5];
		this.monthData = promisedData[6];
		this.quarterData = promisedData[7];
		this.statsData = promisedData[8];
		this.coreData = promisedData[9];
	}
}

export { Dataset };