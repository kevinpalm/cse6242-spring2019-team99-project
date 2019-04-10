class Canvas {
	constructor(dims, container) {
		this.dims = dims;
		this.container = container;
		this.graphSvg = this.createGraph();
	}
	
	createGraph() {
		console.log(this.dims.margin.left, this.dims.padding.left);
		let translateX = (this.dims.canvasWidth - this.dims.graphWidth) / 1.5;
		let translateY = (this.dims.canvasHeight - this.dims.graphHeight) / 2;
		let graphSvg = this.container.append("svg")
			.attr("width", this.dims.canvasWidth)
			.attr("height", this.dims.canvasHeight)
		.append("g")
			.attr("transform", "translate(" + translateX + ", " + translateY + ")");
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