export interface TreeNode {
    path: string;
    name: string;
    component?: any;
    meta?: any;
    children?: TreeNode[];
}