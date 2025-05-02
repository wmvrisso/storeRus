import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "yourSuperSecret";
const expiration = "2h";

export const signToken = ({ username, _id }) => {
  const payload = { username, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

export const authMiddleware = ({ req }) => {
  let token = req.headers.authorization || "";

  if (token.startsWith("Bearer ")) {
    token = token.slice(7);
  }

  try {
    const { data } = jwt.verify(token, secret);
    req.user = data;
  } catch {
    req.user = null;
  }

  return { user: req.user };
};
