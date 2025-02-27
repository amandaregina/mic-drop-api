import z from 'zod';

export const removeMusicBodySchema = z.object({
  title: z.string(),
  artist: z.string(),
});
