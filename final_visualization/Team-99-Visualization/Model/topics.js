class Topics {
		constructor(dataset) {
			this.dataset = dataset;
			this.topicNames = this.dataset.map(function (d) {
				 return d.Chat_Topic; });
			this.topicDictionary = this.dataset.reduce(function(result, d) { 
			if(result["message_id"]) {
				result = {};
			}
				result[d.Chat_Topic] = d.Keywords;
				return result;
			});
		}
		
		getWords(topic) {
			return this.topicMap[topic];
		}
}

export { Topics };