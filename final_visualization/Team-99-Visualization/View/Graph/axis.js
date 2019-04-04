class Axis {
	constructor(scale, layout, svg) {
		this.svg = svg;
		this.layout = layout;
		this.xAxis = d3.axisBottom(scale.graphX);
		this.yAxis = d3.axisLeft(scale.graphY);
		this.xAxisView = this.createX();
		this.yAxisView = this.createY();
		this.xAxisLabel = this.createXLabel();
		this.yAxisLabel = this.createYLabel();
	}
	
	createX() {
		let axisElem = this.svg.append('g')
			.attr("transform", "translate(0, " + this.layout.graphHeight + ")")
			.classed("axis", true)
			.call(this.xAxis);
		return axisElem;
	}
	
	createY() {
		let axisElem = this.svg.append('g')
			.attr("transform", "translate(0, 0)")
			.classed("axis", true)
			.call(this.yAxis);
		return axisElem;
	}

	createXLabel() {
		let xTranslate = this.layout.graphWidth / 2;
		let yTranslate = this.layout.graphHeight + this.layout.padding.bottom;
		let axisLabel = this.svg.append("text")
			.attr("transform", "translate(" + xTranslate + ", " + yTranslate + ")")
			.style("text-anchor", "middle")
			.text("Number of messages");
		return axisLabel;
	}

	createYLabel() {
		let xTranslate = - (this.layout.canvasWidth - this.layout.graphWidth) / 4;
		let yTranslate = this.layout.graphHeight / 2;
		let axisLabel = this.svg.append("text")
			.attr("transform", "rotate(-90)")
			.attr("x", -yTranslate)
			.attr("y", xTranslate)
			.style("text-anchor", "middle")
			.text("Number of users");
		return axisLabel;
	}
}

export { Axis };