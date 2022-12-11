//https://app.uberduck.ai/leaderboard/voice
export const randomVoice = () => {
  const choice = Math.floor(Math.random() * 14);
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
  return voices[choice] || "cr1tikal";
};

export const randomQuote = () => {
  const choice = Math.floor(Math.random() * 10);
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
  return quotes[choice] || "This quote was not generated properly";
};
