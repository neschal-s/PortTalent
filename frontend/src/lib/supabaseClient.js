// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

export const supabaseClient = createClient(
  'https://afekwgodfyxjxtbuhsxg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmZWt3Z29kZnl4anh0YnVoc3hnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5NDI1NzUsImV4cCI6MjA2ODUxODU3NX0.CzMzoBOa4zlZHF2qW8E6Nquou3p-7iZ2lPU7vSvoL7g'
);
