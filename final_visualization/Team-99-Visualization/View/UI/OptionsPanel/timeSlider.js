class TimeSlider {
	constructor(container) {
		this.container = container;
		this.sliderContainer = container.append("div")
			.style("padding", "10px");
		this.sliderContainer.append("input")
			.attr("type", "range")
			.attr("min", "1")
			.attr("max", "36")
			.attr("value", "18")
			.attr("class", "slider");
	}
}

export { TimeSlider };
