// app/api/data/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lwtckdmvmezjcfxvbyat.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: Request) {
    const response = await request.json()
    console.log("Request body from comp:", response)
    if (!response) {
      console.log("user_id is null or undefined")
      return NextResponse.json({ error: 'user_id is required' }, { status: 400 })
    }
    console.log("Request body:", response.user_id)
    const user_role = await response.user_role
    const content = await response.content
    const session_id = await response.session_id
    const { data, error } = await supabase
      .from('Messages')
      .insert([{ role: user_role, content, session_id }])
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
