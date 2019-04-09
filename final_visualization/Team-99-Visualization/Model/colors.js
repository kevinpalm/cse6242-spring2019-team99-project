import { Colleague } from "../View/colleague.js";

// Escaping RGBland Achim Zeileis, Kurt Hornik, Paul Murrell

class Colors extends Colleague {
    constructor(topics, mediator) {
        super(mediator);
        this.register("colors");
        this.topics = topics;
        this.hue1 = 140;
        this.hue2 = 300;
        this.minSat = 80;
        this.maxSat = 100;
        this.minLit = 20;
        this.maxLit = 90;
        this.satRange = this.maxSat - this.minSat;
        this.litRange = this.maxLit - this.minLit;
    }

    getColor(topicNum) {
        let hue = this.hueTransform(topicNum);
        let sat = this.satTransform(topicNum);
        let lit = this.litTransform(topicNum);
        hue = parseInt(hue);
        sat = parseInt(sat);
        lit = parseInt(lit);
        return "hsl(" + hue + ", " + sat + "%, " + lit + "%)";
    }

    hueTransform(topicNum) {
        return this.hue2 - this.i(topicNum) * (this.hue2 - this.hue1);
    }

    satTransform(topicNum) {
        return this.maxSat - this.iPrime(topicNum) * this.satRange;
    }

    litTransform(topicNum) {
        return this.maxLit - this.iDoublePrime(topicNum) * this.litRange;
    }

    i(topicNum) {
        let numTopics = this.topics.topicNames.size;
        return (topicNum / numTopics);
    }

    iPrime(topicNum) {
        return this.sigmoid(topicNum);
    }

    iDoublePrime(topicNum) {
        let numTopics = this.topics.topicNames.size;
        return (topicNum * topicNum) / (numTopics * numTopics);
    }

    sigmoid(topicNum) {
        let numTopics = this.topics.topicNames.size;
        let midPoint = parseInt(numTopics / 2);
        let t = topicNum - midPoint;
        return 1.0 / (1 + Math.exp(t))
    }
}

export { Colors };