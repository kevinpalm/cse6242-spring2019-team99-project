class Title {
	constructor(layout, container) {
		this.layout = layout;
		this.container = container;
		this.title = this.create();
		this.setText("This is a test");
	}
	
	create() {
		this.destroyTitle();
		let titleElem = this.container.append("p")
			.attr('align', 'center')
			.style("font-size", "1.5em")
			.attr('class', 'title');
		return titleElem;
	}
	
	setText(text) {
		this.title.text(text);
	}
	
	destroyTitle() {
		if(!this.container.selectAll(".title").empty()) {
			this.container.selectAll(".title").remove();
		}
	}
}

export { Title };