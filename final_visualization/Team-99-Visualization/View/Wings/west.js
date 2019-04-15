class West {
    constructor(layout, container, dataset, mediator) {
        this.layout = layout;
        this.container = container;
        this.dataset = dataset;
        this.mediator = mediator;
        this.panel = this.initPanel();
        this.selectLabel = this.initSelectLabel();
        this.listView = this.initListView();
        this.topicDivs = this.initTopics();
        this.scaleOptions = this.initScaleOptions();
    }

    initPanel() {
        let mediator = this.mediator;
        return this.container.append("div")
            .attr("class", "west")
            .style("height", this.layout.canvasHeight + "px")
            .style("width", this.layout.wingWidth + "px")
            .on("mouseout", function() {
                mediator.requestAction("infoBanner", "displayDefault");
            });
    }

    initListView() {
        let mediator = this.mediator;
        let listView = this.panel.append("div")
            .attr("class", "listView")
            .style("height", this.layout.listViewHeight + "px");
        return listView;
    }

    initTopics() {
        let numTopics = this.dataset.data.topicData.length;
        let topicDivs = [];
        let activeTopics = this.dataset.topics.getActiveTopics();
        let mediator = this.mediator;
        let prevSelect = -1;
        let ref = this;
        for(let i = 0; i < numTopics; i++) {
            let display = "Topic " + i + ": " + this.dataset.topics.getWords(i);
            let topicDiv = this.listView.append("div")
                .style("background-color", activeTopics.includes(i) ? this.mediator.requestAction("colors", "getColor", i) : this.getGray(i))
                .style("text-align", "center")
                .style("flex-grow", 1)
                .style("display", "flex")
                .style("flex-direction", "column")
                .style("justify-content", "center")
                .on("mouseover", function() {
                     d3.select(this).style("border-width", "2px");
                     d3.select(this).style("border-color", "black");
                     d3.select(this).style("border-style", "solid");
                     d3.selectAll(".dataPoint_" + i).attr("stroke", "black").attr("stroke-width", "1px");
                     mediator.requestAction("infoBanner", "display", display);
                 })
                 .on("mouseout", function() {
                     d3.select(this).style("border-width", "0px");
                     d3.selectAll(".dataPoint_" + i).attr("stroke-width", "0px");
                 })
                 .on("click", function() {
                    if(event.shiftKey && prevSelect != -1) {
                        let min = Math.min(i, prevSelect);
                        let max = Math.max(i, prevSelect);
                        min = min == prevSelect ? min : min - 1;
                        for(let j = min + 1; j <= max; j++) {
                            ref.flipTopic(mediator, j, activeTopics);
                        }
                    } else {
                        ref.flipTopic(mediator, i, activeTopics);
                    }
                    prevSelect = i;
                 })
                .html(i.toString());
            topicDivs.push(topicDiv);
        }
        return topicDivs;
    }

    flipTopic(mediator, i, activeTopics) {
        let node = this.topicDivs[i];
        if(activeTopics.includes(i)) {
            mediator.requestAction("topics", "deactivateTopic", i);
            mediator.requestAction("graph", "refresh");
            mediator.requestAction("axis", "refresh");
            node.style("background-color", i % 2 == 0 ? "#DFDFDF" : "#BEBEBE");
        } else {
            mediator.requestAction("topics", "activateTopic", i);
            mediator.requestAction("graph", "refresh");
            mediator.requestAction("axis", "refresh");
            node.style("background-color", mediator.requestAction("colors", "getColor", i));
        }
    }

    initScaleOptions() {
        let scaleOptions = this.panel.append("div")
            .style("height", this.layout.scaleOptionsHeight + "px")
            .attr("class", "scaleOptions");
        let sizeLabel = this.initSizeLabel(scaleOptions);
        let sizeSlider = this.initSizeSlider(scaleOptions);
        let zoomLabel = this.initZoomLabel(scaleOptions);
        let zoomSlider = this.initZoomSlider(scaleOptions);
        return scaleOptions;
    }

    initSizeSlider(scaleOptions) {
        let mediator = this.mediator;
        let slider = scaleOptions.append("input");
        let sizeMult = this.initScaleMultiplier(scaleOptions);
        slider.attr("type", "range")
            .attr("min", "25")
            .attr("max", "400")
            .attr("value", "100")
            .attr("class", "slider")
            .on("input", function() {
                sizeMult.text((this.value / 100) + "X");
            })
            .on("change", function() {
                let val = this.value / 100.0;
                mediator.requestAction("graph", "setScalingFactor", val);
                mediator.requestAction("graph", "refresh");
                mediator.requestAction("axis", "refresh");
             });
        return slider;
    }

    initSizeLabel(scaleOptions) {
        let sizeLabel = scaleOptions.append("div")
            .style("width", "100%")
            .style("display", "flex")
            .style("align-items", "center")
            .style("justify-content", "center")
            .style("padding", "5px")
        .append("text")
            .text("Size");
        return sizeLabel;
    }

    initZoomLabel(scaleOptions) {
        let zoomLabel = scaleOptions.append("div")
            .style("width", "100%")
            .style("display", "flex")
            .style("align-items", "center")
            .style("justify-content", "center")
            .style("padding", "5px")
        .append("text")
            .text("Zoom");
        return zoomLabel;
    }

    initScaleMultiplier(scaleOptions) {
        let multDiv = scaleOptions.append("div")
            .style("width", "100%")
            .style("display", "flex")
            .style("align-items", "center")
            .style("justify-content", "center")
            .style("padding", "5px");
        let sizeMult = multDiv.append("text")
            .text("1.0X");
        return sizeMult;
    }

    initZoomPercent(scaleOptions) {
        let zoomDiv = scaleOptions.append("div")
            .style("width", "100%")
            .style("display", "flex")
            .style("align-items", "center")
            .style("justify-content", "center")
            .style("padding", "5px");
        let zoomPercent = zoomDiv.append("text")
            .text("100%");
        return zoomPercent;
    }

    initZoomSlider(scaleOptions) {
        let mediator = this.mediator;
        let slider = scaleOptions.append("input");
        let percent = this.initZoomPercent(scaleOptions);
        slider.attr("type", "range")
            .attr("min", "1")
            .attr("max", "20")
            .attr("value", "1")
            .attr("step", "0.1")
            .attr("class", "slider")
            .on("input", function() {
                percent.text(Math.round(this.value * 100) + "%");
            })
            .on("change", function() {
                let val = 1 / this.value;
                mediator.requestAction("scale", "scaleFactor", val);
                mediator.requestAction("scale", "refresh");
                mediator.requestAction("graph", "refresh");
                mediator.requestAction("axis", "refresh");
            });
        return slider;
    }

    getGray(i) {
        return i % 2 == 0 ? "#DFDFDF" : "#BEBEBE";
    }

    initSelectLabel() {
        let selectTopics = this.panel.append("div")
            .style("height", this.layout.wingHeader + "px")
            .style("width", "100%")
            .style("background-color", "gray")
            .style("display", "flex")
            .style("align-items", "center")
            .style("justify-content", "center")
        .append("text")
            .style("color", "white")
            .text("Active Topics");
        return selectTopics;
    }
}

export { West };