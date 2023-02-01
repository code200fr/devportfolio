export class Splash {
    static readonly SkipDelay: number = 1000;
    static readonly BlurSpeed: number = 30;

    protected currentIndex: number = 0;
    protected baselines: NodeListOf<HTMLElement>;

    constructor() {
        this.baselines = document.querySelectorAll('#splash .baseline');
        this.parse();

        this.next().catch((e) => console.error(e));
    }

    protected parse(): void {
        this.baselines.forEach((baseline: HTMLElement) => {
            const letters: string[] = baseline.textContent.split('');
            const letterElements: HTMLSpanElement[] = [];

            baseline.textContent = '';

            letters.forEach((letter: string) => {
                const letterElement: HTMLSpanElement = document.createElement('span');
                letterElement.textContent = letter;
                letterElement.classList.add('blur');
                letterElements.push(letterElement);
            });

            baseline.append(...letterElements);
        });
    }

    async next(): Promise<void> {
        setTimeout(async () => {
            await this.animate(false);

            setTimeout(async () => {
                await this.animate(true);

                this.getCurrent().classList.remove('active');
                this.currentIndex++;

                if (this.currentIndex >= this.baselines.length) {
                    this.currentIndex = 0;
                }

                this.getCurrent().classList.add('active');

                return this.next();
            }, Splash.SkipDelay);
        }, 20); // necessary to avoid a display bug
    }

    protected async animate(blur: boolean): Promise<void> {
        const current: HTMLElement = this.getCurrent();
        const letterElements: NodeListOf<HTMLSpanElement> = current.querySelectorAll('span');
        let last: HTMLSpanElement;

        letterElements.forEach((letterElement: HTMLElement) => {
            const classes: DOMTokenList = letterElement.classList;
            blur ? classes.remove('blur') : classes.add('blur');
        });

        for (const letterElement of letterElements) {
            const classes: DOMTokenList = letterElement.classList;
            blur ? classes.add('blur') : classes.remove('blur');
            await new Promise(resolve => setTimeout(resolve, Splash.BlurSpeed));
            last = letterElement;
        }

        return new Promise((resolve: () => void) => {
            last.addEventListener('transitionend', () => {
                return resolve();
            }, {
                once: true
            });
        })
    }

    protected getCurrent(): HTMLElement {
        return this.baselines.item(this.currentIndex);
    }
}