import { Colleague } from "../View/colleague.js";

// Citation: Implemented equations from:
// Escaping RGBland Achim Zeileis, Kurt Hornik, Paul Murrell

class Colors extends Colleague {
    constructor(topics, mediator) {
        super(mediator);
        this.register("colors");
        this.topics = topics;
        this.hue1 = 140;
        this.hue2 = 300;
        this.minSat = 70;
        this.maxSat = 100;
        this.minLit = 30;
        this.maxLit = 80;
        this.satRange = this.maxSat - this.minSat;
        this.litRange = this.maxLit - this.minLit;
        this.contrast = 7;
        this.colorDict = {};
        this.computeColors();
    }

    computeColors() {
        for(let i = 0; i < this.topics.topicNames.length; i++) {
            this.colorDict[i] = this.computeColor(i);
        }
    }

    getColor(topicNum) {
        return this.colorDict[topicNum];
    }

    computeColor(topicNum) {
        let hue = this.hueTransform(topicNum);
        let sat = this.satTransform(topicNum);
        let lit = this.litTransform(topicNum);
        hue = parseInt(hue);
        sat = parseInt(sat);
        lit = parseInt(lit);
        console.log(topicNum, hue, sat, lit);
        return "hsl(" + hue + ", " + sat + "%, " + lit + "%)";
    }

    getUserColor(topicNum) {
        let hue = this.hueTransform(topicNum);
        let sat = this.satTransform(topicNum);
        let lit = this.litTransform(topicNum);
        hue = parseInt(hue);
        sat = parseInt(sat);
        lit = parseInt(lit) - this.contrast;
        return "hsl(" + hue + ", " + sat + "%, " + lit + "%)";
    }

    getMessageColor(topicNum) {
        let hue = this.hueTransform(topicNum);
        let sat = this.satTransform(topicNum);
        let lit = this.litTransform(topicNum);
        hue = parseInt(hue);
        sat = parseInt(sat);
        lit = parseInt(lit) + this.contrast;
        return "hsl(" + hue + ", " + sat + "%, " + lit + "%)";
    }

    hueTransform(topicNum) {
        return this.hue2 - this.i(topicNum) * (this.hue2 - this.hue1);
    }

    satTransform(topicNum) {
        return this.maxSat - this.iPrime(topicNum) * this.satRange;
    }

    litTransform(topicNum) {
        return this.gauss(topicNum);
    }

    i(topicNum) {
        let numTopics = this.topics.topicNames.length;
        return (topicNum / numTopics);
    }

    iPrime(topicNum) {
        return this.sigmoid(topicNum);
    }

    iDoublePrime(topicNum) {
        topicNum += 1;
        let numTopics = this.topics.topicNames.length;
        return (topicNum * topicNum) / (numTopics * numTopics);
    }

    sigmoid(topicNum) {
        let numTopics = this.topics.topicNames.length;
        let midPoint = parseInt(numTopics / 2);
        let t = topicNum - midPoint;
        return 1.0 / (1 + Math.exp(t))
    }

    gauss(topicNum) {
        let val = this.minLit + (this.litRange) * this.i(topicNum);
        let mean = (this.minLit + this.maxLit) / 2;
        let variance = 250;
        let factor = 1500;
        let offset = this.minLit;
        let coefficient = 1 / Math.sqrt(2 * Math.PI * variance)
        let exp = Math.exp(- ((val - mean) * (val - mean) / (2 * variance)));
        let result = factor * coefficient * exp + offset;
        return result;
    }
}

export { Colors };