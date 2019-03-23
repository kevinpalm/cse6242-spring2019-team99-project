class CheckBoxes {
	constructor(layout, container) {
		this.layout = layout;
		this.container = container;
		this.panel = this.createCheckBoxes();
	}
	
	createCheckBoxes() {
		let width = "50%";
		let panel = this.container.append("div")
			.style("width", "75%")
			.style("padding", "10px")
			.style("display", "grid")
			.style("grid-template-columns", "repeat(2, minmax(50px, 125px))")
			.style("justify-content", "center");
		this.createCheckBox("LogScale", panel);
		this.createCheckBox("Popularity", panel);
		this.createCheckBox("Lines", panel);
		this.createCheckBox("Rescale axes", panel);
		return panel;
	}
	
	createCheckBox(id, panel) {
		let label = panel.append("label")
			.attr("for", id)
			.style("justify-self", "start");
		label.append("input")
			.attr("id", id)
			.attr("type", "checkbox")
			.attr("name", "checkOptions");
		label.append("span").text(id)
			.attr("class", "checkBoxLabel");
	}
}

export { CheckBoxes };
