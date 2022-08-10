interface UserModal2 {
  
  user_id: string
  user_name: string
  user_first_name: string
  user_last_name: string
  user_email: string
  user_password: string
  user_image: null
  user_role: string
  user_access: string
  user_wallet: null
  user_website: string
  user_is_active: number 
  user_config: null
  user_created_on: string
  user_updated_on: string
}
export interface AuthModel {
  token: string
  user?: UserModal2

}

export interface WpAuthModel {
  token: string
  user_email: string
  user_nicename: string
  user_display_name: string
}

export interface UserAddressModel {
  addressLine: string
  city: string
  state: string
  postCode: string
}

export interface UserCommunicationModel {
  email: boolean
  sms: boolean
  phone: boolean
}

export interface UserEmailSettingsModel {
  emailNotification?: boolean
  sendCopyToPersonalEmail?: boolean
  activityRelatesEmail?: {
    youHaveNewNotifications?: boolean
    youAreSentADirectMessage?: boolean
    someoneAddsYouAsAsAConnection?: boolean
    uponNewOrder?: boolean
    newMembershipApproval?: boolean
    memberRegistration?: boolean
  }
  updatesFromKeenthemes?: {
    newsAboutKeenthemesProductsAndFeatureUpdates?: boolean
    tipsOnGettingMoreOutOfKeen?: boolean
    thingsYouMissedSindeYouLastLoggedIntoKeen?: boolean
    newsAboutStartOnPartnerProductsAndOtherServices?: boolean
    tipsOnStartBusinessProducts?: boolean
  }
}

export interface UserSocialNetworksModel {
  linkedIn: string
  facebook: string
  twitter: string
  instagram: string
}

export interface UserModel {
  token: string
  user?: UserModal2
}
