class Canvas {
	constructor(dims, container, mediator) {
		this.dims = dims;
		this.container = container;
		this.mediator = mediator;
		this.graphSvg = this.createGraph();
		this.displaySvg = this.createDisplay();
	}
	
	createGraph() {
		console.log(this.dims.margin.left, this.dims.padding.left);
		let translateX = (this.dims.canvasWidth - this.dims.graphWidth) / 1.5;
		let translateY = (this.dims.canvasHeight - this.dims.graphHeight) / 2;
		let mediator = this.mediator;
		let graphSvg = this.container.append("svg")
			.attr("width", this.dims.canvasWidth)
			.attr("height", this.dims.canvasHeight)
			.attr("class", "graphSvg")
			.call(d3.zoom().on("zoom", function() {
				let transform = d3.event.transform;
				console.log(transform);
				d3.selectAll(".bubbleContainer").attr("transform", transform);
				mediator.requestAction("axis", "rescale", transform);
			}))
		.append("g")
			.attr("transform", "translate(" + translateX + ", " + translateY + ")")
			.attr("class", "svgGroup");
		return graphSvg;
	}

	createDisplay() {
		return this.graphSvg.append("g")
			.attr("class", "bubbleContainer");
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