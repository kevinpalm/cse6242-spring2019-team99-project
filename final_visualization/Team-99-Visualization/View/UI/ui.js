import { Options } from "./OptionsPanel/options.js";
import { TimeSlider } from "./OptionsPanel/timeSlider.js";
import { CheckBoxes } from "./OptionsPanel/checkboxes.js";
import { DetailView } from "./DetailView/detailView.js";
import { TopTopics } from "./topTopics.js";

class UI {
	constructor(layout, container, topicData, mediator) {
	this.container = container;
	this.layout = layout;
	this.topicData = topicData;
	this.mediator = mediator;
	this.panel = this.container.append('div')
		.attr("class", "uiContainer")
		.attr("align", "center")
		.style("margin", layout.padding.top + "px")
		.attr("width", layout.uiWidth)
		.style("height", layout.uiHeight + "px")
		.html("Interface");
	this.topTopics = new TopTopics(layout, this.panel, this.topicData, this.mediator);
	this.detailView = new DetailView(layout, this.panel);
	}
}

export { UI };