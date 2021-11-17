export interface IProps {
    /**
     * 圆环缺口角度
     */
    gapAngle?: number;
    /**
     * 圆环半径
     */
    r?: number;
    /**
     * 圆环边框宽度
     */
    strokeWidth?: number;
    /**
     * 圆环未完成部分颜色和完成部分颜色
     */
    strokeColors?: [string, any];
    /**
     * 当前百分比
     */
    percent?: number;
}
