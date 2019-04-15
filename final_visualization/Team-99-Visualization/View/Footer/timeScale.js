import { Colleague } from "../colleague.js";

class TimeScale extends Colleague {
    constructor(dims, container, scale, mediator) {
        super(mediator);
        this.register("timeScale");
        this.layout = dims;
        this.container = container;
        this.scale = scale;
        this.blockHeight = 18;
        this.blockWidth = 10;
        this.bundle = this.mediator.requestAction("dataset", "getBundle");
        this.currentStep = this.bundle.data.length - 1;
        this.scale = d3.scaleTime().domain(d3.extent(this.bundle.data, function(d) { return Date.parse(d.id); })).range([0, this.layout.timeScaleWidth]);
        this.axisModel = this.initAxisModel();
        this.svg = this.createSvg();
        this.axisView = this.createAxis();
        this.timeBlock = this.initTimeBlock();
        this.currX = 0;
        this.prevPos = 0;
    }

    initTimeBlock() {
        let layout = this.layout;
        let min = layout.padding.left;
        let ref = this;
        let mediator = this.mediator;
        this.prevPos = this.currentStep;
        let drag = d3.drag().on("drag", function() {
            let max = ref.computeX(ref.bundle.data.length - 1);
            let range = max - min;
            let step = range / ref.bundle.data.length;
            let x = d3.mouse(this)[0];
            if(x > min && x < max) {
                d3.select(this).attr("x", x);
            }
            ref.currentStep = Math.round((x - min) / step);
            mediator.requestAction("graph", "setCurrentStep", ref.currentStep);
        }).on("end", function() {
            if(ref.prevPos > ref.currentStep) {
                mediator.requestAction("graph", "refresh", "stepBackward");
            } else if(ref.prevPos < ref.currentStep) {
                mediator.requestAction("graph", "refresh", "stepForward");
            }
        })

        return this.svg.append("rect")
            .attr("width", this.blockWidth)
            .attr("height", this.blockHeight)
            .attr("x", this.computeX(this.currentStep))
            .attr("y", 0)
            .attr("fill", "black")
            .call(drag);
    }

    setCurrentStep(step) {
		let bundle = this.mediator.requestAction("dataset", "getBundle");
		if(step >= 0 && step < bundle.data.length) {
			this.currentStep = step;
		}
    }
    
    recomputeCurrentStep() {
        let prevBundle = this.bundle;
        let ratio = this.currentStep / prevBundle.data.length;
        this.bundle = this.mediator.requestAction("dataset", "getBundle");
        this.currentStep = Math.round(this.bundle.data.length * ratio);
        this.scale = d3.scaleTime().domain(d3.extent(this.bundle.data, function(d) { return Date.parse(d.id); })).range([0, this.layout.timeScaleWidth]);
    }

    initAxisModel() {
        const tickAmount = (this.bundle.timeType == "W" ? d3.timeWeek.every(this.bundle.timeStep) : d3.timeMonth.every(this.bundle.timeStep));
        const tickFormat = d3.timeFormat("%b %d");
        return d3.axisBottom(this.scale).ticks(tickAmount).tickFormat(tickFormat);
    }

    computeX(step) {
        console.log(this.bundle.data.length, step, "Compute X")
        return this.layout.padding.left + this.scale(Date.parse(this.bundle.data[step]["id"]));
    }

    stepForward() {
        this.recomputeCurrentStep();
        this.bundle = this.mediator.requestAction("dataset", "getBundle");
        if(this.currentStep < this.bundle.data.length - 1) {
            this.currentStep += 1;
            this.timeBlock.attr("x", this.computeX(this.currentStep));
            this.currX = this.computeX(this.currentStep);
        }
    }

    stepBackward() {
        this.recomputeCurrentStep();
        this.bundle = this.mediator.requestAction("dataset", "getBundle");
        if(this.currentStep >= 1) {
            this.currentStep -= 1;
            this.timeBlock.attr("x", this.computeX(this.currentStep));
            this.currX = this.computeX(this.currentStep);
        }
    }

    animate() {
        this.initCurrentStep();
        this.initAnimation();
        this.setFinalStep();
    }

    initAnimation() {
        let t = this.constructTransition();
        this.timeBlock.attr("x", this.computeX(this.currentStep));
        this.timeBlock.transition(t).attr("x", this.layout.timeScaleWidth + this.layout.padding.left);
    }

    initCurrentStep() {
        let bundle = this.mediator.requestAction("dataset", "getBundle");
        if(this.currentStep == bundle.data.length - 1) {
			this.currentStep = 0;
		}
    }

    setFinalStep() {
        let bundle = this.mediator.requestAction("dataset", "getBundle");
        this.currentStep = bundle.data.length - 1;
    }

    constructTransition() {
        let bundle = this.mediator.requestAction("dataset", "getBundle");
        let t = d3.transition().ease(d3.easeLinear).duration(200 * bundle.data.length - 200 * this.currentStep + 200);
        let mediator = this.mediator;
        return t;
    }

    recomputeInterrupt() {
        let ratio = (this.timeBlock.attr("x") - this.layout.padding.left) / this.layout.timeScaleWidth;
        this.bundle = this.mediator.requestAction("dataset", "getBundle");
        this.currentStep = Math.round(this.bundle.data.length * ratio);
        if(this.currentStep == this.bundle.data.length) {
            this.currentStep = this.currentStep - 1;
        }
        this.scale = d3.scaleTime().domain(d3.extent(this.bundle.data, function(d) { return Date.parse(d.id); })).range([0, this.layout.timeScaleWidth]);
    }

    reset() {
        this.timeBlock.interrupt();
        this.recomputeInterrupt();
        this.recomputeCurrentStep();
        console.log(this.bundle.data.length, this.currentStep, "RESET");
    }

    getTimeStep() {
        return this.currentStep;
    }

    createSvg() {
        let svg = this.container.append("svg")
            .attr("width", this.layout.timeScaleContainerWidth)
            .attr("height", this.layout.timeScaleHeight + this.blockHeight)
            .attr("transform", "translate(" + (this.layout.padding.left * 2.5) + ", " + 0 + ")")
        .append("g");
        return svg;
    }

    createAxis() {
        let axisView = this.svg.append("g")
            .attr("transform", "translate(" + this.layout.padding.left + ", " + this.blockHeight + ")")
            .classed("axis", true)
            .call(this.axisModel);
        axisView.selectAll("text")
            .attr("y", 0)
            .attr("x", 9)
            .attr("dy", "0.35em")
            .attr("transform", "rotate(90)")
            .style("text-anchor", "start");
        return axisView;
    }
}

export { TimeScale };