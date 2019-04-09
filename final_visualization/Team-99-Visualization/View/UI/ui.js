import { DetailView } from "./DetailView/detailView.js";
import { TopTopics } from "./topTopics.js";

class UI {
	constructor(layout, container, dataset, mediator) {
	this.container = container;
	this.layout = layout;
	this.dataset = dataset;
	this.mediator = mediator;
	this.panel = this.container.append('div')
		.attr("class", "uiContainer")
		.attr("align", "center")
		.attr("width", layout.uiWidth)
		.style("height", layout.uiHeight + "px");
	this.topTopics = new TopTopics(layout, this.panel, this.dataset.data.topicData, this.mediator);
	this.detailView = new DetailView(layout, this.panel, this.dataset, this.mediator);
	}
}

export { UI };