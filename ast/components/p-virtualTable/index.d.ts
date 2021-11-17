import * as React from 'react';
import { VirtualTableProps } from './interface';
import './style';
interface IState {
    checkedList: any;
}
declare class VirtualTable extends React.Component<VirtualTableProps, IState> {
    constructor(props: VirtualTableProps);
    UNSAFE_componentWillReceiveProps(nextProps: VirtualTableProps): void;
    filterSelectableList: (checkedList: any, getSelectionProps: any) => any;
    handleCheckedAll: (checkedAll: boolean) => void;
    handleCheckedRow: (_checked: boolean, _item: any, newList: any) => void;
    judgeCurrentPageAllChecked(checkedList: any, allList: any, rowKey: any): any;
    render(): JSX.Element;
}
export default VirtualTable;
