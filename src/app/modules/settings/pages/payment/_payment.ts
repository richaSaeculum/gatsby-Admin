export interface PaymentFormFieldsTypes {
    name: string | null
    address: string | null
    aadharcard: string
    pancard: string
    bankAccNo: string
    ifsc: string
    bankName: string
    upi: string
    isUpi?: boolean
    isEdit?: boolean
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
    isUpi: false,
    isEdit: false
}