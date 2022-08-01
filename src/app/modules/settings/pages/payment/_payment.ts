export interface PaymentFormFieldsTypes {
    name: string
    address: string
    aadharcard: string 
    pancard: string
    bankAccNo: string
    ifsc: string
    bankName: string
    upi: string
    isUpi?: boolean
    aadharcardfile?: FileList | undefined
    pancardfile?: FileList | undefined
}

export const PaymentInitValues: PaymentFormFieldsTypes = {
    name: '',
    address: '',
    aadharcard: '',
    pancard: '',
    bankAccNo: '',
    ifsc: '',
    bankName: '',
    upi: '',
    isUpi: false
}