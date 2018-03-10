"use strict";

export default class FieldsCleaner {
    constructor() {
        this.fields = [];
    }

    addField(field) {
        this.fields.push(field);
    }

    clearFields() {
        this.fields.forEach((field) => {
            try {
                field.innerHTML = "";
            } catch (err) {}

            try {
                field.value = "";
            } catch (err) {}
        })
    }
}
