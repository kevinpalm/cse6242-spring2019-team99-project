import { Colleague } from "../colleague.js";

// TODO: include more info in the banner display.  Example: avg. messages per user

class InfoBanner extends Colleague {
    constructor(layout, container, dataset, mediator) {
        super(mediator);
        this.register("infoBanner");
        this.layout = layout;
        this.container = container;
        this.dataset = dataset;
        this.panel = this.container.append("div")
            .attr("class", "infoBanner")
            .style("height", this.layout.wingHeader + "px");
        this.defaultDisplay = this.initDefault();
    }

    initDefault() {
        let t1 = "Number of Topics: " + this.dataset.topics.topicNames.length;
        let t2 = "Number of Users: " + this.dataset.stats.cumulativeUsers;
        let t3 = "Number of Messages: " + this.dataset.stats.cumulativeMessages;
        return this.displayThree([t1, t2, t3])
    }

    // TODO: Refactor this ridiculous copypasta...
    displayThree(textArr) {
        if(this.defaultDisplay) {
            this.defaultDisplay.remove();
        }
        this.panel.text("");
        let threePanel = this.panel.append("div")
            .attr("class", "defaultDisplay");
        let firstDiv = threePanel.append("div")
            .style("color", "white")
            .text(textArr[0]);
        let secondDiv = threePanel.append("div")
            .style("color", "white")
            .text(textArr[1]);
        let thirdDiv = threePanel.append("div")
            .style("color", "white")
            .text(textArr[2]);
        return threePanel;
    }

    // TODO: refactor this ridiculous copypasta...
    displayFour(textArr) {
        if(this.defaultDisplay) {
            this.defaultDisplay.remove();
        }
        this.panel.text("");
        let threePanel = this.panel.append("div")
            .attr("class", "defaultDisplay");
        let firstDiv = threePanel.append("div")
            .style("color", "white")
            .text(textArr[0]);
        let secondDiv = threePanel.append("div")
            .style("color", "white")
            .text(textArr[1]);
        let thirdDiv = threePanel.append("div")
            .style("color", "white")
            .text(textArr[2]);
        let fourthDiv = threePanel.append("div")
            .style("color", "white")
            .text(textArr[3]);
        return threePanel;
    }

    displayMany(textArr) {
        if(this.defaultDisplay) {
            this.defaultDisplay.remove();
        }
        this.panel.text("");
        let manyPanel = this.panel.append("div")
            .attr("class", "defaultDisplay");
        for(let text in textArr) {
            let div = manyPanel.append("div")
            .style("color", "white")
            .text(textArr[text]);
        }
        return manyPanel;
    }

    display(text) {
        this.defaultDisplay.remove();
        this.panel.text(text);
    }

    displayDefault() {
        this.panel.text("");
        this.defaultDisplay = this.initDefault();
    }
}

export { InfoBanner };