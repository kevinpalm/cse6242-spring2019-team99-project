import { MVCView } from "./MVCView.js";
import { MVCModel } from "./MVCModel.js";
import { PromiseManager } from "./Model/promiseManager.js";

function main() {
	let promiseManager = new PromiseManager();
	promiseManager.onLoadingComplete(function(data) { runApp(data); });
}

function runApp(data) {
	console.log(data);
	let model = new MVCModel(data);
	let view = new MVCView(model);
	console.log(model.dataset.topics.topicNames);
}

main();