export interface PayoffFormFieldsTypes {
    month: string
    year: string
    revenue: string | undefined
    amount: number | null
}


export const PayoffsInitValues: PayoffFormFieldsTypes = {
    month: '',
    year: '',
    revenue: '',
    amount:  null,
}