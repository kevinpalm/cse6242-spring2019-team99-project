import { Options } from "./OptionsPanel/options.js";
import { TimeSlider } from "./OptionsPanel/timeSlider.js";
import { CheckBoxes } from "./OptionsPanel/checkboxes.js";
import { DetailView } from "./DetailView/detailView.js";

class UI {
	constructor(layout, container) {
	this.container = container;
	this.layout = layout;
	this.panel = this.container.append('div')
		.attr("class", "uiContainer")
		.attr("align", "center")
		.style("margin", layout.padding.top + "px")
		.attr("width", layout.ui_width)
		.style("height", layout.height + "px")
		.html("Interface");
	this.detailView = new DetailView(this.layout, this.panel);
	this.options = new Options(this.layout, this.panel);
	this.slider = new TimeSlider(this.panel);
	this.checkboxes = new CheckBoxes(this.layout, this.panel);
	}
}

export { UI };