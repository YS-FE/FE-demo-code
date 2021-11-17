export interface IExampleProps {
    /**
     * 样式名，MRN下会编译成style实现
     */
    className?: string;
    /**
     * 按钮样式
     */
    style?: any;
    /**
     * 按钮类型 'primary' | 'hollow' | 'normal'
     * @default 'normal'
     */
    name?: string;
}
