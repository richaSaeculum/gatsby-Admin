
export interface UserFormFieldsTypes {
    username: string
    email: string
    firstName: string
    lastName: string
    website?: string
    allowNotification?: boolean
    role: string,
    password: string
}

export const UserInitValues: UserFormFieldsTypes = {
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    website: '',
    allowNotification: false,
    role: 'author',
    password: ''
}
