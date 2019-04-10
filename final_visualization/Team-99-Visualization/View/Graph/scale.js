import { Colleague } from "../colleague.js";

class Scale extends Colleague {
	constructor(layout, stats, mediator) {
		super(mediator);
		this.register("scale");
		this.layout = layout;
		this.stats = stats;
		this.graphXWeek = d3.scaleLinear().domain([0, stats.maxWeekMGCm]).range([0, layout.graphWidth]);
		this.graphXFortnight = d3.scaleLinear().domain([0, stats.maxFortnightMGCm]).range([0, layout.graphWidth]);
		this.graphXMonth = d3.scaleLinear().domain([0, stats.maxMonthMGCm]).range([0, layout.graphWidth]);
		this.graphXQuarter = d3.scaleLinear().domain([0, stats.maxQuarterMGCm]).range([0, layout.graphWidth]);
		this.graphYWeek = d3.scaleLinear().domain([0, parseFloat(stats.maxWeekUGCm)]).range([layout.graphHeight, 0]);
		this.graphYFortnight = d3.scaleLinear().domain([0, parseFloat(stats.maxFortnightUGCm)]).range([layout.graphHeight, 0]);
		this.graphYMonth = d3.scaleLinear().domain([0, parseFloat(stats.maxMonthUGCm)]).range([layout.graphHeight, 0]);
		this.graphYQuarter = d3.scaleLinear().domain([0, parseFloat(stats.maxQuarterUGCm)]).range([layout.graphHeight, 0]);
		this.currentXScale = this.graphXFortnight;
		this.currentYScale = this.graphYFortnight;
		this.timeScale = d3.scaleLinear().domain([0, 150]).range([0, layout.timeScaleWidth]);
		this.currentTime = 1;
		this.setScale(1);
	}

	scaleWeek(factor) {
		this.graphXWeek = d3.scaleLinear().domain([0, this.stats.maxWeekMGCm * factor]).range([0, this.layout.graphWidth]);
		this.graphYWeek = d3.scaleLinear().domain([0, parseFloat(this.stats.maxWeekUGCm) * factor]).range([this.layout.graphHeight, 0]);
	}

	scaleFortnight(factor) {
		this.graphXFortnight = d3.scaleLinear().domain([0, this.stats.maxFortnightMGCm * factor]).range([0, this.layout.graphWidth]);
		this.graphYFortnight = d3.scaleLinear().domain([0, parseFloat(this.stats.maxFortnightUGCm) * factor]).range([this.layout.graphHeight, 0]);
	}

	scaleMonth(factor) {
		this.graphXMonth = d3.scaleLinear().domain([0, this.stats.maxMonthMGCm * factor]).range([0, this.layout.graphWidth]);
		this.graphYMonth = d3.scaleLinear().domain([0, parseFloat(this.stats.maxMonthUGCm) * factor]).range([this.layout.graphHeight, 0]);
	}

	scaleQuarter(factor) {
		this.graphXQuarter = d3.scaleLinear().domain([0, this.stats.maxQuarterMGCm * factor]).range([0, this.layout.graphWidth]);
		this.graphYQuarter = d3.scaleLinear().domain([0, parseFloat(this.stats.maxQuarterUGCm) * factor]).range([this.layout.graphHeight, 0]);
	}

	scaleFactor(factor) {
		this.scaleWeek(factor);
		this.scaleFortnight(factor);
		this.scaleMonth(factor);
		this.scaleQuarter(factor);
	}

	refresh() {
		this.setScale(this.currentTime);
	}

	setScale(time) {
		this.currentTime = time;
		switch(this.currentTime) {
			case 0:
				this.currentXScale = this.graphXWeek;
				this.currentYScale = this.graphYWeek;
				break;
			case 1:
				this.currentXScale = this.graphXFortnight;
				this.currentYScale = this.graphYFortnight;
				break;
			case 2:
				this.currentXScale = this.graphXMonth;
				this.currentYScale = this.graphYMonth;
				break;
			case 3:
				this.currentXScale = this.graphXQuarter;
				this.currentYScale = this.graphYQuarter;
				break;
		}
	}
}

export { Scale };