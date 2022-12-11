import { type NextPage } from "next";
import Head from "next/head";
import { useRef, useState } from "react";
import { trpc } from "../utils/trpc";
import { randomQuote, randomVoice } from "./api/components/randomTools";

const Chat: NextPage = () => {
  const [quote, setquote] = useState<string>(randomQuote());
  const [voice, setVoice] = useState<string>(randomVoice());

  const button = useRef<HTMLButtonElement>(null);
  const { data, isLoading } = trpc.audio.getVoiceUrl.useQuery({
    text: quote,
    voice: voice,
    pace: 1,
  });

  const getAudio = () => {
    setquote(randomQuote());
    setVoice(randomVoice());
  };

  const playAudio = () => {
    const audio = new Audio(data);
    audio.volume = 0.2;
    audio.play();
  };

  return (
    <>
      <Head>
        <title>Chat With AI</title>
        <meta name="description" content="Experience Text-To-Speech With AI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Chat With AI
          </h1>
          {!isLoading && (
            <button
              className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
              ref={button}
              onClick={() => getAudio()}
            >
              Load New Audio
            </button>
          )}

          {isLoading ? (
            <div className="text-lg font-extrabold tracking-tight text-white sm:text-[1.5rem]">
              Loading Audio Data...
            </div>
          ) : (
            <button
              className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
              ref={button}
              onClick={() => playAudio()}
            >
              Play
            </button>
          )}
        </div>
      </main>
    </>
  );
};

export default Chat;
