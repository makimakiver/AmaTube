'use client';

import { GradientText } from "@/components/animate-ui/gradient-text";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { VideoCard } from "@/components/pastexample";
import { useChat } from '@ai-sdk/react';
import { generateId } from "ai";
import Link from "next/link";
import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'
// import { PrivyProvider, usePrivy } from "@privy-io/react-auth";
// import Providers from "@/components/providers";
// import { use } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useEffect } from "react";
import { create } from "domain";
import { useRouter } from 'next/navigation'

export default function Home() {
  const { user } = usePrivy();
  if(user) {

  }
  else{

  }
  
  const { messages, input, handleInputChange, handleSubmit, append} = useChat({
    id: 'my-chat-session',
    initialMessages: [
      { id: 'sys1', role: 'system', content: 'You are a friendly assistant.' },
    ],
  });
  const router = useRouter();
  const submitMessage = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const session_id = generateId();
    const session_res = await fetch('/api/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: user.id , session_id: session_id }),
    })
    if (!session_res.ok) throw new Error(await session_res.text())
    // const session_data = await session_res.json()
    const chat_res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_role: 'user', content: input, session_id: session_id }),
    })
    if (!chat_res.ok) throw new Error(await chat_res.text())
    // const data = await chat_res.json()
    // console.log("data from supabase", data[0].id);
    console.log("input", input);
    console.log("messages", messages);
    router.push(`/chat/${session_id}`);
  };
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
    }}>
      <div
        style={{
          display: "flex",
          flex: 1,
          // gridTemplateRows: "20px 1fr 20px",
          /* shorthand for justifyItems + alignItems */
          minHeight: "90vh", /* pb‑20 */  /* gap‑16 */
          padding: "1rem",
          fontFamily: "var(--font-geist-sans)",
          zIndex: 5,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            marginTop: "4vh",
            gridRow: "2 / 3",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            zIndex: 10,
            height: "60vh",
          }}
        >
          <GradientText className="text-4xl font-bold" text="AmaTube Protocol(s)" style={{
            marginTop: "30vh",
            fontSize: "60px",
          }}/>
          <p style={{
            marginBottom: "50px",
            fontSize: "16px",
            color: "#d1d5db",
          }}>
            Will analyze the video and automating the purchasing process
          </p>
          <form
            onSubmit={submitMessage}
            style={{
              /* size & layout */
              width: '45%',
              minHeight: '18vh',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'start',
              justifyContent: 'space-between',
              flexDirection: "column",
              /* cyber look */
              border: '1px solid rgba(0, 0, 0, 0.35)',
              backdropFilter: 'blur(6px)',
            }}
          >
            <div style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              width: "100%",
            }}>
              <input
                type="text"
                onChange={handleInputChange}
                value={input}
                placeholder="YouTube URL"
                style={{
                  width: '95%',
                  marginTop: "10px",
                  padding: '0.5rem 0.1rem',
                  borderRadius: '12px',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.25)',
                  fontFamily: '"Share Tech Mono", monospace',
                  fontSize: '1rem',
                  
                  /* interaction states */
                  outline: 'none',
                  transition: 'border-color .25s ease, box-shadow .25s ease',
                }}
              />
            </div>
            <div style={{
              marginTop: "30px",
              backgroundColor: "blue",
              color: "white",
              border: "none",
              padding: "5px 5px",
              marginRight: "10px",
              marginBottom: "10px",
              marginLeft: "auto",
              borderRadius: "100%",
            }}>
              {/* <Link
                href={`/chat/${chat_id}`}
                > */}
                <button type="submit">
                    <ArrowUpwardIcon />
                </button>
              {/* </Link> */}
            </div>
          </form>

          <div
            style={{
              width: "50%",          // center it
              display: "flex",
              alignItems: "center",
              marginTop: "5vh",
            }}
          >
            <hr
              style={{
                flex: 1,
                border: "none",
                height: "1px",
                backgroundColor: "#d1d5db",
              }}
            />
            <span
              style={{
                padding: "0 1rem",
                color: "#d1d5db",
                whiteSpace: "nowrap",
                fontSize: "14px",
              }}
            >
              Examples
            </span>
            <hr
              style={{
                flex: 1,
                border: "none",
                height: "1px",
                backgroundColor: "#d1d5db",
              }}
            />
          </div>
          <div 
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: "10px",
              marginTop: "5vh",
          }}>
          <VideoCard         /* ← 100 % hard‑coded props */
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            thumbnail="https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg"
            duration="1:00:12"
            title="midnight."
            channel="Sole space"
            views="12 k views"
            published="2 weeks ago"
          />
          <VideoCard         /* ← 100 % hard‑coded props */
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            thumbnail="https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg"
            duration="1:00:12"
            title="midnight."
            channel="Sole space"
            views="12 k views"
            published="2 weeks ago"
          />
          <VideoCard         /* ← 100 % hard‑coded props */
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            thumbnail="https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg"
            duration="1:00:12"
            title="midnight."
            channel="Sole space"
            views="12 k views"
            published="2 weeks ago"
          />
          <VideoCard         /* ← 100 % hard‑coded props */
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            thumbnail="https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg"
            duration="1:00:12"
            title="midnight."
            channel="Sole space"
            views="12 k views"
            published="2 weeks ago"
          />
            {/* <VideoCard />
            <VideoCard />
            <VideoCard /> */}
          </div>
        </div>

      </div>
    </div>

  );
}
