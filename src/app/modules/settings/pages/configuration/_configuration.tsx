export interface BronzeFormFieldsTypes {
  id: number
  name: string
  type: string
  fixedPay: number
  socialPayRate: number
  organicPayRate: number
  paidPayRate: number
}

export interface SilverFormFieldsTypes {
  id: number
  name: string
  article: number
  pageViews: number
  seoScore: number
  type: string
  fixedPay: number
  socialPayRate: number
  organicPayRate: number
  paidPayRate: number
}

export interface GoldFormFieldsTypes {
  id: number
  name: string
  article: number
  pageViews: number
  seoScore: number
  type: string
  fixedPay: number
  socialPayRate: number
  organicPayRate: number
  paidPayRate: number
}

export const BronzeInitValues: BronzeFormFieldsTypes = {
  id: 1,
  name: 'bronze',
  type: 'variable',
  fixedPay: 0,
  socialPayRate: 0,
  organicPayRate: 0,
  paidPayRate: 0,
}

export const SilverInitValues: SilverFormFieldsTypes = {
  id: 2,
  name: 'silver',
  article: 0,
  pageViews: 0,
  seoScore: 0,
  type: 'fixed_and_variable',
  fixedPay: 0,
  socialPayRate: 0,
  organicPayRate: 0,
  paidPayRate: 0,
}

export const GoldInitValues: GoldFormFieldsTypes = {
  id: 3,
  name: 'gold',
  article: 0,
  pageViews: 0,
  seoScore: 0,
  type: 'fixed_and_variable',
  fixedPay: 0,
  socialPayRate: 0,
  organicPayRate: 0,
  paidPayRate: 0,
}