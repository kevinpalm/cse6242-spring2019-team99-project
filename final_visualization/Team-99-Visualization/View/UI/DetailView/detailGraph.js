import { Colleague } from "../../colleague.js";

class DetailGraph extends Colleague {
    constructor(svg, layout, dataset, mediator) {
        super(mediator);
        this.register("detailGraph");
        this.svg = svg;
        this.layout = layout;
        this.dataset = dataset;
        this.graph = this.svg.append("g").attr("class", "detailGroup");
        this.requestTopic(0);
    }

    refresh() {
        this.graph.remove();
        this.graph = this.svg.append("g").attr("class", "detailGroup");
    }

    leftAxis(topicNum) {
        let scale = d3.scaleLinear().domain([0, this.dataset.stats.maxWeekUG]).range([this.layout.detailBottomY - this.layout.detailPadding, 0]);
        let leftAxis = d3.axisLeft(scale);
        this.createAxis("leftAxis", leftAxis, this.layout.detailLeftX, this.layout.detailPadding);
    }

    rightAxis(topicNum) {
        let scale = d3.scaleLinear().domain([0, this.dataset.stats.maxWeekUG]).range([this.layout.detailBottomY - this.layout.detailPadding, 0]);
        let rightAxis = d3.axisRight(scale);
        this.createAxis("rightAxis", rightAxis, this.layout.detailRightX, this.layout.detailPadding);
    }

    bottomAxis(topicNum) {
        let scale = d3.scaleLinear().domain([0, this.dataset.stats.maxWeekUG]).range([0, this.layout.detailBottomWidth]);
        let bottomAxis = d3.axisBottom(scale);
        this.createAxis("bottomAxis", bottomAxis, this.layout.detailLeftX, this.layout.detailBottomY);
    }

    createAxis(className, axis, translateX, translateY) {
        this.svg.selectAll("." + className).remove();
		this.svg.append('g')
			.attr("transform", "translate(" + translateX + ", " + translateY + ")")
			.classed("className", true)
			.call(axis);
    }

    createAxes(topicNum) {
        this.refresh();
        this.leftAxis(topicNum);
        this.rightAxis(topicNum);
        this.bottomAxis(topicNum);
    }

    chartBars(topicNum) {
        let bundle = this.mediator.requestAction("dataset", "getBundle");
        let len = bundle.data.length;
        console.log(len);
        let userCol = "users_" + topicNum.toString();
        let messCol = "messages_" + topicNum.toString();
        let width = this.layout.detailRightX - this.layout.detailLeftX;
        let barWidth = width / len;
        let maxMessages = bundle.maxMG;
        let h = this.layout.detailBottomY;
        let scale = d3.scaleLinear().domain([0, maxMessages]).range([0, h]);
        let leftOffset = this.layout.detailLeftX + 1;
        this.svg.selectAll(".bars").remove();
        this.svg.selectAll(".bars").data(bundle.data).enter()
            .append("rect")
            .attr("class", "bars")
            .attr("fill", this.mediator.requestAction("colors", "getColor", topicNum))
            .attr("x", function(d, i) { return i * barWidth + leftOffset; })
            .attr("y", function(d) { 
                console.log(d[messCol], maxMessages);
                return h - scale(d[messCol]); })
            .attr("width", barWidth)
            .attr("height", function(d) { return scale(d[messCol]); });

    }

    requestTopic(topicNum) {
        this.createAxes(topicNum);
        this.chartBars(topicNum);
    }
}

export { DetailGraph };