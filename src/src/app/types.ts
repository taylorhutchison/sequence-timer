export interface Timer {
    label?: string;
    paused?: boolean;
    remaining_ms: number;
}