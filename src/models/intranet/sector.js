import Local from "./local";

export default class Sector {

    constructor() {
        this.id = null;
        this.name = null;
        this.acronym = null;
        this.local = new Local();
    }

}