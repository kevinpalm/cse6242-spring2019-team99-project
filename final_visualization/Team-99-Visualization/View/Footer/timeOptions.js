class TimeOptions {
    constructor(dims, container) {
        this.dims = dims;
        this.container = container;
        this.optionsPanel = this.createOptionsPanel();
    }

    createOptionsPanel() {
        let optionsPanel = this.container.append("div")
            .attr("class", "timeOptions");
        let oneWeek = this.createButton(optionsPanel);
        let twoWeeks = this.createButton(optionsPanel);
        let oneMonth = this.createButton(optionsPanel);
        let threeMonths = this.createButton(optionsPanel);
        return optionsPanel;
    }

    createButton(optionsPanel) {
        let buttonWidth = this.dims.timeButtonWidth;
        let button = optionsPanel.append("input")
            .attr("type", "button")
            .style("width", buttonWidth + "px")
            .attr("class", "timeButton");
        return button;
    }
}

export { TimeOptions };