class DetailView {
	constructor(layout, container) {
		this.layout = layout;
		this.container = container;
		this.viewHeight = this.layout.graphHeight/2.0;
		this.viewContainer = container.append("div");
		this.view = this.createView();
		this.createDummy();
	}
	
	createView() {
		let svg = this.viewContainer.append("svg")
			.attr("width", this.layout.uiWidth)
			.attr("height", this.viewHeight)
		.append("g")
			.attr("transform", "translate(" + 0 + ", " + 0 + ")");
			return svg;
	}
	
	createDummy() {
		this.view.append("g")
		.append("rect")
			.attr("width", this.layout.uiWidth)
			.attr("height", this.viewHeight)
			.attr("x", 0)
			.attr("y", 0)
			.attr("fill", "red");
		
	}
}

export { DetailView };
