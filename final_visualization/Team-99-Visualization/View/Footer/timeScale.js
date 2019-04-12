import { Colleague } from "../colleague.js";

class TimeScale extends Colleague {
    constructor(dims, container, scale, mediator) {
        super(mediator);
        this.register("timeScale");
        this.layout = dims;
        this.container = container;
        this.scale = scale;
        this.blockHeight = 15;
        this.blockWidth = 7;
        this.currentStep = 0;
        this.bundle = this.mediator.requestAction("dataset", "getBundle");
        this.scale = d3.scaleTime().domain(d3.extent(this.bundle.data, function(d) { return Date.parse(d.id); })).range([0, this.layout.timeScaleWidth]);
        this.axisModel = this.initAxisModel();
        this.svg = this.createSvg();
        this.axisView = this.createAxis();
        this.timeBlock = this.initTimeBlock();
    }

    initTimeBlock() {
        return this.svg.append("rect")
            .attr("width", this.blockWidth)
            .attr("height", this.blockHeight)
            .attr("x", this.layout.padding.left)
            .attr("y", 0)
            .attr("fill", "black");
    }

    initAxisModel() {
        const tickAmount = (this.bundle.timeType == "W" ? d3.timeWeek.every(this.bundle.timeStep) : d3.timeMonth.every(this.bundle.timeStep));
        const tickFormat = d3.timeFormat("%b %d");
        return d3.axisBottom(this.scale).ticks(tickAmount).tickFormat(tickFormat);
    }

    stepForward() {
        if(this.currentStep < this.bundle.data.length - 1) {
            this.currentStep += 1;
            this.bundle = this.mediator.requestAction("dataset", "getBundle");
            this.timeBlock.attr("x", this.layout.padding.left + this.scale(Date.parse(this.bundle.data[this.currentStep]["id"])));
        }
    }

    stepBackward() {
        if(this.currentStep >= 1) {
            this.currentStep -= 1;
            this.bundle = this.mediator.requestAction("dataset", "getBundle");
            this.timeBlock.attr("x", this.layout.padding.left + this.scale(Date.parse(this.bundle.data[this.currentStep]["id"])));
        }
    }

    animate() {
        let bundle = this.mediator.requestAction("dataset", "getBundle");
        let t = d3.transition().ease(d3.easeLinear).duration(200 * bundle.data.length + 200);
        this.timeBlock.attr("x", this.layout.padding.left);
        this.timeBlock.transition(t).attr("x", this.layout.timeScaleWidth + this.layout.padding.left);
    }

    createSvg() {
        let svg = this.container.append("svg")
            .attr("width", this.layout.timeScaleContainerWidth)
            .attr("height", this.layout.timeScaleHeight + this.blockHeight)
            .attr("transform", "translate(" + (this.layout.padding.left * 2.5) + ", " + 0 + ")")
        .append("g");
        return svg;
    }

    createAxis() {
        let axisView = this.svg.append("g")
            .attr("transform", "translate(" + this.layout.padding.left + ", " + this.blockHeight + ")")
            .classed("axis", true)
            .call(this.axisModel);
        axisView.selectAll("text")
            .attr("y", 0)
            .attr("x", 9)
            .attr("dy", "0.35em")
            .attr("transform", "rotate(90)")
            .style("text-anchor", "start");
        return axisView;
    }
}

export { TimeScale };