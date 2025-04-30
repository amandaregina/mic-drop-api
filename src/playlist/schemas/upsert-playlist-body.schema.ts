import z from 'zod';

export const upsertPlaylistBodySchema = z.object({
  title: z.string(),
  artist: z.string(),
});
