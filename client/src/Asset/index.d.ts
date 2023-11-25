declare module "*.jpg" {
    const path: string;
    export default path;
}
declare module "*.png" {
    const path: string;
    export default path;
}
declare module "*.xlsx" {
    const value: any;
    export = value;
}