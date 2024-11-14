import jwt from "jsonwebtoken";

export const generateJWTToken = (
  userInfo: {
    userId: number;
    userName: string;
  },
  remember?: boolean
) => {
  const jwtTokenExpirationDate = process.env.JWT_TOKEN_EXPIRATION_DATE;
  const jwtTokenRefreshExpirationDate =
    process.env.JWT_REMEMBER_TOKEN_EXPIRATION_DAT;

  const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: remember ? "256h" : jwtTokenExpirationDate,
  });

  const refreshToken = jwt.sign(userInfo, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: jwtTokenRefreshExpirationDate,
  });

  const now = new Date().getTime();

  return {
    accessToken,
    refreshToken,
    tokenExpiresIn: new Date(
      now + +(jwtTokenExpirationDate ?? 100) * 1000
    ).getTime(),
    rememberTokenExpiresIn: new Date(
      now + +(jwtTokenRefreshExpirationDate ?? 1000) * 1000
    ).getTime(),
  };
};