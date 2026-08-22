"use client";

import { useState } from "react";

type Message = { role: "user" | "model"; parts: { text: string }[] };

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", parts: [{ text: input }] };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, history: messages }),
      });

      const data = await res.json();

      if (data.error) {
        setMessages([...newMessages, { role: "model", parts: [{ text: `Error: ${data.error}` }] }]);
      } else {
        setMessages([...newMessages, { role: "model", parts: [{ text: data.reply }] }]);
      }
    } catch {
      setMessages([...newMessages, { role: "model", parts: [{ text: "Something went wrong." }] }]);
    }

    setLoading(false);
  }

  return (
    <div className="bg-[#171D2B] border border-[#2A3040] rounded-md p-5 flex flex-col gap-4">
      <div className="flex flex-col gap-3 max-h-72 overflow-y-auto pr-1">
        {messages.length === 0 && (
          <p className="font-[family-name:var(--font-mono)] text-xs text-[#8890A0]">
            $ waiting for input...
          </p>
        )}
        {messages.map((m, i) => (
          <div key={i} className="text-sm leading-relaxed">
            <span
              className={`font-[family-name:var(--font-mono)] text-xs mr-2 ${
                m.role === "user" ? "text-[#E8A33D]" : "text-[#8890A0]"
              }`}
            >
              {m.role === "user" ? "you >" : "agent >"}
            </span>
            <span className="text-[#EDEAE2]">{m.parts[0].text}</span>
          </div>
        ))}
        {loading && (
          <p className="font-[family-name:var(--font-mono)] text-xs text-[#8890A0]">
            agent &gt; thinking
            <span className="animate-blink">...</span>
          </p>
        )}
      </div>

      <div className="flex gap-2 pt-1 border-t border-[#2A3040]">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 bg-transparent pt-3 text-sm text-[#EDEAE2] placeholder-[#5C6373] outline-none font-[family-name:var(--font-mono)]"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="mt-3 mb-0.5 bg-[#E8A33D] hover:bg-[#F0B558] text-[#0F1420] text-xs font-semibold uppercase tracking-wide px-4 py-2 rounded disabled:opacity-40 transition-colors h-fit"
        >
          Send
        </button>
      </div>
    </div>
  );
}