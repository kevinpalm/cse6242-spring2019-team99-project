import { Colleague } from "../View/colleague.js";

class Topics extends Colleague {
		constructor(mediator, dataset) {
			super(mediator);
			this.register("topics");
			this.dataset = dataset;
			this.topicNames = new Set(this.dataset.map(function (d) {
				 return d.Chat_Topic; }));
			this.topicNames.delete(undefined);
			this.topicNames.delete("");
			this.topicNames = Array.from(this.topicNames);
			console.log(this.topicNames);
			this.activeTopics = this.initTopics();
			this.inactiveTopics = [];
			this.topicDictionary = this.dataset;
		}
		
		getWords(topic) {
			topic = topic;
			return this.topicDictionary[topic]["Keywords"];
		}

		initTopics() {
			let topics = [];
			console.log(this.topicNames[0]);
			for(let i = 0; i < this.topicNames.length; i++) {
				topics.push(parseFloat(this.topicNames[i]));
			}
			return topics;
		}

		activateTopic(topic) {
			if(!this.activeTopics.includes(topic)) {
				this.activeTopics.push(topic);
				for(let i = 0; i < this.inactiveTopics.length; i++) {
					if(this.inactiveTopics[i] === topic) {
						this.inactiveTopics.splice(i, 1);
					}
				}
			}
		}

		deactivateTopic(topic) {
			if(!this.inactiveTopics.includes(topic)) {
				this.inactiveTopics.push(topic);
				for(let i = 0; i < this.activeTopics.length; i++) {
					if(this.activeTopics[i] == topic) {
						this.activeTopics.splice(i, 1);
					}
				}
			}
		}

		getActiveTopics() {
			return this.activeTopics;
		}
}

export { Topics };