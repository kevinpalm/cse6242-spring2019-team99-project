import { Colleague } from "../colleague.js";

class PopularityGraph extends Colleague {
	constructor(layout, svg, scale, data, mediator) {
		super(mediator);
		super.register("graph");
		this.svg = svg;
		this.layout = layout;
		this.scale = scale;
		this.dataset = data;
		this.maxUG = 0;
		this.maxWG = 0;
		this.currentTopic = 0;
		this.bubbleScalingFactor = 30;
		this.requestFortnights();
	}

	requestWeeks() {
		this.maxUG = this.dataset.stats.maxWeekUG;
		this.maxMG = this.dataset.stats.maxWeekMG;
		this.bubbleScalingFactor = 25;
		this.draw(this.dataset.data.weekData, this.scale.graphXWeek)
	}

	requestFortnights() {
		this.maxUG = this.dataset.stats.maxFortnightUG;
		this.maxMG = this.dataset.stats.maxFortnightMG;
		this.bubbleScalingFactor = 30;
		this.draw(this.dataset.data.fortnightData, this.scale.graphXFortnight);
	}

	requestMonths() {
		this.maxUG = this.dataset.stats.maxMonthUG;
		this.maxMG = this.dataset.stats.maxMonthMG;
		this.bubbleScalingFactor = 40;
		this.draw(this.dataset.data.monthData, this.scale.graphXMonth);
	}

	requestQuarters() {
		this.maxUG = this.dataset.stats.maxQuarterUG;
		this.maxMG = this.dataset.stats.maxQuarterMG;
		this.bubbleScalingFactor = 60;
		this.draw(this.dataset.data.quarterData, this.scale.graphXQuarter);
	}

	requestFunc(i) {
		let topicRequest = new TopicRequest(i, this.mediator);
		let requestFunc = topicRequest.requestTopicDetail
		requestFunc = requestFunc.bind(topicRequest);
		return requestFunc;
	}

	draw(data, scaleX) {
		let scaleY = this.scale.graphY;
		let maxMG = this.maxMG;
		let maxUG = this.maxUG;
		this.svg.selectAll("g").remove();
		for(let i = 0; i < 15; i++){
			let requestTopicFunc = this.requestFunc(i);
			let mediator = this.mediator;
			this.currentTopic = i;
			let bubbleName = this.bubbleName;
			let bubbleScalingFactor = this.bubbleScalingFactor;
			bubbleName = bubbleName.bind(this);
			this.svg.selectAll(".dataPoint")
			.data(data)
			.enter()
			.append("g")
			.attr("transform", function(d) { 
				return "translate(" + scaleX(d["messages_" + i.toString() + "_cm"]) + "," + scaleY(d["users_" + i.toString() + "_cm"]) + ")";
			})
			.append("ellipse")
			.attr("class", function(d) {
				return "bubble_" + d.id.split(" ")[0] + "_topic_" + i.toString();
			})
			.attr("rx", function(d) {
				let w = d["messages_" + i.toString()];
				return bubbleScalingFactor * (w / maxMG);
			})
			.attr("ry", function(d) {
				let h =  d["users_" + i.toString()];
				return bubbleScalingFactor * (h / maxUG);
			})
			.attr("fill", function() { 
				let hsl = mediator.requestAction("colors", "getColor", i);
				return hsl;
			})
			.attr("fill-opacity", "0.75")
			.on("mouseover", function(d) {
				d3.select(this).attr("stroke", "black").attr("stroke-width", "2px");
				if(bubbleName(d) == d3.select(this).attr("class")) {
					mediator.requestAction("detailGraph", "onMouseOver", d.id);
				}
			})
			.on("mouseout", function(d) {
				d3.select(this).attr("stroke", "black").attr("stroke-width", "0px");
				mediator.requestAction("detailGraph", "onMouseOut", d.id);
			})
			.on("click", requestTopicFunc);
		}
		this.currentTopic = 0;
	}

	setTopic(i) {
		this.currentTopic = i;
	}

	bubbleName(d) {
		return "bubble_" + d.id.split(" ")[0] + "_topic_" + this.currentTopic.toString();
	}
}

class TopicRequest {
	constructor(i, mediator) {
		this.topic = i;
		this.mediator = mediator;
	}

	requestTopicDetail() {
		this.mediator.requestAction("topTopics", "setTopic", this.topic);
		this.mediator.requestAction("detailGraph", "requestTopic", this.topic);
		this.mediator.requestAction("graph", "setTopic", this.topic);
	}
}

export { PopularityGraph };