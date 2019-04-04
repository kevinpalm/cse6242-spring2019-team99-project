class Options {
	constructor(layout, uiContainer) {
		this.layout = layout;
		this.uiContainer = uiContainer;
		this.optionsPanel = this.createOptions();
	}
	
	createOptions() {
		let buttonWidth = (this.layout.uiWidth / 3) - this.layout.padding.right;
		let options = this.uiContainer.append("div")
			.attr("class", "optionsContainer")
			.attr("align", "center");
		let button1 = options.append("input")
			.attr("type", "button")
			.style("width", buttonWidth + "px")
			.attr("class", "optionButton");
		let button2 = options.append("input")
			.attr("type", "button")
			.style("width", buttonWidth + "px")
			.attr("class", "optionButton");
		return options;
	}
}

export { Options };