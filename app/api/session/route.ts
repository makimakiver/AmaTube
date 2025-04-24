
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lwtckdmvmezjcfxvbyat.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: Request) {
    const response = await request.json()
    const user_id = await response.user_id
    const session_id = await response.session_id
    if (user_id == null) {
      console.log("user_id is null or undefined")
      return NextResponse.json({ error: 'user_id is required' }, { status: 400 })
    }
    console.log("Creating session for user:", user_id)
    const { data, error } = await supabase
      .from('Session')
      .insert([{ title: 'almanac', user_id, session_id }])
      .select()
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json(data)
  }

export async function GET() {
  const { data, error } = await supabase.from('items').select('*');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
