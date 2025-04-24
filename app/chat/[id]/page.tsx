'use client'

import { useState, useEffect, FormEvent } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Message } from '@ai-sdk/react'

export default function ChatPage() {
  // 1️⃣ Grab the session_id from the folder name [session_id]
  const { session_id } = useParams() as { session_id: string }
  const router = useRouter()

  // 2️⃣ Local state for messages & the input box
  const [messages, setMessages] = useState<Message[]>([
    { id: 'sys1', role: 'system', content: 'You are a friendly assistant.' }
  ])
  const [input, setInput]     = useState('')

  // 3️⃣ On mount: fetch existing messages for this session
  useEffect(() => {
    async function loadHistory() {
      const res = await fetch(`/api/session/${session_id}`)    // or `/api/chat/${session_id}` depending on your API
      if (!res.ok) {
        console.error('Failed to load chat history')
        return
      }
      const data = await res.json() as Array<{
        id: number
        role: 'user' | 'assistant'
        content: string
      }>

      // Map your DB rows to the SDK’s Message shape
      const loaded = data.map((m) => ({
        id: m.id.toString(),
        role: m.role,
        content: m.content
      }))

      setMessages((prev) => [...prev, ...loaded])
    }
    loadHistory()
  }, [session_id])

  // 4️⃣ Handle form submit
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // a) Optimistically add the user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    }
    setMessages((m) => [...m, userMessage])

    // b) Send it to your API
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id,
        role: 'user',
        content: input
      })
    })
    if (!res.ok) {
      console.error('Failed to save user message')
      return
    }
    const saved = await res.json() as { id: number; role: string; content: string }

    // c) (Optionally) fetch assistant reply, append it too:
    //    If you have an AI endpoint, you could await that here and then:
    // setMessages(m => [...m, { id: replyId, role: 'assistant', content: reply }])

    setInput('')
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '90vh',
        width: '100vw',
        margin: '0 auto',
        padding: '1rem',
        overflow: 'hidden',
    }}
    >
      <div
        style={{
            flex: 1,
            overflowY: 'auto',
            marginBottom: '1rem',
            backgroundColor: '#f0f0f0',
        }}
      >
        {messages.map((m) => (
          <div key={m.id} style={{ margin: '0.5rem 0' }}>
            <strong>{m.role === 'user' ? 'You' : 'AI'}:</strong>{' '}
            {m.content}
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit} style={{ display: 'flex' }}>
        <input
          style={{ padding: '0.5rem', backgroundColor: '#f0f0f0'}}
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
          placeholder="Type your message…"
          
        />
        <button
          type="submit"
          style={{
            marginLeft: '0.5rem',
            padding: '0 1rem'
          }}
        >
          Send
        </button>
      </form>
    </div>
  )
}
