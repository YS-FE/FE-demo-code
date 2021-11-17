export interface Column {
    /** 列属性 prop */
    prop: string;
    /** 列名称 label */
    label: string;
    /** 列宽度 width */
    width?: number;
    /** 自定义渲染函数 renderTh */
    renderTh?: any;
}
export interface VirtualTableProps {
    /** key值 rowkey */
    rowKey: string;
    /** 展示条目数量 visibleCount */
    visibleCount: number;
    /** 每一行高度 rowHeight */
    rowHeight: number;
    /** 列配置项 columns */
    columns: Column[];
    /** 展示数据 dataSource */
    dataSource: any[];
    /** 过滤后的数据 filterList */
    filterList?: any[];
    /** 已选数据 selectedList */
    selectedList?: any[];
    /** 不展示标题 disableHeader */
    disableHeader?: boolean;
    /** 自定义 class */
    className?: string;
    /** 是否可选 selectable */
    selectable?: boolean;
    /** 配置可选框属性 getSelectionProps */
    getSelectionProps?: (item: any) => any;
    /** 勾选checkbox时触发该事件 data为选中所有行数据 */
    onSelectionChange?: (list: any[]) => void;
}
