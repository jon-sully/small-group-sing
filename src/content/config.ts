import { defineCollection, reference, z } from "astro:content";

const setlists = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string().min(1),
    date: z.string().transform((s) => new Date(s)),
    songs: z.array(reference("songs")),
  }),
});

const songCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().min(1),
    artist: z.string().min(1),
  }),
});

export const collections = {
  setlists,
  songs: songCollection,
};
