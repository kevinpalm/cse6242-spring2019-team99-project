class Mediator {
    constructor() {
        this.colleagues = {};
    }

    requestAction(colleague, action) {
        let func = this.colleagues[colleague][action];
        func = func.bind(this.colleagues[colleague]);
        func();
    }

    requestAction(colleague, action, val) {
        let func = this.colleagues[colleague][action];
        func = func.bind(this.colleagues[colleague]);
        func(val);
    }

    registerColleague(colleagueName, colleague) {
        this.colleagues[colleagueName] = colleague;
        console.log(this.colleagues);
    }
}

export { Mediator };