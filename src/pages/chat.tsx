import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { trpc } from "../utils/trpc";
// import ChatTextArea from "./api/components/ChatTextArea";
import { randomQuote, randomVoice } from "./api/components/randomTools";

const Chat: NextPage = () => {
  const [quote, setquote] = useState<string>(randomQuote());
  const [voice, setVoice] = useState<string>(randomVoice());

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
    const audio = new Audio(data.path);
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
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center mt-40 justify-center gap-3 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Chat With AI
          </h1>
          <h2 className="text-lg tracking-tight text-gray-300 sm:text-[1rem]">
            By Ryan Coppa
          </h2>
          <h3 className="w-2/3 text-center text-xs font-bold tracking-tight text-gray-200 sm:text-[1rem]">
            Welcome to my AI Text-to-speech project! Right now the capability of
            this tool will be limited to random quotes and random voices from a
            pre-determined list, however stay tuned because a lot more custom
            functionality is coming soon!
          </h3>
        </div>
        {/* <ChatTextArea setVoice={setVoice} /> */}
        <div className="container flex flex-col items-center justify-center gap-7">
          {!isLoading && (
            <button
              className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
              onClick={() => getAudio()}
            >
              Load New Random Audio
            </button>
          )}

          {data?.path === null ? (
            <div className="text-center">
              <div className="text-lg font-extrabold tracking-tight px-2 text-white sm:text-[1.5rem]">
                Error Generating Audio, Please Try Again!
              </div>
              <div className="text-xs tracking-tight px-10 text-gray-300 sm:text-[0.75rem]">
                If this persists, there may be an issue with rate limiting so try again later!
              </div>
            </div>
          ) : isLoading ? (
            <div className="text-lg font-extrabold tracking-tight text-white sm:text-[1.5rem]">
              Loading Audio Data...
            </div>
          ) : (
            <button
              className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
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
