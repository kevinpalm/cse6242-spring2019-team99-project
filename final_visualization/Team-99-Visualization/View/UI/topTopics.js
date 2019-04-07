import { Colleague } from "../colleague.js";

class TopTopics extends Colleague {
    constructor(layout, container, topicData, mediator) {
        super(mediator)
        this.register("topTopics");
        this.layout = layout;
        this.container = container;
        this.topicData = topicData;
        this.topicsPanel = this.container.append("div").attr("class", "topicBlock")
        this.header = this.initHeader();
        this.topics = this.initTopics();
        this.setTopic(7);
    }

    initHeader() {
        let header = this.topicsPanel.append("div").attr("class", "topicRow");
        let words = header.append("div").attr("class", "topicWords").html("Words");
        let topic = header.append("div").attr("class", "topicName").html("Topic");
        let stat = header.append("div").attr("class", "topicStat").html("Messages");
        header.attr("order", 0);
        return header;
    }

    initTopics() {
        let topics = [];
        for(let i = 0; i < 3; i++) {
            console.log(this.topicData);
            let topic = this.topicsPanel.append("div").attr("class", "topicRow");
            let words = topic.append("div").attr("class", "topicWords").html(this.topicData[i]["Keywords"]);
            let topicName = topic.append("div").attr("class", "topicName").html(this.topicData[i]["Topic_Num"]);
            let stat = topic.append("div").attr("class", "topicStat").html("0");
            topics.push(topic);
        }
        return topics;
    }

    setTopic(topicNum) {
        this.topics.pop().remove();
        let topic = this.topicsPanel.append("div").attr("class", "topicRow");
        let words = topic.append("div").attr("class", "topicWords").html(this.topicData[topicNum]["Keywords"]);
        let topicName = topic.append("div").attr("class", "topicName").html(this.topicData[topicNum]["Topic_Num"]);
        let stat = topic.append("div").attr("class", "topicStat").html("0");
        this.topics.splice(0, 0, topic);
        this.topics[0].style("order", 1);
        this.topics[1].style("order", 2);
        this.topics[2].style("order", 3);
    }
}

export { TopTopics };