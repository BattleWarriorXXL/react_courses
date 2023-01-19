class OutputListener {
    constructor(htmlElement) {
        this.htmlElement = htmlElement;

        this.update = function(value) {
            htmlElement.value = value;
        };
    }
}

export default OutputListener;
