"use strict";

/**
 * класс - словарь для хранения DOM объектов
 */
export default class ElementsBase {
    constructor() {
        this.elements = {};
    }

    /**
     * метод для добавления элемента в словарь
     * @param elementName - ключ в словаре
     * @param element - значение, получаемое по ключу
     */
    addElement(elementName, element) {
        this.elements[elementName] = element;
    }

    /**
     * метод для получения элемента словаря по ключу
     * @param elementName - ключ в словаре
     * @returns {*} - возвращается DOM элемент
     */
    getElement(elementName) {
        return this.elements[elementName];
    }
}
