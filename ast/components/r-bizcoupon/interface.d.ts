import { COUPON_STATUS } from './constants';
export interface BizCoupon {
    /**
     * 券类型
     */
    couponType: number;
    /**
     * 券对应产品名称 如 津贴联盟
     */
    couponTypeName?: string;
    /**
     * 券的面额
     */
    amount: number;
    /**
     * 券的使用门槛
     */
    amountLimit?: number;
    /**
     * 产品类型
     */
    prodType: number;
    /**
     * 生效产品类型 如 点金/揽客宝/铂金/钻展/为你优选/招商荟
     */
    effectProdName: string;
    /**
     * 券来源
     */
    source?: string;
    /**
     * 券使用周期
     */
    timeLimit: string;
    /**
     * 券状态
     */
    status: COUPON_STATUS.AVAILABLE | COUPON_STATUS.EXPIRED | COUPON_STATUS.USED | COUPON_STATUS.ON_USE;
    /**
     * 今日使用量
     */
    todayUse?: string;
    /**
     * 已使用比例 如 40(%)
     */
    useRate?: number;
    /**
     * 是否即将过期
     */
    nearExpired?: boolean;
    /**
     * 曝光效果数据
     */
    exposureEffect?: {
        exposureImprovement: number;
        goShopImprovement: number;
        usePeriod: number;
    };
    /**
     * 是否展示角标
     */
    isShowSubIcon?: boolean;
    customTitle?: string;
    customDesc?: string;
}
export interface IBizCouponProps {
    renderLeft?: Function;
    renderMiddle?: Function;
    renderRight?: Function;
    /**
     * 自定义渲染底部额外内容
     */
    renderExtraInfo?: Function;
    /**
     * 券信息
     */
    coupon?: BizCoupon;
    /**
     * 券面额自定义配置
     */
    couponAmountConfig?: any;
    /**
     * 点击感叹号图标事件
     */
    onShowInfo?: Function;
    /***
     * 立即使用
     */
    onUseCoupon?: Function;
    /**
     * 终止使用
     */
    onStopUseCoupon?: Function;
    /**
     * 针对pc有特殊的宽高、padding 设置的单独状态的优惠券样式
     * 1: 一站式数据周报 pc的 优惠券样式
     */
    pcType?: number;
}
