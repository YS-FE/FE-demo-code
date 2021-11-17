/// <reference types="react" />
import R2X from '@r2x/r2x';
import { IExampleProps } from './interface';
import './index.less';
export default class RExample extends R2X.Component<IExampleProps> {
    static defaultProps: Partial<IExampleProps>;
    render(): JSX.Element;
}
