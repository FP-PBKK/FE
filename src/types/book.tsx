export type Booking = {
    id : number,
    name: string,
    tanggal? : string,
    jam? : string,
    note?:string,
    total?:string,
    discount_id? : string,
    qris?: string
}