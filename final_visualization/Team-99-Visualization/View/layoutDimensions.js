class LayoutDimensions {
	constructor() {
		this.outerHeight = window.innerHeight
			|| document.documentElement.clientHeight
			|| document.body.clientHeight;
		this.outerWidth = window.innerWidth
			|| document.documentElement.clientWidth
			|| document.body.clientWidth;

		let w_border = 0.03 * this.outerWidth;
		let h_border = 0.05 * this.outerHeight;
		this.margin = new Border(h_border, w_border, h_border, w_border);
		this.padding = new Border(h_border, w_border, h_border, w_border);

		this.innerWidth = this.outerWidth - this.margin.left - this.margin.right;
		this.innerHeight = this.outerHeight - this.margin.top - this.margin.bottom;

		this.width = this.innerWidth - this.padding.left - this.padding.right;
		this.height = this.innerHeight - this.padding.top - this.padding.bottom;

		this.canvasWidth = this.width / 1.618 - this.padding.right - this.padding.left;
		this.canvasHeight = this.height - this.padding.top - this.padding.bottom;
		
		this.graphWidth = this.canvasWidth - this.padding.right - this.padding.left;
		this.graphHeight = this.canvasHeight - this.padding.bottom - this.padding.top - this.margin.bottom - this.margin.top;

		this.uiHeight = this.graphHeight + this.padding.top + this.padding.bottom;
		this.uiWidth  = this.width - this.canvasWidth - this.padding.right - this.padding.left;

		this.detailPadding = 25;

		this.detailGraphHeight = 2 * this.uiHeight / 3.0;
		this.detailGraphWidth = this.uiWidth;

		this.detailLeftX = this.padding.left;
		this.detailRightX = this.detailGraphWidth - this.padding.right;

		this.detailBottomY = this.detailGraphHeight - this.padding.bottom + this.detailPadding;
		this.detailBottomWidth = this.detailGraphWidth - 2 * this.padding.left;

		let remainingHeight = this.outerHeight - this.height;
		this.headerHeight = remainingHeight * 0.38;
		this.footerHeight = remainingHeight * 0.62;

		this.timeScaleContainerWidth = this.width - this.padding.right - this.padding.left;
		this.timeScaleWidth = this.timeScaleContainerWidth - this.padding.right - this.padding.left;
		this.timeScaleHeight = this.headerHeight / 3;

		this.timeButtonWidth = this.timeScaleContainerWidth / 9;
		this.playButtonWidth = this.timeScaleContainerWidth / 9;
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

export { LayoutDimensions };