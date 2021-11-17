export default class Coupon {
    autoComputedData: {
        prodType: number;
        extInfo: {};
        accumulated: number;
        allowance: number;
        status: number;
    };
    setAutoComputeData(data: any): void;
    get couponTypeName(): string;
    get useRate(): number;
    get couponTitleWrapStyle(): "linear-gradient(0deg, #F5F6FA 0%, #F5F6FA 100%)" | "linear-gradient(0deg, #FFE8D7 0%, #FFF9E6 100%)";
    get disabledColor(): "" | "gray";
    get disabledBgColor(): "" | "bg-gray";
}
