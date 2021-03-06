class PromiseManager {
	onLoadingComplete(myFunc) {
		let week = d3.tsv("./Model/data/week.txt");
		let fortnight = d3.tsv("./Model/data/fortnight.txt");
		let month = d3.tsv("./Model/data/month.txt");
		let quarter = d3.tsv("./Model/data/quarter.txt");
		let stats = d3.tsv("./Model/data/stats.txt");
		//let dataset = d3.tsv("./Model/data/final_dominant_topic_text_df.txt");
		let topics = d3.tsv("./Model/data/keywords.txt");
		let help = d3.json("./Model/data/help.txt");
		Promise.all([
			week,
			fortnight,
			month,
			quarter,
			stats,
			topics,
			help
		]).then(function (data) { 
			myFunc(data);
		});
	}
}

export { PromiseManager };