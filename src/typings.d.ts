

declare module '*?module' {
    const styles: { [key: string]: string };
    export default styles;
}

declare module '*.less' {
    const content: { [className: string]: string };
    export default content;
}