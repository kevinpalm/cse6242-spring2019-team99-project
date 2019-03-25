class PopularityGraph {
	constructor(layout, svg, scale, data) {
		let symbol = d3.symbol().size(60);
		symbol.type(d3["symbolCircle"])
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
		.append("path")
			.attr("d", symbol())
			.attr("fill", "transparent")
			.attr("stroke", "blue");
	}
}

export { PopularityGraph };