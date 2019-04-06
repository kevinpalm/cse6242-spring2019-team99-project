class Colleague {
    constructor(mediator) {
        this.mediator = mediator;
    }

    register(name) {
        this.mediator.registerColleague(name, this);
    }
}

export { Colleague };