class Scale {
	constructor(layout, stats) {
		this.layout = layout;
		this.graphX = d3.scaleLinear().domain([0, stats.maxWeekMGCm]).range([0, layout.graphWidth]);
		this.graphY = d3.scaleLinear().domain([0, parseFloat(stats.cumulativeUsers) + 200]).range([layout.graphHeight, 0]);
		this.timeScale = d3.scaleLinear().domain([0, 150]).range([0, layout.timeScaleWidth]);
	}
}

export { Scale };