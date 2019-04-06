import { LayoutDimensions } from "./View/layoutDimensions.js";
import { Layout } from "./View/layout.js"
import { Canvas } from "./View/canvas.js";
import { PopularityGraph } from "./View/Graph/timePopularityGraph.js";
import { Scale } from "./View/Graph/scale.js";
import { Axis } from "./View/Graph/axis.js";
import { UI } from "./View/UI/ui.js";
import { Header } from "./View/header.js"
import { Footer } from "./View/Footer/footer.js";

class MVCView {
	constructor(model) {
		this.model = model;
		this.dims = new LayoutDimensions();
		this.layout = new Layout(this.dims);
		this.canvas = new Canvas(this.dims, this.layout.graphContainer);
		this.scale = new Scale(this.dims, this.model.dataset.stats);
		this.graph = new PopularityGraph(this.dims, this.canvas.graphSvg, this.scale, this.model.dataset);
		this.ui = new UI(this.dims, this.layout.uiContainer);
		this.axis = new Axis(this.scale, this.dims, this.canvas.graphSvg);
		this.header = null;
		this.footer = null;
		this.initHeaderFooter();
	}

	initHeaderFooter() {
		this.layout.header.style("height", this.dims.headerHeight + "px");
		this.layout.footer.style("height", this.dims.footerHeight + "px");
		this.header = new Header(this.dims, this.layout.header);
		this.footer = new Footer(this.dims, this.layout.footer, this.scale);
	}
}

export { MVCView };