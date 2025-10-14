
import jwt from "jsonwebtoken";

export default function getAdminFromToken(request) {
  try {
    const token = request.cookies.get("atoken")?.value || "";
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return decoded.email; 
  } catch (error) {
    return null;
  }
}
