import { Reservation } from "./Reservation.model"


export interface Client {
    id: number,
    reservations: Reservation[]
}