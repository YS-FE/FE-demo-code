/// <reference types="react" />
import './style.less';
import { COUPON_TYPE } from './constants';
import { BizCoupon } from './interface';
export declare const noop: () => void;
export declare const defaultCouponAmountConfig: {
    3: (data: BizCoupon, disabledColor: string) => {
        title: string;
        amount: JSX.Element[];
        desc: string;
    };
    1: (data: BizCoupon, disabledColor: string) => {
        title: string;
        amount: JSX.Element[];
        desc: string;
    };
    2: (data: BizCoupon, disabledColor: string) => {
        title: string;
        amount: JSX.Element[];
        desc: string;
    };
    4: (data: BizCoupon, disabledColor: string) => {
        title: string;
        amount: JSX.Element[];
        desc: string;
    };
};
