import { ConvexHttpClient } from 'convex/browser';
import 'server-only';

export const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
