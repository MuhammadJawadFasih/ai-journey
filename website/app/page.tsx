import ChatBox from "./ChatBox";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0F1420] text-[#EDEAE2] font-[family-name:var(--font-body)]">
      <div className="max-w-2xl mx-auto px-6 py-24 space-y-20">

        {/* Hero */}
        <section>
          <p className="font-[family-name:var(--font-mono)] text-xs tracking-widest text-[#E8A33D] uppercase mb-4">
            build log — live
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-5xl tracking-tight leading-[1.05]">
            Muhammad Jawad Fasih
            <span className="inline-block w-[3px] h-10 bg-[#E8A33D] ml-2 align-middle animate-blink" />
          </h1>
          <p className="mt-5 text-lg text-[#8890A0] max-w-md leading-relaxed">
            AI intern at FlyRank. Learning the AI stack, shipping in public,
            one commit at a time.
          </p>
        </section>

        {/* About */}
        <section className="border-l border-[#2A3040] pl-6">
          <div className="font-[family-name:var(--font-mono)] text-xs text-[#8890A0] mb-3">
            <span className="text-[#E8A33D]">a3f9c1e</span> · about
          </div>
          <p className="text-[#C8C4B8] leading-relaxed">
            I&apos;m documenting my journey learning applied AI and machine learning —
            from LLM APIs and RAG to shipping a real personal agent. This site is
            the changelog for everything I build along the way.
          </p>
        </section>

        {/* Projects */}
        <section className="border-l border-[#2A3040] pl-6">
          <div className="font-[family-name:var(--font-mono)] text-xs text-[#8890A0] mb-3">
            <span className="text-[#E8A33D]">7b2d84a</span> · projects
          </div>
          <div className="space-y-3">
            <div className="group bg-[#171D2B] border border-[#2A3040] rounded-md p-5 hover:border-[#E8A33D]/40 transition-colors">
              <h3 className="font-[family-name:var(--font-display)] text-lg text-[#EDEAE2]">
                FlyRank ML Internship
              </h3>
              <p className="text-sm text-[#8890A0] mt-1.5">
                Applied search intelligence — building models on real search
                ranking data.
              </p>
            </div>
            <div className="group bg-[#171D2B] border border-[#2A3040] rounded-md p-5 hover:border-[#E8A33D]/40 transition-colors">
              <div className="flex items-center gap-2">
                <h3 className="font-[family-name:var(--font-display)] text-lg text-[#EDEAE2]">
                  Personal AI Agent
                </h3>
                <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[#E8A33D] bg-[#E8A33D]/10 px-1.5 py-0.5 rounded">
                  live
                </span>
              </div>
              <p className="text-sm text-[#8890A0] mt-1.5">
                A working agent powered by Gemini — try it below.
              </p>
            </div>
          </div>
        </section>

        {/* Live Agent */}
        <section className="border-l border-[#2A3040] pl-6">
          <div className="font-[family-name:var(--font-mono)] text-xs text-[#8890A0] mb-3">
            <span className="text-[#E8A33D]">e41a9c0</span> · talk to my agent
          </div>
          <ChatBox />
        </section>

        {/* Links */}
        <section className="border-l border-[#2A3040] pl-6">
          <div className="font-[family-name:var(--font-mono)] text-xs text-[#8890A0] mb-3">
            <span className="text-[#E8A33D]">9927a51</span> · links
          </div>
          <div className="flex gap-5 text-sm">
            <a
              href="https://github.com/MuhammadJawadFasih"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C8C4B8] hover:text-[#E8A33D] transition-colors underline underline-offset-4 decoration-[#2A3040]"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/muhammad-jawad-fasih-22703b33a"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C8C4B8] hover:text-[#E8A33D] transition-colors underline underline-offset-4 decoration-[#2A3040]"
            >
              LinkedIn
            </a>
          </div>
        </section>

      </div>
    </main>
  );
}