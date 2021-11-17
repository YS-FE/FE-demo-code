/// <reference types="react" />
import { Component } from '@r2x/r2x';
declare type PLATFORM_TYPES = 'MICRO' | 'H5' | 'WEAPP' | 'RN';
interface IProps {
    platform: PLATFORM_TYPES;
    className?: any;
    style?: any;
}
export default class R2XAdapter extends Component<IProps, {}> {
    render(): JSX.Element;
}
export {};
