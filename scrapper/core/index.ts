import BaseScrapper from "./base";
import * as cheerio from "cheerio";
import fs from "fs";
import * as _ from "lodash";
import path from "path";

export default class ConfessionScrapper extends BaseScrapper {
  public months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  public startYear = 2023;
  public endYear = 2024;

  constructor() {
    super();
  }

  public async get(url: string) {
    try {
      const response = await this.scrapper.get(url);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async scrapeConfessionPerMonth(month: string, year: number) {
    const url = `/${month.toLowerCase()}-${year}-confession`;
    const data = await this.get(url);

    console.log("_________________Scraping confessions___________________");
    console.log(`Scraping ${month} ${year} confessions from ${url}`);

    const result = await this.processHTMLEntities(data);

    await this.formatDataAndWriteToJSON(result);
  }

  public async processHTMLEntities(entity: string) {
    const $ = cheerio.load(entity);

    const container = $("div.elementor-widget-container");

    const confession = container.find("p").text();

    return confession;
  }

  public async formatDataAndWriteToJSON(confessions: string) {
    let affirmations: string[] = _.split(confessions, ". I").map(
      (sentence) => `I ${sentence.trim()}.`
    );
    affirmations = affirmations.filter(Boolean);

    const dataPath = path.join(__dirname, "./../data/data.json");

    let existingData: any = { affirmations: [] };

    if (fs.existsSync(dataPath)) {
      const fileContent = fs.readFileSync(dataPath, "utf8");
      existingData = JSON.parse(fileContent);
    }

    existingData.affirmations.push(...affirmations);

    fs.writeFileSync(dataPath, JSON.stringify(existingData, null, 2), "utf8");
  }

  public async scrapeAllConfessions() {
    for (let year = this.startYear; year <= this.endYear; year++) {
      for (let month of this.months) {
        await this.scrapeConfessionPerMonth(month, year);
      }
    }

    console.log("All confessions have been scraped and saved to data.json");
  }
}
