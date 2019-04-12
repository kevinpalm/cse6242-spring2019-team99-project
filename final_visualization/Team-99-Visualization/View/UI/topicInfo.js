// TODO: Implement topicInfo panel.  The user will be able to switch or toggle to this away from the detail view
// in order to get more information about the topic.  Items will include top message (from the most_representative_chat_for_each_topic_df.txt),
// topic words (this.dataset.topics.getWords(topicNum)), and perhap a scrolling horizontal number chart of users and messages per time step.
// Alternative options would be to allow users to scroll through messages associated with that topic (obtained from most_representative_chat etc.)
// May skip this, as it will take some time and may or may not be necessary/a major improvement.

class TopicInfo {
    constructor(layout, container, dataset, mediator) {
        this.layout = layout;
        this.container = container;
        this.dataset = dataset;
        this.mediator = mediator;
    }
}