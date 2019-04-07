class Dictionary {
	constructor(dataset, topicData) {
		this.dataset = dataset;
		this.topicData = topicData;
		this.words = this.dataset.map(function(d) { return d.Keywords; });
		console.log(this.topicData);
	}
}

export { Dictionary };