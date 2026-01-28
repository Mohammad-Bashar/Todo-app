import jwt from "jsonwebtoken";

export const generateTokenAndSaveInCookies = (userId, res) => {
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET_KEY,   // ✅ ONE SECRET NAME
    { expiresIn: "10d" }
  );

  // OPTIONAL cookie (won’t break if blocked)
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,          // ✅ REQUIRED for HTTPS
    sameSite: "None",      // ✅ REQUIRED cross-origin
    path: "/",
  });

  return token;
};
