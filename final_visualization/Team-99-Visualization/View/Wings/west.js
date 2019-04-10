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
    }

    initPanel() {
        return this.container.append("div")
            .attr("class", "west")
            .style("height", this.layout.canvasHeight + "px")
            .style("width", this.layout.wingWidth + "px");
    }

    initListView() {
        let listView = this.panel.append("div")
            .attr("class", "listView");
        return listView;
    }

    initTopics() {
        let numTopics = this.dataset.data.topicData.length;
        let topicDivs = [];
        let activeTopics = this.dataset.topics.getActiveTopics();
        console.log(activeTopics);
        for(let i = 0; i < numTopics; i++) {
            let topicDiv = this.listView.append("div")
                .style("background-color", activeTopics.includes(i) ? this.mediator.requestAction("colors", "getColor", i) : this.getGray(i))
                .style("text-align", "center")
                .html(i.toString());
            topicDivs.push(topicDiv);
        }
        return topicDivs;
    }

    getGray(i) {
        return i % 2 == 0 ? "#DFDFDF" : "#BEBEBE";
    }

    initSelectLabel() {
        let selectTopics = this.panel.append("text")
            .attr("text-align", "center")
            .style("padding", "15px")
            .style("background-color", "gray")
            .style("color", "white")
            .text("Active Topics");
        return selectTopics;
    }
}

export { West };