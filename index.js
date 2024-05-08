const elementTagName = 'firefly-button'
class HTMLFireFlyButtonElement extends HTMLElement {
    static get observedAttributes() {
        return [];
    }

    constructor() {
        super();
    }

    connectedCallback() {
        requestAnimationFrame(() => {
            const textContent = this.textContent;
            const shadow = this.attachShadow({ mode: "open" });

            const node = new DOMParser().parseFromString(/*html*/`
            <a>${textContent}</a>
            <style>
                a {
                    position: relative;
                    border-radius: 1000px;
                    padding: 1rem 4rem;
                    background-color: #f59e0b;
                    text-decoration: none;
                    cursor: pointer;
                    will-change: box-shadow;
                    transition: box-shadow .4s;
                }
                
                a:hover{
                    box-shadow:  0px 0px 10px 0px #eab308, inset 0px 0px 5px 0px #fcd34d;
                }
            </style>
            `, 'text/html');
            const anchor = node.getElementsByTagName("a")[0];
            anchor.addEventListener("click", (e) => {
                // this.dispatchEvent(e);
            })

            shadow.append(...node.body.children)
        });
        console.log('connected');
    }

    #createDot() {

    }
    disconnectedCallback() {
        console.log('disconnected');
    }

    adoptedCallback() {
        console.log('adopt');
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} has changed.`);
    }
}

customElements.define(elementTagName, HTMLFireFlyButtonElement);
