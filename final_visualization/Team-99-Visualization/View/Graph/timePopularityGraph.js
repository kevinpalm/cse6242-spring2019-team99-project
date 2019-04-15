import { Colleague } from "../colleague.js";

// TODO: There's a glitch with the forward-backward and play functionality: if the user clicks back or forward during play animation
// it will mess up the current timestep tracking.

// TODO: Implement a custom tooltip class and call in the data.enter().on("click") in the draw method.

// TODO: Incorporate scaling with the animation.  The axes should scale at each time step, so that all the preceding bubbles shrink
// and the newest bubble appears in the top right corner.



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
		this.currentStep = 0;
		this.minOpacity = 0.15;
		this.maxOpacity = 1.0;
		this.opacityRange = this.maxOpacity - this.minOpacity;
		this.currentMode = "draw";
		this.currentStep = data.data.fortnightData.length - 1;
		this.currentData = 0;
		//this.tips = this.initTips();
		this.requestFortnights();
	}

	// initTips(topicNum) {
	// 	let mediator = this.mediator;
	// 	let tipMap = {};
	// 	for(let j = 0; j < this.dataset.topics.topicNames.length; j++) {
	// 		let topic = j;
	// 		let tip = d3.tip().attr('class', 'd3-tip').html(function (d) { 
	// 			let id = d.id;
	// 			let result = "";
	// 			let date = ["Date", id.toString()];
	// 			let messages = ["Messages", d["messages_" + topic]];
	// 			let users = ["Users", d["users_" + topic]];
	// 			result += "<div class=\"tipContainer\">";
	// 			result += wrapDivs(date, messages, users);
	// 			result += "</div>";
	// 			console.log(result)
	// 			return result;
	// 		});
	// 		tipMap[j] = tip;
	// 	}
	// 	return tipMap;
	// }

	getTip(i) {
		return this.tips[i];
	}

	setScalingFactor(val) {
		this.scalingFactorScalingFactor = val;
	}

	requestWeeks(mode="draw") {
		this.maxUG = this.dataset.stats.maxWeekUG;
		this.maxMG = this.dataset.stats.maxWeekMG;
		this.bubbleScalingFactor = 25;
		this.activeGraph = 0;
		this.draw(this.dataset.data.weekData, mode)
	}

	requestFortnights(mode="draw") {
		this.maxUG = this.dataset.stats.maxFortnightUG;
		this.maxMG = this.dataset.stats.maxFortnightMG;
		this.bubbleScalingFactor = 30;
		this.activeGraph = 1;
		this.draw(this.dataset.data.fortnightData, mode);
	}

	requestMonths(mode="draw") {
		this.maxUG = this.dataset.stats.maxMonthUG;
		this.maxMG = this.dataset.stats.maxMonthMG;
		this.bubbleScalingFactor = 40;
		this.activeGraph = 2;
		this.draw(this.dataset.data.monthData, mode);
	}

	requestQuarters(mode="draw") {
		this.maxUG = this.dataset.stats.maxQuarterUG;
		this.maxMG = this.dataset.stats.maxQuarterMG;
		this.bubbleScalingFactor = 60;
		this.activeGraph = 3;
		this.draw(this.dataset.data.quarterData, mode);
	}

	refresh(mode="draw") {
		switch(this.activeGraph) {
			case 0:
				this.requestWeeks(mode);
				break;
			case 1:
				this.requestFortnights(mode);
				break;
			case 2:
				this.requestMonths(mode);
				break;
			case 3:
				this.requestQuarters(mode);
				break;
			default:
				this.requestFortnights(mode);
		}
	}

	requestFunc(i) {
		let topicRequest = new TopicRequest(i, this.mediator);
		let requestFunc = topicRequest.requestTopicDetail
		requestFunc = requestFunc.bind(topicRequest);
		return requestFunc;
	}

	setCurrentStep(step) {
		let bundle = this.mediator.requestAction("dataset", "getBundle");
		if(step >= 0 && step < bundle.data.length) {
			this.currentStep = step;
		}
	}

	recomputeCurrentStep() {
      	let prevData = this.currentData;
      	let ratio = this.currentStep / prevData.length;
      	let bundle = this.mediator.requestAction("dataset", "getBundle");
		this.currentStep = Math.round(bundle.data.length * ratio);
	}

	interrupt() {
		d3.selectAll(".bubble").interrupt();
	}

	draw(data, mode) {
		if(mode == "play" && this.currentStep == data.length - 1) {
			this.currentStep = 0;
		}
		this.currentData = data;
		this.currentStep = (mode == "stepForward" && this.currentStep < (data.length - 1)) ? this.currentStep + 1 : this.currentStep;
		this.currentStep = (mode == "stepBackward" && this.currentStep > 0) ? this.currentStep - 1 : this.currentStep;
		let offset = (mode == "stepBackward") ? 1 : 0;
		data = mode != "play" ? data.slice(0, this.currentStep + offset) : data;
		let scaleX = this.scale.currentXScale;
		let scaleY = this.scale.currentYScale;
		let maxMG = this.maxMG;
		let maxUG = this.maxUG;
		this.svg.selectAll("g").remove();
		let activeTopics = this.dataset.topics.activeTopics;
		let duration = mode == "play" ? 1000 : 1500;
		let t = d3.transition().duration(duration);
		let currentStep = this.currentStep;
		for(let i = 0; i < 15; i++){
			//let tip = this.tips[i];
			if(activeTopics.includes(i)) {
				let requestTopicFunc = this.requestFunc(i);
				let mediator = this.mediator;
				this.currentTopic = i;
				let bubbleName = this.bubbleName;
				let bubbleScalingFactor = this.bubbleScalingFactor * this.scalingFactorScalingFactor;
				let opacityRange = this.opacityRange;
				let minOpacity = this.minOpacity;
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
					.attr("rx", function(d, j) {
						if((mode == "play" && j > currentStep)|| (mode == "stepForward" && j == data.length - 1)) {
							return 0.001;
						}
						let w = d["messages_" + i.toString()];
						return bubbleScalingFactor * (w / maxMG);
					})
					.attr("ry", function(d, j) {
						if((mode == "play" && j > currentStep) || (mode == "stepForward" && j == data.length - 1)) {
							return 0.001;
						}
						let h =  d["users_" + i.toString()];
						return bubbleScalingFactor * (h / maxUG);
					})
					.attr("fill", function(d, j) { 
						let hsl = mediator.requestAction("colors", "getColor", i);
						let opacity = minOpacity + ((j + 1) / data.length) * opacityRange;
						opacity = opacity * opacity;
						hsl = hsl.slice(0, hsl.length - 1) + ", " + opacity + ")";
						return hsl;
					})
					.on("mouseover", function(d) {
						//tip.show(d);
						let topic = "Topic: " + i;
						let date = "Date: " + d.id.split(" ")[0];
						let messages = "Messages: " + d["messages_" + i];
						let users = "Users: " + d["users_" + i];
						let msgAvg = "Avg. Msgs/User: " + Math.round((parseFloat(d["messages_" + i]) / parseFloat(d["users_" + i])));
						let text = [topic, date, users, messages, msgAvg]; 
						mediator.requestAction("infoBanner", "displayMany", text);
						d3.select(this).attr("stroke", "black").attr("stroke-width", "2px");
						if(d3.select(this).attr("class").includes(bubbleName(d))) {
							mediator.requestAction("detailGraph", "onMouseOver", d.id);
						}
					})
					.on("mouseout", function(d) {
						d3.select(this).attr("stroke", "black").attr("stroke-width", "0px");
						mediator.requestAction("detailGraph", "onMouseOut", d.id);
						mediator.requestAction("infoBanner", "displayDefault")
					})
					.on("click", requestTopicFunc);
				if(mode == "play" || mode == "stepForward" || mode == "stepBackward") {
					this.bubblesRef = bubbles
					.data(data)
					.transition(t)
					.delay(function(d, j) { 
						return mode.includes("step") || (j < currentStep && mode == "play")
						? 0 : (j - currentStep) * 200;
					})
					.attr("rx", function(d, j) {
						if(mode == "stepBackward" && j == data.length - 1) {
							return 0.001;
						}
						let w = d["messages_" + i.toString()];
						return bubbleScalingFactor * (w / maxMG);
					})
					.attr("ry", function(d, j) {
						if(mode == "stepBackward" && j == data.length - 1) {
							return 0.001;
						}
						let h =  d["users_" + i.toString()];
						return bubbleScalingFactor * (h / maxUG);
					});
				}
				if(mode == "play") {
					this.currentStep = data.length - 1;
				}
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

	reset() {
		this.interrupt();
		this.currentStep = this.mediator.requestAction("timeScale", "getTimeStep");
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
		this.mediator.requestAction("dataset", "setTopic", this.topic);
	}
}

export { PopularityGraph };