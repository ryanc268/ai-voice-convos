import { z } from "zod";
import axios from "axios";
import axiosRetry from "axios-retry";
import { env } from "../../../env/server.mjs";
import { router, publicProcedure } from "../trpc";

// axiosRetry(axios, {
//   retries: 3,
//   retryDelay: (retryCount) => {
//     console.log(`Get Audio Path attempt: ${retryCount}`);
//     return 2000;
//   },
// });

export const audioRouter = router({
  getVoiceUrl: publicProcedure
    .input(
      z.object({
        text: z.string(),
        voice: z.string(),
        pace: z.number(),
      })
    )
    .query(({ input }) => {
      const url = retrieveUrl(input.text, input.voice, input.pace).then(
        (url) => {
          console.log("Url sent to client: ", url);
          return url;
        }
      );
      return url;
    }),
});

const retrieveUrl = async (text: string, voice: string, pace: number) => {
  let uuid = await postCreatVoiceUUID(text, voice, pace);
  console.log("uuid", uuid);
  await new Promise((resolve) => setTimeout(resolve, 7000));
  let data = await getAudioUrl(uuid);
  return data;
};

const postCreatVoiceUUID = async (
  speech: string,
  voice: string,
  pace: number
) => {
  const { data } = await axios.post(
    "https://api.uberduck.ai/speak",
    {
      speech: speech,
      voice: voice,
      pace: pace,
    },
    {
      headers: {
        accept: "application/json",
        // "uberduck-id": "anonymous",
        "content-type": "application/json",
        authorization:
          "Basic " +
          Buffer.from(env.UBERDUCK_KEY + ":" + env.UBERDUCK_SECRET).toString(
            "base64"
          ),
      },
    }
  );

  return data.uuid;
};

const getAudioUrl = async (uuid: string) => {
  const path = await axios
    .get("https://api.uberduck.ai/speak-status", {
      params: { uuid },
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .then((data) => data.path);

  return path;
};
