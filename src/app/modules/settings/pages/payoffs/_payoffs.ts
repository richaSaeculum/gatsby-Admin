export interface PayoffFormFieldsTypes {
    month: string
    year: string
    revenue: number | null
    amount: number | null
}


export const PayoffsInitValues: PayoffFormFieldsTypes = {
    month: '',
    year: '',
    revenue: null,
    amount:  null,
}