import Image from "next/image";
import { StarsBackground } from "@/components/animate-ui/stars-background";
import { GradientBackground } from "@/components/animate-ui/gradient-background";
import { HexagonBackground } from "@/components/animate-ui/hexagon-background";
import { TypingText } from "@/components/animate-ui/typing-text";
import { HighlightText } from "@/components/animate-ui/highlight-text";
import { GradientText } from "@/components/animate-ui/gradient-text";
import {
  Button,
  Buttons,
  Input,
  InputButton,
  SubmitButton,
} from '@/components/animate-ui/input-button';
import { Container, Flex } from "@radix-ui/themes";
import Pastexample from "@/components/pastexample";
export default function Home() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "20px 1fr 20px",
        /* shorthand for justifyItems + alignItems */
        minHeight: "90vh", /* pb‑20 */  /* gap‑16 */
        fontFamily: "var(--font-geist-sans)",
        
      }}
    >
      <div
        style={{
          marginTop: "8vh",
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
        <GradientText className="text-4xl font-bold" text="AmaTube Protocol" />
        <text style={{
          marginTop: "50px",
          fontSize: "16px",
          color: "#d1d5db",
        }}>
          Will analyze the video and automating the purchasing process
        </text>
        <div style={{
          width: "50%",
          minHeight: "20vh",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

        }}>

          <InputButton>
            <Buttons>
              <Button>
                <text style={{
                  fontSize: "16px",
                  color: "#d1d5db",
                }}>
                  Analyze the video
                </text>
              </Button>
              <SubmitButton>Submit</SubmitButton>
            </Buttons>
            <Input type="email" placeholder="Youtube URL" width="100vw" height="20vh"/>
          </InputButton>
        </div>
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
        }}>
          <Pastexample />
          <Pastexample />
          <Pastexample />
          <Pastexample />
        </div>
      </div>

    </div>

  );
}
