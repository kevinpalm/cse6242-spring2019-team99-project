class Canvas {
	constructor(layout) {
		this.layout = layout;
		this.container = d3.select("body").append("div");
		this.titleContainer = this.container.append("div")
			.attr("class", "titleContainer");
		this.bodyContainer = this.container.append("div")
			.attr("class", "flexContainer")
			.attr("justify-content", "center");
		this.graphContainer = this.bodyContainer.append("div");
		this.uiContainer = this.bodyContainer.append("div");
		this.graphSvg = this.createGraph();
	}
	
	createGraph() {
		let graphSvg = this.graphContainer.append("svg")
			.attr("width", this.layout.graph_width)
			.attr("height", this.layout.innerHeight)
			.attr("class", "g")
		.append("g")
			.attr("transform", "translate(" + this.layout.margin.left + ", " + this.layout.margin.top + ")");
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