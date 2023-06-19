export type Transaction = {
    id : string,
    bookingId?: string,
    total? : number,
    discountId?:string,
    paid: number
}

export type SendTransaction = {
    id_booking?: string,
    total? : number,
    discount_id?:string,
}