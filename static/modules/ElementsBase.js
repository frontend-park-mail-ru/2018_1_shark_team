"use strict";

export default class ElementsBase {
    constructor() {
        this.elements = {};
    }

    addElement(elementName, element) {
        this.elements[elementName] = element;
    }

    getElement(elementName) {
        return this.elements[elementName];
    }
}
