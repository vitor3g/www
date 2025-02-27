import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { omit } from "lodash";

const prisma = new PrismaClient();

export default CredentialsProvider({
  name: "Credentials",
  credentials: {
    email: { label: "Email", type: "text" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    if (!credentials?.email || !credentials?.password) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { email: credentials.email },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        password: true,
      },
    });

    if (!user) {
      return null;
    }

    const isValidPassword = user?.password
      ? bcrypt.compareSync(credentials.password, user.password)
      : false;

    if (isValidPassword) {
      return omit(user, "password");
    } else {
      return null;
    }
  },
});
