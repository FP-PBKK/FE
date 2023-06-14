export type Transaction = {
    id : string,
    bookingId?: string,
    total? : number,
    discountId?:string,
    paid: number
}