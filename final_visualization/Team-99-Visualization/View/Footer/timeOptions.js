import { Colleague } from "../colleague.js";

class TimeOptions extends Colleague {
    constructor(dims, container, mediator) {
        super(mediator);
        console.log(this.mediator);
        this.register("timeOptions");
        this.dims = dims;
        this.container = container;
        this.optionsPanel = this.createOptionsPanel();
    }

    createOptionsPanel() {
        let optionsPanel = this.container.append("div")
            .attr("class", "timeOptions");
        let oneWeek = this.createButton(optionsPanel, "Week", this.week);
        let twoWeeks = this.createButton(optionsPanel, "Two Weeks", this.fortnight);
        let oneMonth = this.createButton(optionsPanel, "Month", this.month);
        let threeMonths = this.createButton(optionsPanel, "Quarter", this.quarter);
        return optionsPanel;
    }

    createButton(optionsPanel, name, func) {
        let buttonWidth = this.dims.timeButtonWidth;
        func = func.bind(this);
        let button = optionsPanel.append("input")
            .attr("type", "button")
            .style("width", buttonWidth + "px")
            .attr("class", "timeButton")
            .attr("value", name)
            .on("click", func);
        return button;
    }

    week() {
        this.mediator.requestAction("graph", "requestWeeks");
        this.mediator.requestAction("axis", "requestWeeks");
    }

    fortnight() {
        this.mediator.requestAction("graph", "requestFortnights");
        this.mediator.requestAction("axis", "requestFortnights");
    }

    month() {
        this.mediator.requestAction("graph", "requestMonths");
        this.mediator.requestAction("axis", "requestMonths");
    }

    quarter() {
        this.mediator.requestAction("graph", "requestQuarters");
        this.mediator.requestAction("axis", "requestQuarters");
    }
}

export { TimeOptions };