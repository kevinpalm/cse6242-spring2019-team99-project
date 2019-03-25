class Topics {
		constructor(dataset) {
			this.dataset = dataset[0];
			this.topicNames = this.dataset.map(function (d) { return d.topic; });
			this.topicMap = this.dataset.reduce(function(result, d) { 
			if(result["message_id"]) {
				result = {};
			}
				result[d.topic] = d.words_in_topic;
				return result;
			});
		}
		
		getWords(topic) {
			return this.topicMap[topic];
		}
}

export { Topics };