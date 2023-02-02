export class Contact {
    constructor() {
        document.querySelectorAll('a.obm').forEach((link: HTMLAnchorElement) => {
            this.decode(link);
        });
    }

    protected decode(link: HTMLAnchorElement): void {
        try {
            const b64: string = link.dataset.m;
            const m: string = window.atob(b64);

            link.href = 'mailto:' + m;
            link.textContent = m;
            link.classList.add('contact-mail');
        } catch (e) {
            console.error(e);
        }

        link.classList.remove('obm');
        delete link.dataset.m;
    }
}