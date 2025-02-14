# Horoscope App

## TODO

- [x] Add a horoscope home page
- [x] Add a personalization benefits page
- [x] Add a form personalization page
- [x] Generate horoscope with open AI based on personalization
- [x] Add CRON to generate daily horoscpe to db
- [x] Show daily horoscope on home page
- [x] Send email to user with horoscope
- [x] Add cron to send horoscope to user daily at configured time
- [x] Add my horoscope page
- [x] Add Loaders
- [x] Redesign daily horoscope to include affirmations and daily insights
- [x] Add previous days daily insights to horoscope generation, so we get different horoscopes each day
- [x] Fix personalization
- [x] Add timezone to email sending time
- [x] User horoscope keyed by day
- [x] Keep horoscopes for 7 days in redis
- [ ] Optimize cron jobs if user base grows

## Tech Stack

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

- [Next.js](https://nextjs.org)
- [Drizzle](https://orm.drizzle.team/)
- [Clerk](https://clerk.com/docs/quickstarts/nextjs)
- [OpenAI](https://openai.com/api/)
- [Redis](https://redis.io/)
- [Chakra UI](https://chakra-ui.com/)
- [Next-Safe-Action](https://next-safe-action.com/)
- [Vercel](https://vercel.com/)
- [Supabase](https://supabase.com/)
- [React Email](https://react.email/)
- [Resend](https://resend.com/)

## Environment Variables

The following environment variables need to be configured:

- **Database**: Use Supabase with Supavisor for connection pooling
- **Authentication**: Clerk.com for user management
- **AI**: OpenAI API for horoscope generation
- **Caching**: Upstash Redis for temporary storage
- **Email**: Resend.com for transactional emails
- **Cron Jobs**: Vercel-edge configured cron tasks

See `.env.example` for complete configuration reference. Get credentials from respective service dashboards.

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
