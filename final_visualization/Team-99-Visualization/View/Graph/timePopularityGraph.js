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
		this.requestFortnights();
	}

	requestWeeks() {
		this.maxUG = this.dataset.stats.maxWeekUG;
		this.maxMG = this.dataset.stats.maxWeekMG;
		this.draw(this.dataset.data.weekData, this.scale.graphXWeek)
	}

	requestFortnights() {
		this.maxUG = this.dataset.stats.maxFortnightUG;
		this.maxMG = this.dataset.stats.maxFortnightMG;
		this.draw(this.dataset.data.fortnightData, this.scale.graphXFortnight);
	}

	requestMonths() {
		this.maxUG = this.dataset.stats.maxMonthUG;
		this.maxMG = this.dataset.stats.maxMonthMG;
		this.draw(this.dataset.data.monthData, this.scale.graphXMonth);
	}

	requestQuarters() {
		this.maxUG = this.dataset.stats.maxQuarterUG;
		this.maxMG = this.dataset.stats.maxQuarterMG;
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
			this.svg.selectAll(".dataPoint")
			.data(data)
			.enter()
			.append("g")
			.attr("transform", function(d) { 
				return "translate(" + scaleX(d["messages_" + i.toString() + "_cm"]) + "," + scaleY(d["users_" + i.toString() + "_cm"]) + ")";
			})
			.append("ellipse")
			.attr("rx", function(d) {
				let w = d["messages_" + i.toString()];
				return 20 * (w / maxMG);
			})
			.attr("ry", function(d) {
				let h =  d["users_" + i.toString()];
				return 20 * (h / maxUG);
			})
			.attr("fill", function() { 
				let r = (i % 5) * 50;
				let g = ((i + 1) % 5) * 50;
				let b = ((i + 3) % 5) * 50;
				return "rgb(" + r + ", " + g + ", " + b + ")";
			})
			.attr("fill-opacity", "0.6")
			.on("mouseover", onMouseOver)
			.on("mouseout", onMouseOut)
			.on("click", requestTopicFunc);
		}
	}
}

function onMouseOver(d, i) {
	d3.select(this).attr("stroke", "black").attr("stroke-width", "2px");
}

function onMouseOut(d, i) {
	d3.select(this).attr("stroke", "black").attr("stroke-width", "0px");
}

class TopicRequest {
	constructor(i, mediator) {
		this.topic = i;
		this.mediator = mediator;
	}

	requestTopicDetail() {
		this.mediator.requestAction("topTopics", "setTopic", this.topic)
	}
}

export { PopularityGraph };