export interface ConfigurationFormFieldsTypes {
  b_payment_type: string
  b_fixed_amount: number
  s_article_count: number 
  s_views: number
  s_seo_score: number
  s_payment_type: string
  s_fixed_amount: number
  g_article_count: number
  g_views: number
  g_seo_score: number
  g_payment_type: string
  g_fixed_amount: number

  b_var_social: number
  b_var_organic: number
  b_var_paid: number
  s_var_social: number
  s_var_organic: number
  s_var_paid: number
  g_var_social: number
  g_var_organic: number
  g_var_paid: number
}

export const ConfigurationInitValues: ConfigurationFormFieldsTypes = {
  b_payment_type: 'variable',
  b_fixed_amount: 0,
  s_article_count: 0,
  s_views: 0,
  s_seo_score: 0,
  s_payment_type: 'fixed_variable',
  s_fixed_amount: 0,
  g_article_count: 0,
  g_views: 0,
  g_seo_score: 0,
  g_payment_type: 'fixed_variable',
  g_fixed_amount: 0,
  b_var_social: 0,
  b_var_organic: 0,
  b_var_paid: 0,
  s_var_social: 0,
  s_var_organic: 0,
  s_var_paid: 0,
  g_var_social: 0,
  g_var_organic: 0,
  g_var_paid: 0,
}