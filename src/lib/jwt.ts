import jwt, { JwtPayload } from "jsonwebtoken";

interface SignOption {
  expiresIn?: number | string;
}

const DEFAULT_SIGN_OPTION = {
  expiresIn: "1h",
};

export function signJwtAcessToken(
  payload: JwtPayload,
  option: SignOption = DEFAULT_SIGN_OPTION
) {
  const secret = process.env.SECRET;
  return jwt.sign(payload, secret!, option);
}

export function verifyJwtAcessToken(token: string) {
  try {
    const secret = process.env.SECRET;
    const decoded = jwt.verify(token, secret!);
    return decoded as JwtPayload;
  } catch (err) {
    console.log(err);
    return null;
  }
}
