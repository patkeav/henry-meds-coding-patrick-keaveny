

export interface Schedule {
    date: string;
    slots: {
        date: Date,
        reserved: boolean,
        confirmed: boolean,
    }[];
}