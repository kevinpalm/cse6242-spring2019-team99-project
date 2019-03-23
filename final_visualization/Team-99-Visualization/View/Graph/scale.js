class Scale {
	constructor(layout) {
		this.layout = layout;
		this.graphX = d3.scaleLinear().domain([0, 10]).range([0, layout.graph_width]);
		this.graphY = d3.scaleLinear().domain([0, 10]).range([layout.height, 0]);
	}
}

export { Scale };