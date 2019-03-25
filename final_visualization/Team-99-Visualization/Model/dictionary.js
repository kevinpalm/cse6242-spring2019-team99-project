class Dictionary {
	constructor(dataset) {
		this.dataset = dataset;
		this.words = this.dataset.map(function(d) { return d.words_in_topic; });
	}
}

export { Dictionary };