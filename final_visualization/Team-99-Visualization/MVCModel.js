import { Dataset } from "./Model/dataset.js";

class MVCModel {
	constructor(promisedData, mediator) {
		this.mediator = mediator;
		this.dataset = new Dataset(promisedData, this.mediator);
	}
}

export { MVCModel };