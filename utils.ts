import { createClient } from '@supabase/supabase-js'

// Create Supabase client
const supabase = createClient('http://localhost:3000', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "")

// Upload file using standard upload
export async function uploadFile(file: File) {
    const { data, error } = await supabase.storage.from('profile-pictures').upload('file_path', file)
    if (error) {
        // Handle error
    } else {
        // Handle success
        return data
    }
}