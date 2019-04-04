class TimeScale {
    constructor(dims, container, scale) {
        this.dims = dims;
        this.container = container;
        this.scale = scale;
        this.axisModel = d3.axisBottom(scale.timeScale);
        this.svg = this.createSvg();
        this.axisView = this.createAxis();
    }

    createSvg() {
        let svg = this.container.append("svg")
            .attr("width", this.dims.timeScaleContainerWidth)
            .attr("height", this.dims.timeScaleHeight)
            .attr("transform", "translate(" + this.dims.padding.left + ", " + 0 + ")")
        .append("g");
        return svg;
    }

    createAxis() {
        let axisView = this.svg.append("g")
            .attr("transform", "translate(" + this.dims.padding.left + ", 0)")
            .classed("axis", true)
            .call(this.axisModel);
        return axisView;
    }
}

export { TimeScale };