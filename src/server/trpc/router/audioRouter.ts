import { z } from "zod";
import axios from "axios";
import { env } from "../../../env/server.mjs";
import { router, publicProcedure } from "../trpc";

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
      return retrieveUrl(input.text, input.voice, input.pace);
    }),
  getVoiceUrlByUUID: publicProcedure
    .input(
      z.object({
        uuid: z.string(),
      })
    )
    .query(({ input }) => {
      return getAudioUrl(input.uuid);
    }),
});

const retrieveUrl = async (text: string, voice: string, pace: number) => {
  const uuid = await postCreatVoiceUUID(text, voice, pace);
  await new Promise((resolve) => setTimeout(resolve, 7000));
  const data = await getAudioUrl(uuid);
  const combinedData = { ...data, uuid };
  console.log(combinedData);
  return combinedData;
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
  const data = await axios
    .get("https://api.uberduck.ai/speak-status", {
      params: { uuid },
    })
    .then((response) => response.data);

  return data;
};
