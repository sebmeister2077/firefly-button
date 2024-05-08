class HTMLFireFlyButtonElement extends HTMLElement {
    static get observedAttributes() {
        return ['hovered', '--hovered']
    }

    hoveredStateName = '--hovered';

    constructor() {
        super();
        this._internals = this.attachInternals();

        this.addEventListener("mouseover", () => {
            this._internals.states.add(this.hoveredStateName)
        })
        this.addEventListener("mouseout", () => {
            this._internals.states.delete(this.hoveredStateName)
        })
    }

    connectedCallback() {
        console.log("connected")
    }

    disconnectedCallback() {

        console.log("disconnected")
    }

    adoptedCallback() {

        console.log("addopt")
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} has changed.`);

    }

}

customElements.define("firefly-button", HTMLFireFlyButtonElement)
