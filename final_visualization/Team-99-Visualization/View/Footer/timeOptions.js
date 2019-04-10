import { Colleague } from "../colleague.js";

class TimeOptions extends Colleague {
    constructor(dims, container, mediator) {
        super(mediator);
        this.register("timeOptions");
        this.dims = dims;
        this.container = container;
        this.buttonList = [];
        this.optionsPanel = this.createOptionsPanel();
        this.colorButtons(1);
    }

    createOptionsPanel() {
        let optionsPanel = this.container.append("div")
            .attr("class", "timeOptions");
        let oneWeek = this.createButton(optionsPanel, "Week", this.week);
        let twoWeeks = this.createButton(optionsPanel, "Two Weeks", this.fortnight);
        let oneMonth = this.createButton(optionsPanel, "Month", this.month);
        let threeMonths = this.createButton(optionsPanel, "Quarter", this.quarter);
        this.buttonList = [oneWeek, twoWeeks, oneMonth, threeMonths];
        return optionsPanel;
    }

    colorButtons(selected) {
        for(let i = 0; i < 4; i++) {
            if(i == selected) {
                this.buttonList[i].attr("class", "myButtonActive");
            }
            else {
                this.buttonList[i].attr("class", "myButton");
            }
        }
    }

    createButton(optionsPanel, name, func) {
        let buttonWidth = this.dims.timeButtonWidth;
        func = func.bind(this);
        let button = optionsPanel.append("button")
            .attr("type", "button")
            .style("width", buttonWidth + "px")
            .attr("class", "myButton")
            .html(name)
            .on("click", func);
        return button;
    }

    week() {
        this.mediator.requestAction("graph", "requestWeeks");
        this.mediator.requestAction("axis", "requestWeeks");
        this.mediator.requestAction("dataset", "setBundle", 0);
        this.mediator.requestAction("detailGraph", "refresh");
        this.colorButtons(0);
    }

    fortnight() {
        this.mediator.requestAction("graph", "requestFortnights");
        this.mediator.requestAction("axis", "requestFortnights");
        this.mediator.requestAction("dataset", "setBundle", 1);
        this.mediator.requestAction("detailGraph", "refresh");
        this.colorButtons(1);
    }

    month() {
        this.mediator.requestAction("graph", "requestMonths");
        this.mediator.requestAction("axis", "requestMonths");
        this.mediator.requestAction("dataset", "setBundle", 2);
        this.mediator.requestAction("detailGraph", "refresh");
        this.colorButtons(2);
    }

    quarter() {
        this.mediator.requestAction("graph", "requestQuarters");
        this.mediator.requestAction("axis", "requestQuarters");
        this.mediator.requestAction("dataset", "setBundle", 3);
        this.mediator.requestAction("detailGraph", "refresh");
        this.colorButtons(3);
    }
}

export { TimeOptions };