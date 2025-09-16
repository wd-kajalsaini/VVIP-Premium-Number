import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Category {
  id: number
  name: string
  created_at: string
  updated_at: string
}

export interface PhoneNumber {
  id: number
  phone_number: string
  price: number
  category_id: number
  is_premium: boolean
  created_at: string
  updated_at: string
  category?: Category
}

export interface AdminUser {
  id: string
  email: string
  instagram_url?: string
  created_at: string
}