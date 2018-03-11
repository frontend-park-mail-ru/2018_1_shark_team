"use strict";

import MessagePrinter from "./MessagePrinter";

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
            } catch (err) {
                MessagePrinter.write("err");
            }

            try {
                field.value = "";
            } catch (err) {
                MessagePrinter.write("err");
            }
        });
    }
}
