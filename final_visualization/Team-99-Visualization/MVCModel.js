import { Dataset } from "./Model/dataset.js";

class MVCModel {
	constructor(promisedData) {
		this.dataset = new Dataset(promisedData);
	}
}

export { MVCModel };