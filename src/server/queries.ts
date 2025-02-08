import { auth } from "@clerk/nextjs/server";
import "server-only";

export const getUserHoroscope = async () => {
  const user = await auth();
  if (!user.userId) {
    throw new Error("User not found");
  }
};
