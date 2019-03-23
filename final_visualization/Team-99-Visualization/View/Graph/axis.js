class Axis {
	constructor(scale, layout, svg) {
		this.svg = svg;
		this.layout = layout;
		this.xAxis = d3.axisBottom(scale.graphX);
		this.yAxis = d3.axisLeft(scale.graphY);
		this.xAxisElem = this.createX();
		this.yAxisElem = this.createY();
	}
	
	createX() {
		let axisElem = this.svg.append('g')
			.attr("transform", "translate(0, " + this.layout.height+ ")")
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
}

export { Axis };