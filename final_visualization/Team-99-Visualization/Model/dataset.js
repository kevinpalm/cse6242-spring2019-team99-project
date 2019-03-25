import { PromiseManager } from "./promiseManager.js";
import { Topics } from "./topics.js";
import { Dictionary } from "./dictionary.js";

class Dataset {
	constructor(promisedData) {
		this.data = promisedData;
		this.topics = new Topics(promisedData);
		this.dictionary = new Dictionary(promisedData);
	}
}


export { Dataset };