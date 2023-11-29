import { Schedule } from "./Schedule.model";


export interface Provider {
    id: number,
    name: string,
    variant: "primary" | "secondary" | "info" | "success",
    schedule: Schedule[];
}