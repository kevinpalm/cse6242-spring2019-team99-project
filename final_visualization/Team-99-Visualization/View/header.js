// TODO: Come up with a more informative title.
// Perhaps include team member names here?

class Header {
	constructor(dims, container) {
		this.dims = dims;
		this.container = container;
		this.title = this.create();
		this.setText("LDA Topic Models - Topic Popularity Over Time");
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