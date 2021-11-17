/**
 *  优惠券 v2
 */
/// <reference types="react" />
import R2X from '@r2x/r2x';
import Store from './store';
import { IBizCouponProps } from './interface';
import './style.less';
declare class BizCoupon extends R2X.Component<IBizCouponProps> {
    store: Store;
    constructor(props: any);
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: any): void;
    renderLeft(): JSX.Element;
    renderMiddle(): JSX.Element;
    renderDefaultRightActon(): JSX.Element | JSX.Element[];
    renderRight(): JSX.Element;
    renderExtraInfo(): any;
    render(): JSX.Element;
}
export default BizCoupon;
