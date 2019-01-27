declare module '*.css' {
    const content: any;
    export default content;
  }
declare module '*.json' {
    const content: any;
    export default content;
  }

interface IError {
    message: string;
    status: number;
    stack: string;
}

declare module '*.png' {
  const DEFAULT: string;
  export default DEFAULT;
}
