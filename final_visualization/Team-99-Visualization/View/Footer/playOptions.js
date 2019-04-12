class PlayOptions {
    constructor(dims, container, mediator) {
        this.dims = dims;
        this.container = container;
        this.mediator = mediator;
        this.optionsPanel = this.createOptionsPanel();
    }

    createOptionsPanel() {
        let mediator = this.mediator;
        let optionsPanel = this.container.append("div")
            .attr("class", "timeOptions");
        let forward = this.createButton(optionsPanel, "Forward");
        forward.on("click", function() {
            mediator.requestAction("timeScale", "stepForward");
            mediator.requestAction("graph", "refresh", "stepForward");
        });
        let back = this.createButton(optionsPanel, "Back");
        back.on("click", function() {
            mediator.requestAction("timeScale", "stepBackward");
            mediator.requestAction("graph", "refresh", "stepBackward");
        })
        let play = this.createButton(optionsPanel, "Play");
        play.on("click", function() {
            mediator.requestAction("graph", "refresh", "play");
            mediator.requestAction("timeScale", "animate");
        })
        return optionsPanel;
    }

    createButton(optionsPanel, name) {
        let buttonWidth = this.dims.playButtonWidth;
        let button = optionsPanel.append("input")
            .attr("type", "button")
            .style("width", buttonWidth + "px")
            .attr("value", name)
            .attr("class", "myButton");
        return button;
    }
}

export { PlayOptions };