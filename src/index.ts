interface RippleEffectConfig {
    bounded?: boolean | undefined | null;
    color?: string | undefined | null;
    radius?: number | undefined | null;
    opacity?: number | undefined | null;
    enterDuration?: number | undefined | null;
    exitDuration?: number | undefined | null;
}

class RippleEffect {
    readonly surface: HTMLElement = document.createElement("span");

    private _bounded: boolean = true;
    private _color: string = "currentcolor";
    private _radius: number = 1;
    private _opacity: number = 0.2;

    public enterDuration: number = 400;
    public exitDuration: number = 200;

    constructor(readonly element: HTMLElement, config?: RippleEffectConfig) {

        if (config) {
            if (config.bounded != undefined) {
                this.bounded = config.bounded;
            }
            if (config.color != undefined) {
                this.color = config.color;
            }
            if (config.radius != undefined) {
                this.radius = config.radius;
            }
            if (config.opacity != undefined) {
                this.opacity = config.opacity;
            }
            if (config.enterDuration != undefined) {
                this.enterDuration = config.enterDuration;
            }
            if (config.exitDuration != undefined) {
                this.exitDuration = config.exitDuration;
            }
        }

        this.initialize();
    }

    get bounded(): boolean {
        return this._bounded;
    }

    set bounded(value: boolean) {
        this._bounded = !!value;

        this.surface.style.overflow = this._bounded ? "hidden" : "visible";
    }

    get color(): string {
        return this._color;
    }

    set color(value: string) {
        this._color = value.trim() || "currentcolor";
    }

    get radius(): number {
        return this._radius;
    }

    set radius(value: number) {
        this._radius = Math.min(Math.max(0, value), 1);
    }

    get opacity(): number {
        return this._opacity;
    }

    set opacity(value: number) {
        this._opacity = Math.min(Math.max(0, value), 1);
    }

    insertContainer() {
        this.surface.style.cssText = `
            display: block;
            position: absolute;
            top: 0px;
            right: 0px;
            bottom: 0px;
            left: 0px;
            overflow: ${this.bounded ? "hidden" : "visible"};
            pointer-events: none;
        `;
        this.element.append(this.surface);
    }

    initialize() {
        this.insertContainer();

        const onMouseDown = (event: MouseEvent) => {
            const rect = this.element.getBoundingClientRect();

            this.launch(event.clientX - rect.x, event.clientY - rect.y);
        };

        const onTouchStart = (event: TouchEvent) => {
            const rect = this.element.getBoundingClientRect();

            this.launch(
                event.targetTouches[0].clientX - rect.x,
                event.targetTouches[0].clientY - rect.y,
            );
        };

        this.element.addEventListener("mousedown", onMouseDown);
        this.element.addEventListener("touchstart", onTouchStart);

        this.destroy = () => {
            this.element.addEventListener("mousedown", onMouseDown);
            this.element.addEventListener("touchstart", onTouchStart);
            this.surface.remove();
        };
    }

    launch(x: number, y: number, r?: number | undefined | null) {

        if (!r) {
            let { clientWidth, clientHeight } = this.surface;

            r = Math.hypot(
                Math.max(x, clientWidth - x),
                Math.max(y, clientHeight - y),
            );
        }

        const effect = document.createElement("span");

        effect.style.cssText = `
            display: inline-block;
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: ${r * 2}px;
            height: ${r * 2}px;
            border-radius: ${this.radius * 50}%;
            background-color: ${this.color};
            transform: translate(-50%, -50%) scale(0);
            transition: transform ${this.enterDuration}ms ease, opacity ${this.enterDuration / 4}ms linear;
            opacity: 0;
        `;

        this.surface.append(effect);

        window.requestAnimationFrame(() => {
            effect.style.opacity = this.opacity + "";
            effect.style.transform = 'translate(-50%, -50%) scale(1)';

            effect.addEventListener("transitionend", (event) => {
                switch (event.propertyName) {
                    case "transform":
                        effect.style.transition = `opacity ${this.exitDuration}ms linear`;
                        effect.style.opacity = '0';
                        break;
                    case "opacity":
                        if (effect.style.opacity === "0") {
                            effect.remove();
                        }
                        break;
                }
            });
        });
    }

    destroy(): void { }
}


export default RippleEffect;
export type { RippleEffectConfig };