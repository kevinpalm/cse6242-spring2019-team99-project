class Scale {
	constructor(layout, stats) {
		this.layout = layout;
		this.graphXWeek = d3.scaleLinear().domain([0, stats.maxWeekMGCm]).range([0, layout.graphWidth]);
		this.graphXFortnight = d3.scaleLinear().domain([0, stats.maxFortnightMGCm]).range([0, layout.graphWidth]);
		this.graphXMonth = d3.scaleLinear().domain([0, stats.maxMonthMGCm]).range([0, layout.graphWidth]);
		this.graphXQuarter = d3.scaleLinear().domain([0, stats.maxQuarterMGCm]).range([0, layout.graphWidth]);
		this.graphY = d3.scaleLinear().domain([0, parseFloat(stats.maxWeekUGCm)]).range([layout.graphHeight, 0]);
		this.timeScale = d3.scaleLinear().domain([0, 150]).range([0, layout.timeScaleWidth]);
	}
}

export { Scale };