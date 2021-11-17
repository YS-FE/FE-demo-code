import React from 'react';
export default class TableHead extends React.Component<any, any> {
    constructor(props: any);
    UNSAFE_componentWillReceiveProps(nextProps: any): void;
    handleScroll: (e: React.UIEvent<HTMLElement>) => void;
    updateVisibleData: (scrollTop: number) => void;
    itemCheck: (e: any, item: any) => void;
    renderColgroup(): React.ReactNode[];
    renderTableBody(): React.ReactNode[];
    render(): JSX.Element;
}
