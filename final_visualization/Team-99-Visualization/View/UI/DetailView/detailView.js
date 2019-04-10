import { DetailGraph } from "./detailGraph.js";

class DetailView {
	constructor(layout, container, data, mediator) {
		this.layout = layout;
		this.container = container;
		this.data = data;
		this.mediator = mediator;
		this.viewHeight = this.layout.detailCanvasHeight;
		this.viewWidth = this.layout.detailCanvasWidth;
		this.viewContainer = container.append("div").attr("class", "detailGraphContainer");
		this.svg = this.createView();
		this.graph = new DetailGraph(this.svg, this.layout, this.data, this.mediator);
	}
	
	createView() {
		let svg = this.viewContainer.append("svg")
			.attr("width", this.viewWidth)
			.attr("height", this.viewHeight);
		return svg;
	}
	
	createDummy() {
		this.view.append("g")
		.append("rect")
			.attr("width", this.viewWidth)
			.attr("height", this.viewHeight)
			.attr("x", 0)
			.attr("y", 0)
			.attr("fill", "red");
		
	}
}

export { DetailView };
