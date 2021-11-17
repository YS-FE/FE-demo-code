/// <reference types="react" />
import { Component } from '@r2x/r2x';
import './index.less';
interface TabConfig {
    name: string;
    active: boolean;
}
interface IProps {
    onChange: (value: number) => void;
    config: Array<TabConfig>;
}
interface IState {
    currentTab: number;
}
export default class Tab extends Component<IProps, IState> {
    state: {
        currentTab: number;
    };
    constructor(props: IProps);
    componentDidMount(): void;
    handleClick(value: number): void;
    render(): JSX.Element;
}
export {};
