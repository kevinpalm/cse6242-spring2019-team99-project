class Dictionary {
	constructor(dataset) {
		this.dataset = dataset;
		this.words = this.dataset.map(function(d) { return d.Keywords; });
	}
}

export { Dictionary };