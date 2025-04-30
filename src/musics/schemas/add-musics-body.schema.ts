import z from 'zod';

export const addMusicsBodySchema = z.object({
  title: z.string(),
  artist: z.string(),
  genre: z.string().optional(),
  duration: z.string().optional(),
});
