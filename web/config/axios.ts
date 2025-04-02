import axios from "axios";

export const Axios = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_API_URL
      : "http://localhost:3002/api",
  withCredentials: true,
});
