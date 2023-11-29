import { Slot } from './Slot.model';


export interface Reservation {
    provider: string;
    slot: Slot;
    remaining: number;
    started: string;
}