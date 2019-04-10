import { Colleague } from "../colleague.js";

class Axis extends Colleague {
	constructor(scale, layout, svg, mediator) {
		super(mediator);
		this.register("axis");
		this.svg = svg;
		this.layout = layout;
		this.scale = scale;
		this.xAxis = d3.axisBottom(scale.graphXWeek);
		this.yAxis = d3.axisLeft(scale.graphY);
		this.xAxisView = this.createX();
		this.yAxisView = this.createY();
		this.xAxisLabel = this.createXLabel();
		this.yAxisLabel = this.createYLabel();
	}

	requestWeeks() {
		this.xAxis = d3.axisBottom(this.scale.graphXWeek);
		this.xAxisView = this.createX();
		this.yAxisView = this.createY();
	}

	requestFortnights() {
		this.xAxis = d3.axisBottom(this.scale.graphXFortnight);
		this.xAxisView = this.createX();
		this.yAxisView = this.createY();

	}

	requestMonths() {
		this.xAxis = d3.axisBottom(this.scale.graphXMonth);
		this.xAxisView = this.createX();
		this.yAxisView = this.createY();

	}

	requestQuarters() {
		this.xAxis = d3.axisBottom(this.scale.graphXQuarter);
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
		let axisElem = this.svg.append('g')
			.attr("transform", "translate(0, 0)")
			.classed("yAxis", true)
			.call(this.yAxis);
		return axisElem;
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
}

export { Axis };