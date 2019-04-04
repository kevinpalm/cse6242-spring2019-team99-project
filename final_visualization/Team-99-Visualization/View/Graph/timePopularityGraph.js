class PopularityGraph {
	constructor(layout, svg, scale, data) {
		this.svg = svg;
		this.layout = layout;
		this.svg.append('g')
		.selectAll(".dataPoint")
			.data(dataset)
			.enter()
		.append("g")
			.attr("transform", function(d) { 
				return "translate(" + scaleX(d.rating) + "," + wNScaleY(d.winsNoms) + ")";
			})
		.append("circle")
			.attr("width", 10)
			.attr("height", 10)
			.attr("fill", "red");
	}
}

export { PopularityGraph };