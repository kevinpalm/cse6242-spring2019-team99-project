import { Colleague } from "../../colleague.js";

// TODO: Implement legend for both chart (to distinguish between user and message colors -- the colors come from colors.js under Model/).
// TODO: Implement cumulative lines for chart.  May want to skip this, I think this would require additional scales, and would be redundant
// since the bubble chart shows the same thing.

class DetailGraph extends Colleague {
    constructor(svg, layout, dataset, mediator) {
        super(mediator);
        this.register("detailGraph");
        this.svg = svg;
        this.layout = layout;
        this.dataset = dataset;
        this.width = this.layout.detailRightX - this.layout.detailLeftX;
        this.graph = this.svg.append("g").attr("class", "detailGroup");
        this.currentChoice = "messages_";
        this.currentTopic = 0;
        this.absolute = true;
        this.requestTopic(0);
        this.setBothChart();
    }

    clear() {
        d3.selectAll(".detailLabel").remove();
        d3.select(".leftAxis").remove();
        d3.select(".rightAxis").remove();
        d3.select(".bottomAxis").remove();
    }

    refresh() {
        this.requestTopic(this.currentTopic);
    }

    setAbsolute(absolut) {
        this.absolute = absolut;
    }

    selectMessageGrowth(topicNum) {
        if(this.absolute) {
            let bundle = this.mediator.requestAction("dataset", "getBundle");
            return bundle.maxMG;
        }
        return this.mediator.requestAction("dataset", "getMaxMessages", topicNum);
    }

    selectUserGrowth(topicNum) {
        if(this.absolute) {
            let bundle = this.mediator.requestAction("dataset", "getBundle");
            return bundle.maxUG;
        }
        return this.mediator.requestAction("dataset", "getMaxUsers", topicNum);
    }

    leftAxis(topicNum) {
        let scale = d3.scaleLinear().domain([0, this.selectMessageGrowth(topicNum)]).range([this.layout.detailBottomY - this.layout.detailPadding, 0]);
        let leftAxis = d3.axisLeft(scale);
        this.createAxis("leftAxis", leftAxis, this.layout.detailLeftX, this.layout.detailPadding);
        this.createLeftLabel(topicNum);
    }

    rightAxis(topicNum) {
        let scale = d3.scaleLinear().domain([0, this.selectUserGrowth(topicNum)]).range([this.layout.detailBottomY - this.layout.detailPadding, 0]);
        let rightAxis = d3.axisRight(scale);
        this.createAxis("rightAxis", rightAxis, this.layout.detailRightX, this.layout.detailPadding);
        this.createRightLabel(topicNum);
    }

    bottomAxis(topicNum) {
        let bundle = this.mediator.requestAction("dataset", "getBundle");
        let scale = d3.scaleTime().domain(d3.extent(bundle.data, function(d) { return Date.parse(d.id); })).range([0, this.layout.detailBottomWidth]);
        const tickAmount = (bundle.timeType == "W" ? d3.timeWeek.every(bundle.timeStep) : d3.timeMonth.every(bundle.timeStep));
        const tickFormat = d3.timeFormat("%b %d");
        let bottomAxis = d3.axisBottom(scale).ticks(tickAmount).tickFormat(tickFormat);
        let axis = this.createAxis("bottomAxis", bottomAxis, this.layout.detailLeftX, this.layout.detailBottomY);
        axis.selectAll("text")
            .attr("y", 0)
            .attr("x", 9)
            .attr("dy", "0.35em")
            .attr("transform", "rotate(90)")
            .style("text-anchor", "start");
    }


    createLeftLabel(topicNum) {
		let xTranslate = (this.layout.detailCanvasWidth - this.width) / 6;
        let yTranslate = 10 * this.layout.detailCanvasHeight / 10 - 10;
        let axisGroup = this.svg.append("g")
            .attr("class", "detailLabel");
        let legend = axisGroup.append("rect")
            .attr("x", 0)
            .attr("y", -15)
            .attr("width", 20)
            .attr("height", 20)
            .attr("fill", this.mediator.requestAction("colors", "getMessageColor", topicNum));
		let axisLabel = axisGroup.append("text")
			.attr("x", 25)
			.attr("y", 0)
            .style("text-anchor", "start")
            .text("Messages");
        axisGroup.attr("transform", "translate(" + xTranslate + ", " + yTranslate + ") rotate(-90)");
		return axisGroup;
    }
    
    createRightLabel(topicNum) {
		let xTranslate = this.layout.detailCanvasWidth - (this.layout.detailCanvasWidth - this.width) / 6;
		let yTranslate = 10 * this.layout.detailCanvasHeight / 10 - 30;
		let axisGroup = this.svg.append("g")
            .attr("class", "detailLabel");
        let legend = axisGroup.append("rect")
            .attr("x", 0)
            .attr("y", -15)
            .attr("width", 20)
            .attr("height", 20)
            .attr("fill", this.mediator.requestAction("colors", "getUserColor", topicNum));
		let axisLabel = axisGroup.append("text")
			.attr("x", -5)
			.attr("y", 0)
            .style("text-anchor", "end")
            .text("Users");
        axisGroup.attr("transform", "translate(" + xTranslate + ", " + yTranslate + ") rotate(90)")
		return axisLabel;
	}

    createAxis(className, axis, translateX, translateY) {
        this.svg.selectAll("." + className).remove();
		return this.svg.append('g')
			.attr("transform", "translate(" + translateX + ", " + translateY + ")")
			.classed(className, true)
            .call(axis);
    }

    createAxes(topicNum) {
        if(this.currentChoice == "both") {
            this.leftAxis(topicNum);
            this.rightAxis(topicNum);
        } else if(this.currentChoice == "users_") {
            this.rightAxis(topicNum);
        } else {
            this.leftAxis(topicNum);
        }
        this.bottomAxis(topicNum);
    }

    parseChoice(topicNum, choice) {
        let result = {};
        result.bundle = this.dataset.getBundle();
        result.len = result.bundle.data.length;
        result.col = choice + topicNum;
        result.width = this.width;
        result.barWidth = result.width / result.len;
        if(choice == "users_") {
            result.max = this.absolute ? result.bundle.maxUG : this.selectUserGrowth(topicNum);
        } else if(choice == "messages_") {
            result.max = this.absolute ? result.bundle.maxMG : this.selectMessageGrowth(topicNum);
        } else {
            result.colM = "messages_" + topicNum;
            result.colU = "users_" + topicNum;
        }
        return result;
    }

    chartBars(topicNum) {
        this.chartBarsChoose(topicNum, this.currentChoice);
    }

    setMessageChart() {
        this.currentChoice = "messages_";
        this.requestTopic(this.currentTopic);
    }

    setUserChart() {
        this.currentChoice = "users_";
        this.requestTopic(this.currentTopic);
    }

    setBothChart() {
        this.currentChoice = "both";
        this.requestTopic(this.currentTopic)
    }

    chartBarsChoose(topicNum, choice) {
        let chartInfo = this.parseChoice(topicNum, choice);
        if(choice == "both") {
            this.chartDouble(topicNum, chartInfo);
        } else {
            this.chartSingle(topicNum, chartInfo);
        }
    }

    chartSingle(topicNum, chartInfo) {
        let h = this.layout.detailBottomY;
        let scale = d3.scaleLinear().domain([0, chartInfo["max"]]).range([0, h]);
        let leftOffset = this.layout.detailLeftX + 1;
        this.svg.selectAll(".bars").remove();
        this.svg.selectAll(".bars").data(chartInfo["bundle"].data).enter()
            .append("rect")
            .attr("class", function(d) {
                return "bars bars_" + d.id.split(" ")[0];
            })
            .attr("fill", this.mediator.requestAction("colors", "getColor", topicNum))
            .attr("x", function(d, i) { return i * chartInfo["barWidth"] + leftOffset; })
            .attr("y", function(d) { 
                let result = h - scale(d[chartInfo["col"]]);
                return result;
             })
            .attr("width", chartInfo["barWidth"])
            .attr("height", function(d) { return scale(d[chartInfo["col"]]); });
    }

    chartDouble(topicNum, chartInfo) {
        let h = this.layout.detailBottomY;
        let maxUG = this.absolute ? chartInfo.bundle.maxMG : this.selectMessageGrowth(topicNum);
        let maxMG = this.absolute ? chartInfo.bundle.maxUG : this.selectUserGrowth(topicNum);
        let scaleM = d3.scaleLinear().domain([0, maxUG]).range([0, h]);
        let scaleU = d3.scaleLinear().domain([0, maxMG]).range([0, h]);
        let leftOffset = this.layout.detailLeftX;
        this.svg.selectAll(".bars").remove();
        let twoBar = this.svg.selectAll(".bars").data(chartInfo.bundle.data).enter().append("g");
        twoBar.append("rect")
            .attr("class", function(d) {
                return "bars bars_" + d.id.split(" ")[0];
            })
            .attr("fill", this.mediator.requestAction("colors", "getMessageColor", topicNum))
            .attr("x", function(d, i) { return i * chartInfo["barWidth"] + leftOffset; })
            .attr("y", function(d) { 
                let result = h - scaleM(d[chartInfo["colM"]]);
                return result;
             })
            .attr("width", chartInfo["barWidth"] / 2)
            .attr("height", function(d) { return scaleM(d[chartInfo["colM"]]); });
        twoBar.append("rect")
            .attr("class", function(d) {
                return "bars bars_" + d.id.split(" ")[0];
            })
            .attr("fill", this.mediator.requestAction("colors", "getUserColor", topicNum))
            .attr("x", function(d, i) { return i * chartInfo["barWidth"] + leftOffset + chartInfo.barWidth / 2; })
            .attr("y", function(d) { 
                let result = h - scaleU(d[chartInfo["colU"]]);
                return result;
             })
            .attr("width", chartInfo["barWidth"] / 2)
            .attr("height", function(d) { return scaleU(d[chartInfo["colU"]]); });
    }

    requestTopic(topicNum) {
        this.clear();
        this.currentTopic = topicNum;
        this.createAxes(topicNum);
        this.chartBars(topicNum);
    }

    onMouseOver(id) {
        d3.selectAll(".bars_" + id.split(" ")[0])
            .attr("stroke", "black")
            .attr("stroke-width", "2px");
    }

    onMouseOut(id) {
        d3.selectAll(".bars_" + id.split(" ")[0]).attr("stroke", "black").attr("stroke-width", "0px");
    }
}

export { DetailGraph };