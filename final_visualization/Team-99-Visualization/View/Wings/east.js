// TODO: Implement a help button that displays a popup with an explanation for the chart.

class East {
    constructor(layout, container, mediator) {
        this.layout = layout;
        this.container = container;
        this.mediator = mediator;
        this.panel = this.initPanel();
        this.buttonList = [];
        this.optionsPanel = this.createOptionsPanel();
        this.colorButtons(2);
    }

    initPanel() {
        return this.container.append("div")
            .attr("class", "east")
            .style("height", this.layout.canvasHeight + "px")
            .style("width", this.layout.wingWidth + "px");
    }

    createOptionsPanel() {
        let optionsPanel = this.panel.append("div")
            .attr("class", "chartOptions");
        let title = optionsPanel.append("div")
        .style("height", this.layout.wingHeader + "px")
        .style("width", "100%")
        .style("background-color", "gray")
        .style("display", "flex")
        .style("align-items", "center")
        .style("justify-content", "center")
    .append("text")
        .style("color", "white")
        .text("View Options");
        let messages = this.createButton(optionsPanel, "Messages", this.messages);
        let users = this.createButton(optionsPanel, "Users", this.users);
        let both = this.createButton(optionsPanel, "Both", this.both);
        this.buttonList = [messages, users, both];
        return optionsPanel;
    }

    colorButtons(selected) {
        for(let i = 0; i < 3; i++) {
            if(i == selected) {
                this.buttonList[i].attr("class", "myButtonActive");
            }
            else {
                this.buttonList[i].attr("class", "myButton");
            }
        }
    }

    createButton(optionsPanel, name, func) {
        let buttonWidth = this.layout.chartButtonWidth;
        func = func.bind(this);
        let button = optionsPanel.append("button")
            .attr("type", "button")
            .style("width", buttonWidth + "px")
            .attr("class", "myButton")
            .html(name)
            .on("click", func);
        return button;
    }

    messages() {
        this.mediator.requestAction("detailGraph", "setMessageChart");
        this.colorButtons(0);
    }

    users() {
        this.mediator.requestAction("detailGraph", "setUserChart");
        this.colorButtons(1);
    }

    both() {
        this.mediator.requestAction("detailGraph", "setBothChart");
        this.colorButtons(2);
    }

}

export { East };