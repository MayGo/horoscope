import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().min(1),
        customer_id: z.string().min(1),
        p_countryOfBirth: z.string().min(1),
        p_dateOfBirth: z.string().min(1),
        p_horoscopeLength: z.string().min(1),
        p_timeOfBirth: z.string().min(1),
        price_id: z.string().min(1),
        subscription_id: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.create({
        data: {
          name: input.name,
          email: input.email,
          customer_id: input.customer_id,
          p_countryOfBirth: input.p_countryOfBirth,
          p_dateOfBirth: input.p_dateOfBirth,
          p_horoscopeLength: input.p_horoscopeLength,
          p_timeOfBirth: input.p_timeOfBirth,
          price_id: input.price_id,
          subscription_id: input.subscription_id,
        },
      });
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.user.findFirst({
      orderBy: { createdAt: "desc" },
    });

    return post ?? null;
  }),
});
