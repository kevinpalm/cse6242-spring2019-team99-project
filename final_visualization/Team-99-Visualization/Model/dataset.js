import { Topics } from "./topics.js";
import { Statistics } from "./statistics.js";
import { Colors } from "./colors.js";
import { Colleague } from "../View/colleague.js";

class Dataset extends Colleague {
	constructor(promisedData, mediator) {
		super(mediator);
		this.register("dataset");
		this.data = new Data(promisedData);
		this.topics = new Topics(this.mediator, this.data.topicData);
		this.stats = new Statistics(this.data.statsData);
		this.colors = new Colors(this.topics, this.mediator);
		this.currentTopic = 0;
		this.weekBundle = {
			data: this.data.weekData,
			maxU: this.stats.maxWeekUGCm,
			maxM: this.stats.maxWeekMGCm,
			maxUG: this.stats.maxWeekUG,
			maxMG: this.stats.maxWeekMG,
			timeType: "W",
			timeStep: 4,
			len: this.data.weekData.length,
			start: this.data.weekData[0]["id"],
			end: this.data.weekData[this.data.weekData.length - 1]["id"]
		};
		this.fortnightBundle = {
			data: this.data.fortnightData,
			maxU: this.stats.maxFortnightUGCm,
			maxM: this.stats.maxFortnightMGCm,
			maxUG: this.stats.maxFortnightUG,
			maxMG: this.stats.maxFortnightMG,
			timeType: "W",
			timeStep: 4,
			len: this.data.fortnightData.length,
			start: this.data.fortnightData[0]["id"],
			end: this.data.fortnightData[this.data.fortnightData.length - 1]["id"]
		};
		this.monthBundle = {
			data: this.data.monthData,
			maxU: this.stats.maxMonthUGCm,
			maxM: this.stats.maxMonthMGCm,
			maxUG: this.stats.maxMonthUG,
			maxMG: this.stats.maxMonthMG,
			timeType: "M",
			timeStep: 1,
			len: this.data.monthData.length,
			start: this.data.monthData[0]["id"],
			end: this.data.monthData[this.data.monthData.length - 1]["id"]
		};
		this.quarterBundle = {
			data: this.data.quarterData,
			maxU: this.stats.maxQuarterUGCm,
			maxM: this.stats.maxQuarterMGCm,
			maxUG: this.stats.maxQuarterUG,
			maxMG: this.stats.maxQuarterMG,
			timeType: "M",
			timeStep: 3,
			len: this.data.quarterData.length,
			start: this.data.quarterData[0]["id"],
			end: this.data.quarterData[this.data.quarterData.length - 1]["id"]
		};
		this.bundle = [this.weekBundle, this.fortnightBundle, this.monthBundle, this.quarterBundle];
		this.currentBundle = 1;
	}

	getTopicUsers(topicNum) {
		let bundle = this.getBundle();
		return bundle.data[bundle.data.length - 1]["users_" + topicNum + "_cm"]
	}

	getTopicMessages(topicNum) {
		let bundle = this.getBundle();
		return bundle.data[bundle.data.length - 1]["messages_" + topicNum + "_cm"]
	}

	setBundle(i) {
		this.currentBundle = i;
	}

	getBundle() {
		return this.bundle[this.currentBundle];
	}

	getHelp() {
		return this.data.help["Text"];
	}

	setTopic(topic) {
		this.currentTopic = topic;
	}

	getCurrentTopic() {
		return this.currentTopic;
	}
	
	getMaxUsers(topic) {
		let result =  d3.max(this.bundle[this.currentBundle].data, function(d) {
			return parseFloat(d["users_" + topic]); });
		return result
	}

	getMaxMessages(topic) {
		return d3.max(this.bundle[this.currentBundle].data, function(d) { 
			return parseFloat(d["messages_" + topic]); });
	}
}


class Data {
	constructor(promisedData) {
		this.weekData = promisedData[0];
		this.fortnightData = promisedData[1];
		this.monthData = promisedData[2];
		this.quarterData = promisedData[3];
		this.statsData = promisedData[4];
		this.topicData = promisedData[5];
		this.help = promisedData[6];
	}
}

export { Dataset };