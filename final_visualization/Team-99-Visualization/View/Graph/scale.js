class Scale {
	constructor(layout) {
		this.layout = layout;
		this.graphX = d3.scaleLinear().domain([0, 10]).range([0, layout.graphWidth]);
		this.graphY = d3.scaleLinear().domain([0, 10]).range([layout.graphHeight, 0]);
		this.timeScale = d3.scaleLinear().domain([0, 150]).range([0, layout.timeScaleWidth]);
	}
}

export { Scale };