"use strict";

import MessagePrinter from "./MessagePrinter";

/**
 * класс для очистки текстовых полей и боксов
 */
export default class FieldsCleaner {
    /**
     * конструктор, в котором создаётся массив объектов, которые надо очистить
     */
    constructor() {
        this.fields = [];
    }

    /**
     * метод для добавления DOM объекта в массив
     * @param field - DOM объект
     */
    addField(field) {
        this.fields.push(field);
    }

    /**
     * метод для очистки всех DOM объектов в массиве
     */
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
