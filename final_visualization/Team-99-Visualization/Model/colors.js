import { Colleague } from "../View/colleague.js";

// Citation: Implemented equations from:
// Escaping RGBland Achim Zeileis, Kurt Hornik, Paul Murrell

// TODO: perhaps fiddle with the hue/sat/lit ranges here.  The colors are a little bit too "fun" right now...

class Colors extends Colleague {
    constructor(topics, mediator) {
        super(mediator);
        this.register("colors");
        this.topics = topics;
        this.hue1 = 110;
        this.hue2 = 330;
        this.minSat = 80;
        this.maxSat = 100;
        this.minLit = 35;
        this.maxLit = 60;
        this.satRange = this.maxSat - this.minSat;
        this.litRange = this.maxLit - this.minLit;
        this.contrast = 8;
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
        return this.maxSat - this.i(topicNum) * this.satRange;
    }

    litTransform(topicNum) {
        return this.bellCurve(topicNum);
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

    bellCurve(topicNum) {
        topicNum += 0.5;
        let numTopics = (this.topics.topicNames.length);
        let mean = numTopics / 2;
        let height = this.litRange;
        let offset = this.minLit;
        let exp = Math.exp(- ((topicNum - mean) * (topicNum - mean) / (numTopics * 1.5)));
        let result = height * exp + offset;
        return result;
    }
}

export { Colors };