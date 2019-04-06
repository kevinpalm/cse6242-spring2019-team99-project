class Mediator {
    constructor() {
        this.colleagues = {};
    }

    requestAction(colleague, action) {
        let func = this.colleagues[colleague][action];
        func = func.bind(this.colleagues[colleague]);
        func();
    }

    registerColleague(colleagueName, colleague) {
        this.colleagues[colleagueName] = colleague;
        console.log(this.colleagues);
    }
}

export { Mediator };