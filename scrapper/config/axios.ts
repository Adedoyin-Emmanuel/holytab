import axios from "axios";
import { KINGSWORD_CHICAGO_URL } from "../constants";


export const KingswordScrapper = axios.create({
    baseURL: KINGSWORD_CHICAGO_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
