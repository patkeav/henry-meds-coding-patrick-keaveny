import { Schedule } from "./Schedule.model"


export interface Provider {
    id: number,
    schedule: Schedule[]
}