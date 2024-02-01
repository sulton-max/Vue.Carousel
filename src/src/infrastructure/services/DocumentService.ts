export class DocumentService {

    /* region Scrolling */

    public getRemainingScrollOnLeft(element: HTMLElement): number {
        return element.scrollWidth - element.scrollLeft - element.clientWidth;
    }

    public getRemainingScrollOnRight(element: HTMLElement): number {
        return element.scrollWidth - (element.scrollLeft + element.clientWidth);
    }

    public scrollLeft(element: HTMLElement, distance: number) {
        const remainingScrollOnLeft = this.getRemainingScrollOnLeft(element);
        const fullScroll = remainingScrollOnLeft < distance * 2;
        const scrollDistance = fullScroll ? element.scrollLeft - element.clientWidth : element.scrollLeft - distance;

        element.scroll({
            left: scrollDistance,
            behavior: "smooth"
        });
    }

    public scrollRight(element: HTMLElement, distance: number) {
        const remainingScrollOnRight = this.getRemainingScrollOnRight(element);
        const fullScroll = remainingScrollOnRight < distance * 2;
        const scrollDistance = fullScroll ? element.scrollWidth - element.clientWidth : element.scrollLeft + distance;

        console.log('scroll distance', scrollDistance);

        element.scroll({
            left: scrollDistance,
            behavior: "smooth"
        });
    }

    public canScrollLeft(element: HTMLElement): boolean {
        return element.scrollLeft > 0;
    }

    public canScrollRight(element: HTMLElement, minDistance: number = 0): boolean {
        return element.scrollLeft + element.clientWidth < element.scrollWidth - minDistance;
    }

    public scrollToBeginning(element: HTMLElement) {
        element.scroll({
            left: 0,
            behavior: "smooth"
        });
    }

    public scrollToEnd(element: HTMLElement) {
        element.scroll({
            left: element.scrollWidth,
            behavior: "smooth"
        });
    }

    /* endregion */

    /* region Events */

    public addEventListener(element: HTMLElement, eventName: string, callback: (event: HTMLElement) => void): void {
        element.addEventListener(eventName, (event: Event) => callback(event.target as HTMLElement));
    }

    public removeEventListener(element: HTMLElement, eventName: string, callback: (event: HTMLElement) => void): void {
        element.removeEventListener(eventName, (event: Event) => callback(event.target as HTMLElement));
    }

    /* endregion */

    /* region Elements layout */

    public getChildWidth(element: HTMLElement): number {
        return element.children == 0 ? 0 : (element.children[0] as HTMLElement).offsetWidth;
    }

    /* endregion */

    /* region Timeouts */

    /*
    * Sets an interval which executes a callback every given interval period
     */
    public setInterval(callback: () => void, timeout: number): number {
        return setInterval(callback, timeout);
    }

    /*
     * Clears an interval
     */
    public clearInterval(intervalId: number): void {
        clearInterval(intervalId);
    }

    /* endregion */
}