class Layout {
	constructor() {
		this.margin =  new Border();
		this.padding = new  Border();
		this.outerHeight = window.innerHeight
			|| document.documentElement.clientHeight
			|| document.body.clientHeight;
		this.outerWidth = window.innerWidth
			|| document.documentElement.clientWidth
			|| document.body.clientWidth;
		this.innerWidth = this.outerWidth - this.margin.left - this.margin.right;
		this.innerHeight = this.outerHeight - this.margin.top - this.margin.bottom;
		this.width = this.innerWidth - this.padding.left - this.padding.right;
		this.height = this.innerHeight - this.padding.top - this.padding.bottom;
		this.graph_width = this.height * 1.618 - this.padding.right;
		this.ui_width  = this.graph_width / 1.618;
	}
}

class Border {
	constructor(top = 75, right = 75, bottom = 75, left = 75) {
		this.top = top;
		this.right = right;
		this.bottom = bottom;
		this.left = left;
	}
}

export { Layout };