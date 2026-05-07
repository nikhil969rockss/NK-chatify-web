import type { Socket } from "socket.io";
import cookie from "cookie";

import { verifyToken } from "../lib/token";
import { getUserByIdWithoutPassword } from "../services/user.service";

export const socketAuthMiddleware = async (socket: AuthSocket, next: any) => {
  try {
    const cookieString = socket.handshake.headers.cookie;

    if (!cookieString) {
      return next(new Error("Unauthorized, Please login first"));
    }
    const cookies = cookie.parse(cookieString);

    const token = cookies?.token;

    if (!token) {
      return next(new Error("Unauthorized, Token is missing"));
    }
    const decodedToken = verifyToken({ token }) as { userId: string };

    const user = await getUserByIdWithoutPassword(decodedToken?.userId);

    if (!user) {
      return next(new Error("Unauthorized, User not found"));
    }

    socket.user = user;
    socket.userId = String(user._id);

    console.log(`Socket authenticated for user ${user.fullName} (${user._id})`);

    next();
  } catch (error) {
    console.log("Error in socket authentication", error);
    next(new Error("Uauthentication failed"));
  }
};
