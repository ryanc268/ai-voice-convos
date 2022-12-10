import axios from "axios";
import { type NextPage } from "next";
import Head from "next/head";
import { useRef } from "react";
import { env } from "../env/client.mjs";

const Chat: NextPage = () => {
  const loading = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  const generateAudioUUID = () => {
    loading!.current!.innerHTML = "Loading...";
    button!.current!.disabled = true;

    axios
      .post(
        "https://api.uberduck.ai/speak",
        {
          speech: randomQuote(),
          voice: randomVoice(),
          pace: 1,
        },
        {
          headers: {
            accept: "application/json",
            "uberduck-id": "anonymous",
            "content-type": "application/json",
            authorization:
              "Basic " +
              Buffer.from(
                env.NEXT_PUBLIC_UBERDUCK_KEY +
                  ":" +
                  env.NEXT_PUBLIC_UBERDUCK_SECRET
              ).toString("base64"),
          },
        }
      )
      .then((response) => response.data)
      .then((data) => fetchAudioUrl(data.uuid));
  };

  const fetchAudioUrl = (uuid: string) => {
    let finishedAt: any = null;
    let audioPath: any = null;

    const interval = setInterval(() => {
      axios
        .get("https://api.uberduck.ai/speak-status", {
          params: { uuid },
        })
        .then((response) => response.data)
        .then((data) => {
          finishedAt = data.finished_at;
          audioPath = data.path;
        });
      if (finishedAt) {
        window.clearInterval(interval);
        playAudio(audioPath);
      }
    }, 2000);
  };

  const playAudio = async (audioPath: string) => {
    console.log("Audio Url", audioPath);
    const audio = new Audio(audioPath);
    audio.volume = 0.2;
    audio.play();
    loading!.current!.innerHTML = "Playing!";
    setTimeout(() => {
      button!.current!.disabled = false;
      loading!.current!.innerHTML = "Click to chat";
    }, 4000);
  };

  //https://app.uberduck.ai/leaderboard/voice
  const randomVoice = () => {
    const choice = Math.floor(Math.random() * 14);
    console.log("Voice Choice", choice);
    const voices: string[] = [
      "cr1tikal",
      "kanye-west-rap",
      "walter-white",
      "mario-sports-mix",
      "peter-griffin",
      "patrick",
      "the-rock",
      "mr-krabs",
      "biggie-smalls",
      "vader",
      "mickey-mouse",
      "eminem-arpa2",
      "naruto-uzumaki",
      "nicki",
    ];
    console.log("Playing", voices[choice]);
    return voices[choice];
  };

  const randomQuote = () => {
    const choice = Math.floor(Math.random() * 10);
    console.log("Quote Choice", choice);
    const quotes: string[] = [
      "Mesa cause one, two-y little bitty axadentes, huh? Yud say boom de gasser, den crashin der bosses heyblibber, den banished.",
      "Yo, Taylor, I'm really happy for you, I'mma let you finish, But Beyoncé had one of the best videos of all time! One of the best videos of all time!",
      "As you get older, boobs will start becoming a major part of your life. But you can't let them get in the way of your friends. There are a lot of boobs out there. But they're just boobs. Your friends are forever.",
      "Oh, I'm a goofy goober, yeah! You're a goofy goober, yeah! We're all goofy goobers, yeah! Goofy goofy goober goober, yeah!",
      "His palms are sweaty, knees weak, arms are heavy. There's vomit on his sweater already, mom's spaghetti.",
      "Damn you, vile woman! You've impeded my work since the day I escaped from your wretched womb.",
      "Hey, how about a little less questions and a little more shut the hell up?",
      "I just want to lie on the beach and eat hot dogs",
      "Sometimes I'll start a sentence and I don't even know where it's going. I just hope I find it along the way",
      "He was a skater boy, She said, 'See you later, boy'. He wasn't good enough for her.",
    ];
    return quotes[choice];
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
          <button
            className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
            ref={button}
            onClick={() => generateAudioUUID()}
          >
            Chat
          </button>
          <div
            className="text-lg font-extrabold tracking-tight text-white sm:text-[1.5rem]"
            ref={loading}
          >
            Click to chat
          </div>
        </div>
      </main>
    </>
  );
};

export default Chat;
