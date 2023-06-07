export type Booking = {
    id_user?: string,
    id_schedule?: string,
    id_package?: string,
    date : string,
    note: string,
    booking_status: string,
    additional_items:AddAdditionalItems[]
}
export type AddAdditionalItems = {
    idItem: string,
    quantity: number,
    name: string,
    price : number
}

export type AdditionalItem = {
    id: string,
    name: string,
    price: number,
    description: string
  }
export type Schedule = {
    id: string,
    time: string,
    isBooked: boolean
  }
export type Paket = {
    id: string,
    name: string,
    price: string,
    description: string
  }