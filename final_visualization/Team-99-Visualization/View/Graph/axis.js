import { Colleague } from "../colleague.js";

class Axis extends Colleague {
	constructor(scale, layout, svg, mediator) {
		super(mediator);
		this.register("axis");
		this.svg = svg;
		this.layout = layout;
		this.scale = scale;
		this.xAxis = d3.axisBottom(scale.currentXScale);
		this.yAxis = d3.axisLeft(scale.currentYScale);
		this.xAxisView = this.createX();
		this.yAxisView = this.createY();
		this.xAxisLabel = this.createXLabel();
		this.yAxisLabel = this.createYLabel();
		this.currentTime = 1;
	}

	requestWeeks() {
		this.currentTime = 0;
		this.xAxis = d3.axisBottom(this.scale.graphXWeek);
		this.yAxis = d3.axisLeft(this.scale.graphYWeek);
		this.xAxisView = this.createX();
		this.yAxisView = this.createY();
	}

	requestFortnights() {
		this.currentTime = 1;
		this.xAxis = d3.axisBottom(this.scale.graphXFortnight);
		this.yAxis = d3.axisLeft(this.scale.graphYFortnight);
		this.xAxisView = this.createX();
		this.yAxisView = this.createY();

	}

	requestMonths() {
		this.currentTime = 2;
		this.xAxis = d3.axisBottom(this.scale.graphXMonth);
		this.yAxis = d3.axisLeft(this.scale.graphYMonth);
		this.xAxisView = this.createX();
		this.yAxisView = this.createY();

	}

	requestQuarters() {
		this.currentTime = 3;
		this.xAxis = d3.axisBottom(this.scale.graphXQuarter);
		this.yAxis = d3.axisLeft(this.scale.graphYQuarter);
		this.xAxisView = this.createX();
		this.yAxisView = this.createY();
	}
	
	createX() {
		this.svg.selectAll(".xAxis").remove();
		let axisElem = this.svg.append('g')
			.attr("transform", "translate(0, " + this.layout.graphHeight + ")")
			.classed("xAxis", true)
			.call(this.xAxis);
		return axisElem;
	}
	
	createY() {
		this.svg.selectAll(".yAxis").remove();
		let axisElem = this.svg.append('g')
			.attr("transform", "translate(0, 0)")
			.classed("yAxis", true)
			.call(this.yAxis);
		return axisElem;
	}

	rescale(transform) {
		this.xAxisView.call(this.xAxis.scale(transform.rescaleX(this.scale.currentXScale)));
		this.yAxisView.call(this.yAxis.scale(transform.rescaleY(this.scale.currentYScale)));
	}

	createXLabel() {
		let xTranslate = this.layout.graphWidth / 2;
		let yTranslate = this.layout.graphHeight + this.layout.padding.bottom;
		let axisLabel = this.svg.append("text")
			.attr("transform", "translate(" + xTranslate + ", " + yTranslate + ")")
			.style("text-anchor", "middle")
			.text("Number of Messages");
		return axisLabel;
	}

	createYLabel() {
		let xTranslate = - (this.layout.canvasWidth - this.layout.graphWidth) / 2.5;
		let yTranslate = this.layout.graphHeight / 2;
		let axisLabel = this.svg.append("text")
			.attr("transform", "rotate(-90)")
			.attr("x", -yTranslate)
			.attr("y", xTranslate)
			.style("text-anchor", "middle")
			.text("Number of Users");
		return axisLabel;
	}

	refresh() {
		switch(this.currentTime) {
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
		}
	}
}

export { Axis };