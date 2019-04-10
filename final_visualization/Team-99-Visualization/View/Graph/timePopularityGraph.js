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
		this.scalingFactorScalingFactor = 1.0;
		this.activeGraph = 1;
		this.requestFortnights();
	}

	setScalingFactor(val) {
		this.scalingFactorScalingFactor = val;
	}

	requestWeeks() {
		this.maxUG = this.dataset.stats.maxWeekUG;
		this.maxMG = this.dataset.stats.maxWeekMG;
		this.bubbleScalingFactor = 25;
		this.activeGraph = 0;
		this.draw(this.dataset.data.weekData)
	}

	requestFortnights() {
		this.maxUG = this.dataset.stats.maxFortnightUG;
		this.maxMG = this.dataset.stats.maxFortnightMG;
		this.bubbleScalingFactor = 30;
		this.activeGraph = 1;
		this.draw(this.dataset.data.fortnightData);
	}

	requestMonths() {
		this.maxUG = this.dataset.stats.maxMonthUG;
		this.maxMG = this.dataset.stats.maxMonthMG;
		this.bubbleScalingFactor = 40;
		this.activeGraph = 2;
		this.draw(this.dataset.data.monthData);
	}

	requestQuarters() {
		this.maxUG = this.dataset.stats.maxQuarterUG;
		this.maxMG = this.dataset.stats.maxQuarterMG;
		this.bubbleScalingFactor = 60;
		this.activeGraph = 3;
		this.draw(this.dataset.data.quarterData);
	}

	refresh() {
		switch(this.activeGraph) {
			case 0:
				this.requestWeeks();
				break;
			case 1:
				this.requestFortnights();
				break;
			case 2:
				this.requestMonths();
				break;
			case 3:
				this.requestMonths();
				break;
			default:
				this.requestFortnights();
		}
	}

	requestFunc(i) {
		let topicRequest = new TopicRequest(i, this.mediator);
		let requestFunc = topicRequest.requestTopicDetail
		requestFunc = requestFunc.bind(topicRequest);
		return requestFunc;
	}

	draw(data) {
		let scaleX = this.scale.currentXScale;
		let scaleY = this.scale.currentYScale;
		let maxMG = this.maxMG;
		let maxUG = this.maxUG;
		this.svg.selectAll("g").remove();
		let activeTopics = this.dataset.topics.activeTopics;
		for(let i = 0; i < 15; i++){
			if(activeTopics.includes(i)) {
				let requestTopicFunc = this.requestFunc(i);
				let mediator = this.mediator;
				this.currentTopic = i;
				let bubbleName = this.bubbleName;
				let bubbleScalingFactor = this.bubbleScalingFactor * this.scalingFactorScalingFactor;
				bubbleName = bubbleName.bind(this);
				let bubbles = this.svg.selectAll(".dataPoint")
				.data(data)
				.enter()
				.append("g")
				.attr("transform", function(d) { 
					return "translate(" + scaleX(d["messages_" + i.toString() + "_cm"]) + "," + scaleY(d["users_" + i.toString() + "_cm"]) + ")";
				})
				.append("ellipse")
				.attr("class", function(d) {
					return "bubble_" + d.id.split(" ")[0] + "_topic_" + i + " dataPoint_" + i + " bubble";
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
					if(d3.select(this).attr("class").includes(bubbleName(d))) {
						mediator.requestAction("detailGraph", "onMouseOver", d.id);
					}
				})
				.on("mouseout", function(d) {
					d3.select(this).attr("stroke", "black").attr("stroke-width", "0px");
					mediator.requestAction("detailGraph", "onMouseOut", d.id);
				})
				.on("click", requestTopicFunc);
			}
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