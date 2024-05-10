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
            const transitioDurationMs = 500;

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
                .dot {
                    border-radius: 50%;
                    aspect-ratio: 1/1;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    width:16px;
                    will-change: transform;
                    transition: transform ${transitioDurationMs}ms 0s ease-in-out;
                    transform:  translate(-50%,-50%) scale(0);
                    background-color: #eab308;
                }

            </style>
            `, 'text/html');



            shadow.append(...node.body.childNodes)
            const anchor = shadow.querySelector("a");

            let removeTimeout = null
            let dots = [];

            anchor.addEventListener("mouseover", (e) => {
                const { width, height } = anchor.getBoundingClientRect()
                if (!removeTimeout) {
                    removeTimeout = null;
                    clearTimeout(removeTimeout);
                }
                if (!dots.length) {
                    dots = this.createDots(2);
                    anchor.append(...dots);
                }

                if (!(dots instanceof Array)) return;

                requestAnimationFrame(() => {
                    dots.forEach(dot => {
                        if (!(dot instanceof HTMLSpanElement)) return;
                        const { width: dotWidth, height: dotHeight } = dot.getBoundingClientRect();

                        const scale = dot.dataset.scale;
                        const rotation = dot.dataset.rotation
                        // use rotate/ amount of dots, and cos and sin
                        dot.style.transform = ` translate(${(Math.cos(rotation * 2 * Math.PI) * (width / 2)) - dotWidth * scale / 2}px, ${(Math.sin(rotation * 2 * Math.PI) * (height / 2)) - dotHeight * scale / 2}px) scale(${scale})`

                    })
                })

            })

            anchor.addEventListener("mouseout", (e) => {
                dots.forEach(dot => {

                    dot.style.transform = '';
                })
                // removeTimeout = setTimeout(() => {
                //     removeTimeout = null;
                //     dots.forEach(dot => dot.remove());
                //     dots=[]
                // }, 700);
            })

        });
        console.log('connected');
    }

    createDots(count) {
        const dots = [];
        for (let i = 0;i < count;i++) {
            const dot = document.createElement("span");
            dot.classList.add("dot");
            const scale = 1//0.7 + 0.1 * Math.random()
            // const randomX = this.randomSkewed(-550, 550);
            // const randomY = this.randomSkewed(-250, 250);

            dot.dataset.rotation = i / count //Math.random() *0.1;
            dot.dataset.scale = scale;
            // dot.dataset.randomY = randomY;
            // dot.dataset.randomX = randomX;

            dot.dataset.distance = 100;
            dots.push(dot)
        }
        return dots;
    }

    // ChatGPT but it seem to work how i want
    /**
     * Function that returns random numbers inside of an interval, with the extremities more likely to be returned
     */
    randomSkewed(a, b) {
        // Calculate the range
        const range = b - a;

        // Define a function that skews the distribution toward the ends
        function skewDistribution(x) {
            const midpoint = (a + b) / 2;
            // Calculate the distance from the midpoint
            const distanceFromMidpoint = Math.abs(x - midpoint);
            // Return a weight based on the squared distance
            return distanceFromMidpoint ** 2;
        }

        // Calculate the total weight of the range
        let totalWeight = 0;
        const weights = [];

        for (let x = a;x <= b;x++) {
            const weight = skewDistribution(x);
            weights.push(weight);
            totalWeight += weight;
        }

        // Generate a random value based on the weights
        const randomWeight = Math.random() * totalWeight;
        let cumulativeWeight = 0;

        for (let x = a;x <= b;x++) {
            cumulativeWeight += weights[x - a];
            if (cumulativeWeight >= randomWeight) {
                return x;
            }
        }

        // This point should never be reached because one of the x values should have been returned earlier
        return null;
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
