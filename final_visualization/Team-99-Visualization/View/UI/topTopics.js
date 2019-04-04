class TopTopics {
    constructor(layout, container) {
        self.layout = layout;
        self.container = container;
        self.header = this.initHeader();
        self.topics = this.initTopics();
    }

    initHeader() {
        let header = self.container.append("div").attr("class", "topicRow");
        let words = header.append("div").attr("class", "topicWords").html("Words");
        let topic = header.append("div").attr("class", "topicName").html("Topic");
        let stat = header.append("div").attr("class", "topicStat").html("Messages");
        return header;
    }

    initTopics() {
        let topics = self.container.append("div").attr("class", "topicBlock");
        for(let i = 0; i < 3; i++) {
            let topic = topics.append("div").attr("class", "topicRow");
            let words = topic.append("div").attr("class", "topicWords").html("Words");
            let topicName = topic.append("div").attr("class", "topicName").html("Topic");
            let stat = topic.append("div").attr("class", "topicStat").html("Messages");
        }
        return topics;
    }

    setTopics() {

    }
}

class TopicInfo {

}

export { TopTopics };