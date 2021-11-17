/// <reference types="react" />
import R2X from '@r2x/r2x';
import { IProps } from './interface';
interface IState {
}
export default class ProgressCircle extends R2X.Component<IProps, IState> {
    static defaultProps: {
        gapAngle: number;
        r: number;
        strokeWidth: number;
        percent: number;
        strokeColors: string[];
    };
    computeBounds(): {
        containerWidth: number;
        center: number;
    };
    computeXY(value: any): {
        x: number;
        y: number;
        angle: number;
    };
    computePath(startValue: any, endValue: any): string;
    render(): JSX.Element;
}
export {};
