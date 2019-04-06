import { TimeScale } from "./timeScale.js";
import { TimeOptions } from "./timeOptions.js";
import { PlayOptions } from "./playOptions.js";

class Footer {
    constructor(dims, container, scale, mediator) {
        this.dims = dims;
        this.container = container;
        this.scale = scale;
        this.mediator = mediator;

        this.timeScaleContainer = this.container.append("div")
            .style("padding", "5px");
        this.optionsContainer = this.container.append("div")
            .attr("class", "footerOptionsContainer");
        this.timeOptionsContainer = this.optionsContainer.append("div")
            .attr("class", "timeOptionsContainer");
        this.playOptionsContainer = this.optionsContainer.append("div")
            .attr("class", "playOptionsContainer");

        this.timeScale = new TimeScale(this.dims, this.timeScaleContainer, this.scale);
        this.timeOptions = new TimeOptions(this.dims, this.timeOptionsContainer, this.mediator);
        this.playOptions = new PlayOptions(this.dims, this.playOptionsContainer);
    }
}

export { Footer };