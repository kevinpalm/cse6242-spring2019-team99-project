class Layout {
    constructor(layoutDimensions) {
        this.dims = layoutDimensions;
        this.container = d3.select("body").append("div")
            .attr("class", "mainContainer")
        this.header = this.container.append("div")
            .attr("class", "header");
		this.bodyContainer = this.container.append("div")
			.attr("class", "flexContainer");
        this.graphContainer = this.bodyContainer.append("div")
            .attr("class", "graphContainer");
        this.uiContainer = this.bodyContainer.append("div")
            .attr("class", "uiContainer");
        this.footer = this.container.append("div")
            .attr("class", "footer");
    }
}

export { Layout };