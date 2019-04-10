import { Colleague } from "../colleague.js";

class TopTopics extends Colleague {
    constructor(layout, container, dataset, mediator) {
        super(mediator)
        this.register("topTopics");
        this.layout = layout;
        this.container = container;
        this.dataset = dataset;
        this.topicData = dataset.data.topicData;
        this.topicsPanel = this.container.append("div").attr("class", "topicBlock")
        this.header = this.initHeader();
        this.topics = this.initTopics();
    }

    initHeader() {
        let header = this.topicsPanel.append("div").attr("class", "topicHRow");
        let words = header.append("div").attr("class", "topicHWords").html("Words");
        let topic = header.append("div").attr("class", "topicHName").html("Topic");
        let stat = header.append("div").attr("class", "topicHStat").html("Messages");
        header.attr("order", 0);
        return header;
    }

    initTopics() {
        let topics = [];
        for(let i = 0; i < 3; i++) {
            let topic = this.topicsPanel.append("div").attr("class", "topicRow");
            let words = topic.append("div").attr("class", "topicWords").html(this.topThreeWords(i));
            let topicName = topic.append("div").attr("class", "topicName").html(this.topicData[i]["Topic_Num"]);
            topicName.style("background-color", this.mediator.requestAction("colors", "getColor", i));
            let stat = topic.append("div").attr("class", "topicStat").html(this.dataset.getTopicMessages(i));
            topics.push(topic);
        }
        return topics;
    }

    setTopic(topicNum) {
        this.topics.pop().remove();
        let topic = this.topicsPanel.append("div").attr("class", "topicRow");
        let words = topic.append("div").attr("class", "topicWords").html(this.topThreeWords(topicNum));
        let topicName = topic.append("div").attr("class", "topicName").html(this.topicData[topicNum]["Topic_Num"]);
        let stat = topic.append("div").attr("class", "topicStat").html(this.dataset.getTopicMessages(topicNum));
        let hsl = this.mediator.requestAction("colors", "getColor", topicNum);
        topicName.style("background-color", hsl);
        this.topics.splice(0, 0, topic);
        this.topics[0].style("order", 1);
        this.topics[1].style("order", 2);
        this.topics[2].style("order", 3);
    }

    topThreeWords(topicNum) {
        let words = this.topicData[topicNum]["Keywords"].split(", ");
        return "" + words[0] + ", " + words[1] + ", " + words[2];
    }
}

export { TopTopics };