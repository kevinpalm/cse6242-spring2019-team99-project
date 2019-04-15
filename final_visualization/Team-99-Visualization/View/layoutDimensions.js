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

		this.wingHeader = this.canvasHeight / 16;
		this.listViewHeight = this.canvasHeight * 7 / 16;
		this.scaleOptionsHeight = this.canvasHeight * 0.5;

		this.canvasBanner = this.wingHeader;
		this.svgHeight = this.canvasHeight - this.canvasBanner;
		
		this.graphWidth = this.canvasWidth - this.padding.right - this.padding.left;
		this.graphHeight = this.svgHeight - this.margin.bottom - this.margin.top;

		this.uiHeight = this.graphHeight + this.padding.top + this.padding.bottom;
		this.uiWidth  = this.width - this.canvasWidth - this.padding.right - this.padding.left;

		this.wingWidth = (this.width - this.canvasWidth - this.uiWidth + (this.padding.left * .75)) - 2;

		this.detailPadding = 25;

		this.detailGraphHeight = 2 * this.uiHeight / 3.0;
		this.detailGraphWidth = this.uiWidth;

		this.detailCanvasHeight = this.detailGraphHeight + this.padding.bottom;
		this.detailCanvasWidth = this.detailGraphWidth;

		this.detailLeftX = this.padding.left * 1.5;
		this.detailRightX = this.detailGraphWidth - this.padding.right * 1.5;

		this.detailBottomY = this.detailGraphHeight - this.padding.bottom + this.detailPadding;
		this.detailBottomWidth = this.detailGraphWidth - 3 * this.padding.left;

		let remainingHeight = this.outerHeight - this.height + this.padding.top;
		this.headerHeight = remainingHeight * 0.33;
		this.footerHeight = remainingHeight * 0.67;

		this.timeScaleContainerWidth = this.width - this.padding.right - this.padding.left;
		this.timeScaleWidth = this.timeScaleContainerWidth - this.padding.right - this.padding.left;
		this.timeScaleHeight = this.footerHeight / 3;

		this.timeButtonWidth = this.timeScaleContainerWidth / 9;
		this.playButtonWidth = this.timeScaleContainerWidth / 9;
		this.chartButtonWidth = this.wingWidth * 0.8;
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