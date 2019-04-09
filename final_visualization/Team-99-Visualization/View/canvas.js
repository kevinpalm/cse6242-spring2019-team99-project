class Canvas {
	constructor(dims, container) {
		this.dims = dims;
		this.container = container;
		this.graphSvg = this.createGraph();
	}
	
	createGraph() {
		let graphSvg = this.container.append("svg")
			.attr("width", this.dims.canvasWidth)
			.attr("height", this.dims.canvasHeight)
			.attr("class", "flexContainer")
		.append("g")
			.attr("transform", "translate(" + this.dims.margin.left + ", " + this.dims.margin.top + ")");
		return graphSvg;
	}
	
	destroyGraph() {
		d3.select('svg').remove();
		this.svg = null;
	}
	
	refreshGraph() {
		this.destroyGraph();
		this.svg = this.createGraph();
	}
}

export { Canvas };