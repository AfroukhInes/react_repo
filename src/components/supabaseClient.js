import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ggrrmzwgvyzlpibpbnra.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdncnJtendndnl6bHBpYnBibnJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA2OTk4NDIsImV4cCI6MjAzNjI3NTg0Mn0.GXE6foQMPfO59CKIERC4HvWSPmIDeIoV0cKMkgXX0Gw'

export const supabase = createClient(supabaseUrl, supabaseKey)