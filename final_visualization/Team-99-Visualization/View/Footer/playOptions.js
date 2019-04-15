import { Colleague } from "../colleague.js";
// TODO: Implement pause button.

class PlayOptions extends Colleague {
    constructor(dims, container, mediator) {
        super(mediator);
        this.register("playOptions");
        this.dims = dims;
        this.container = container;
        this.optionsPanel = this.createOptionsPanel();
        this.finishedPlaying = true;
    }

    setFinished(finished) {
        this.finishedPlaying = finished;
    }

    createOptionsPanel() {
        let mediator = this.mediator;
        let ref = this;
        let optionsPanel = this.container.append("div")
            .attr("class", "timeOptions");
        let forward = this.createButton(optionsPanel, "Forward");
        forward.on("click", function() {
            if(!ref.finishedPlaying) {
                mediator.requestAction("timeScale", "reset");
                mediator.requestAction("graph", "reset");
                mediator.requestAction("graph", "recomputeCurrentStep");
                ref.finishedPlaying = true;
            }
            mediator.requestAction("graph", "recomputeCurrentStep");
            mediator.requestAction("timeScale", "stepForward");
            mediator.requestAction("graph", "refresh", "stepForward");
        });
        let back = this.createButton(optionsPanel, "Back");
        back.on("click", function() {
            if(!ref.finishedPlaying) {
                mediator.requestAction("timeScale", "reset");
                mediator.requestAction("graph", "reset");
                mediator.requestAction("graph", "recomputeCurrentStep");
                ref.finishedPlaying = true;
            }
            mediator.requestAction("graph", "recomputeCurrentStep");
            mediator.requestAction("timeScale", "stepBackward");
            mediator.requestAction("graph", "refresh", "stepBackward");
        })
        let play = this.createButton(optionsPanel, "Play");
        play.on("click", function() {
            console.log(ref.finishedPlaying, "FinishedPlaying")
            if(ref.finishedPlaying) {
                ref.finishedPlaying = false;
                mediator.requestAction("graph", "refresh", "play");
                mediator.requestAction("timeScale", "animate");
            } else {
                mediator.requestAction("timeScale", "reset");
                mediator.requestAction("graph", "reset");
                mediator.requestAction("graph", "recomputeCurrentStep");
                ref.finishedPlaying = true;
            }
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