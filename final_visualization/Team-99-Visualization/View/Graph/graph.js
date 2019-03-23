class Graph {
	constructor(layout, svg) {
		this.svg = svg;
		this.layout = layout;
		this.svg.append('g')
		.append('rect')
			.attr('x', 0)
			.attr('y', 0)
			.attr('width', layout.graph_width)
			.attr('height', layout.height)
			.attr('fill', 'blue');
	}
}

export { Graph };