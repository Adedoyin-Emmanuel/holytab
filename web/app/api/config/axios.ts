import axios from "axios";

const KINGSWORD_CHICAGO_URL = "https://chicago.kingsword.org";

export const Axios = axios.create({
  baseURL: KINGSWORD_CHICAGO_URL,
  headers: {
    "Content-Type": "application/json",
  },
});



