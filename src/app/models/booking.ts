export interface Booking {
    packageId: string;
    date: string;
    time: string;
    people: number;
    alternatePhone: string;
    notes: string;
    status: string;
    id?: string;
}