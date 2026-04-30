import z from "zod";
import ApiError from "./ApiError";

type signupData = {
  fullName: string;
  email: string;
  password: string;
};

export const validateSignup = (incomingData: signupData) => {
  if (!incomingData.fullName || !incomingData.email || !incomingData.password) {
    throw new ApiError(400, "Full name, email and password are required");
  }

  const schema = z.object({
    fullName: z
      .string()
      .min(3, { error: "Name must be at least 3 characters" })
      .max(50, { error: "Name must be at most 50 characters" }),
    email: z.email({ error: "Please enter a valid email address" }),
    password: z
      .string()
      .min(6, { error: "Password must be at least 6 characters" }),
  });

  const { success, data, error } = schema.safeParse(incomingData);
  if (!success) {
    throw new ApiError(
      400,
      "validation failde",
      z.treeifyError(error).properties,
    );
  }
  return data;
};
