import jwt from "jsonwebtoken";

 const getDataFromToken = (request) => {
  try {
    const token = request.cookies.get("utoken")?.value || "";
    if (!token) return null;

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Make sure your token has an `id` or `userId` field
    return decodedToken.id
  } catch (error) {
    console.error("JWT Error:", error.message);
    return null; // just return null instead of NextResponse
  }
};

export default getDataFromToken;
