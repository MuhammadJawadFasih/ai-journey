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
    <div className="border border-gray-800 rounded-lg p-4 flex flex-col gap-3 max-w-2xl w-full">
      <div className="flex flex-col gap-2 max-h-80 overflow-y-auto">
        {messages.length === 0 && (
          <p className="text-gray-500 text-sm">Ask my agent something...</p>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={`text-sm ${m.role === "user" ? "text-blue-400" : "text-gray-200"}`}
          >
            <span className="font-semibold">{m.role === "user" ? "You: " : "Agent: "}</span>
            {m.parts[0].text}
          </div>
        ))}
        {loading && <p className="text-gray-500 text-sm">Agent is thinking...</p>}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 bg-gray-900 border border-gray-700 rounded px-3 py-2 text-sm text-gray-100 outline-none"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-4 py-2 rounded disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}