import { KingswordScrapper } from "../config/axios";

export default class BaseScrapper {
  protected scrapper = KingswordScrapper;

  constructor() {
    this.scrapper.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
}
