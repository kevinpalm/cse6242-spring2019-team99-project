class PlayOptions {
    constructor(dims, container) {
        this.dims = dims;
        this.container = container;
        this.optionsPanel = this.createOptionsPanel();
    }

    createOptionsPanel() {
        let optionsPanel = this.container.append("div")
            .attr("class", "timeOptions");
        let forward = this.createButton(optionsPanel, "Forward");
        let back = this.createButton(optionsPanel, "Back");
        let play = this.createButton(optionsPanel, "Play");
        return optionsPanel;
    }

    createButton(optionsPanel, name) {
        let buttonWidth = this.dims.playButtonWidth;
        let button = optionsPanel.append("input")
            .attr("type", "button")
            .style("width", buttonWidth + "px")
            .attr("value", name)
            .attr("class", "timeButton");
        return button;
    }
}

export { PlayOptions };