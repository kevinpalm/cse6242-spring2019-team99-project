import { MVCView } from "./MVCView.js";
import { MVCModel } from "./MVCModel.js";
import { PromiseManager } from "./Model/promiseManager.js";
import { Mediator } from "./View/mediator.js";

function main() {
	let promiseManager = new PromiseManager();
	promiseManager.onLoadingComplete(function(data) { runApp(data); });
}

function runApp(data) {
	let mediator = new Mediator();
	let model = new MVCModel(data, mediator);
	let view = new MVCView(model, mediator);
}

main();