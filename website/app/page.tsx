import ChatBox from "./ChatBox";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center px-6 py-20">
      <div className="max-w-2xl w-full space-y-12">

        {/* Header */}
        <section>
          <h1 className="text-4xl font-bold tracking-tight">
            Muhammad Jawad Fasih
          </h1>
          <p className="mt-3 text-lg text-gray-400">
            AI Intern @ FlyRank — learning the AI stack, building in public.
          </p>
        </section>

        {/* About */}
        <section>
          <h2 className="text-xl font-semibold mb-2 text-gray-200">About</h2>
          <p className="text-gray-400 leading-relaxed">
            I&apos;m documenting my journey learning applied AI and machine learning —
            from LLM APIs and RAG to shipping a real personal agent. This site tracks
            what I build along the way.
          </p>
        </section>

        {/* Projects */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-200">Projects</h2>
          <div className="space-y-4">
            <div className="border border-gray-800 rounded-lg p-4 hover:border-gray-600 transition">
              <h3 className="font-medium text-gray-100">FlyRank ML Internship</h3>
              <p className="text-sm text-gray-400 mt-1">
                Applied search intelligence — building models on real search ranking data.
              </p>
            </div>
            <div className="border border-gray-800 rounded-lg p-4 hover:border-gray-600 transition">
              <h3 className="font-medium text-gray-100">Personal AI Agent</h3>
              <p className="text-sm text-gray-400 mt-1">
                A working agent powered by Gemini — try it live below.
              </p>
            </div>
          </div>
        </section>

        {/* Live Agent */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-200">Talk to my agent</h2>
          <ChatBox />
        </section>

        {/* Links */}
        <section>
          <h2 className="text-xl font-semibold mb-2 text-gray-200">Links</h2>
          <div className="flex gap-4 text-gray-400">
            <a href="https://github.com/MuhammadJawadFasih" className="hover:text-white underline" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/muhammad-jawad-fasih-22703b33a" className="hover:text-white underline" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </section>

      </div>
    </main>
  );
}