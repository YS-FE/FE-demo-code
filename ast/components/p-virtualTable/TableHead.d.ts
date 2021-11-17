import React from 'react';
import { Column } from './interface';
interface Props {
    columns: Column[];
    checkedAll: boolean;
    selectable?: boolean;
    onAllCheckBoxSelected?: (checked: boolean) => void;
}
export default class TableHead extends React.Component<Props> {
    handleAllChecked: (e: any) => void;
    renderCheckBox(): JSX.Element;
    renderColgroup(): React.ReactNode[];
    renderTableHead(): React.ReactNode[];
    render(): JSX.Element;
}
export {};
