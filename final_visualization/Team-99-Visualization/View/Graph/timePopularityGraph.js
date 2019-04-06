class PopularityGraph {
	constructor(layout, svg, scale, data) {
		this.svg = svg;
		this.layout = layout;
		this.scale = scale;
		this.dataset = data;
		let scaleX = this.scale.graphX;
		let scaleY = this.scale.graphY;
		for(let i = 0; i < 15; i++){
			this.svg.selectAll(".dataPoint")
			.data(this.dataset.data.weekDataCm)
			.enter()
			.append("g")
			.attr("transform", function(d) { 
				console.log(d);
				return "translate(" + scaleX(d["messages_" + i.toString()]) + "," + scaleY(d["users_" + i.toString()]) + ")";
			})
			.append("circle")
			.attr("width", 10)
			.attr("height", 10)
			.attr("r", 5)
			.attr("fill", function() { 
				let r = (i % 5) * 50;
				let g = ((i + 1) % 5) * 50;
				let b = ((i + 3) % 5) * 50;
				return "rgb(" + r + ", " + g + ", " + b + ")";
			});
		}
	}
}

export { PopularityGraph };