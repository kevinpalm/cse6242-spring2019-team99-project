import { Layout } from "./View/layout.js";
import { Canvas } from "./View/canvas.js";
import { Title } from "./View/title.js";
import { Graph } from "./View/Graph/graph.js";
import { Scale } from "./View/Graph/scale.js";
import { Axis } from "./View/Graph/axis.js";
import { UI } from "./View/UI/ui.js";

class MVCView {
	constructor() {
		this.layout = new Layout();
		this.canvas = new Canvas(this.layout);
		this.graph = new Graph(this.layout, this.canvas.graphSvg);
		this.ui = new UI(this.layout, this.canvas.uiContainer);
		this.title = new Title(this.layout, this.canvas.titleContainer);
		this.scale = new Scale(this.layout);
		this.axis = new Axis(this.scale, this.layout, this.canvas.graphSvg);
	}
}

export { MVCView };