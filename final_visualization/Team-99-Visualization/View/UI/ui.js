import { DetailView } from "./DetailView/detailView.js";
import { TopTopics } from "./topTopics.js";

class UI {
	constructor(layout, container, dataset, mediator) {
	this.container = container;
	this.layout = layout;
	this.dataset = dataset;
	this.mediator = mediator;
	this.panel = this.container.append('div')
		.attr("class", "uiInterior")
		.attr("align", "center")
		.attr("width", layout.uiWidth)
		.style("height", layout.canvasHeight + "px");
	this.topTopics = new TopTopics(layout, this.panel, this.dataset, this.mediator);
	this.detailView = new DetailView(layout, this.panel, this.dataset, this.mediator);
	}
}

export { UI };