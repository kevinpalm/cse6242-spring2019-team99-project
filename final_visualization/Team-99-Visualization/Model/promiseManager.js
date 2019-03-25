class PromiseManager {
	constructor(filepath) {
		this.filepath = filepath;
		this.promise = d3.csv(filepath, function(d) {
			return d; 
		}).then(function(loadingData) { return loadingData; })
	}
	
	onLoadingComplete(myFunc) {
		console.log(myFunc)
		Promise.all([this.promise]).then(function (data) { 
			console.log(myFunc);
			myFunc(data);
		});
	}
}

export { PromiseManager };