class Header {
	constructor(dims, container) {
		this.dims = dims;
		this.container = container;
		this.title = this.create();
		this.setText("Team 99 Visualization");
	}
	
	create() {
		this.destroyTitle();
		let titleElem = this.container.append("div")
			.attr("class", "title");
		return titleElem;
	}
	
	setText(text) {
		this.title.html(text);
	}
	
	destroyTitle() {
		if(!this.container.selectAll(".title").empty()) {
			this.container.selectAll(".title").remove();
		}
	}
}

export { Header };