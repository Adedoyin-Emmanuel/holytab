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

  public startYear = 2024;
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

  public moreConfessions = [
    `
      I am born of God, and I walk in victory in every area of my life. I am justified freely by the blood of Jesus, living a life free from condemnation, guilt, and shame. I operate in uncompromised dominion everywhere I go and in all things I do.

      I dwell perpetually under God’s grace; therefore, sin, sickness, and lack cannot dominate me. My focus is steadfastly fixed on Jesus, and through Him, I receive an unending supply of grace in all situations. I am never overwhelmed because I have His strength and wisdom.

      I am secure in the unfailing love of God, and I am completely free from every form of satanic oppression. I discern the secrets of this season, and they are evident in the way I live my life. I am successful, prosperous, and flourishing in every aspect of my life.

      Everything is happening fast around me, and I am dripping blessings everywhere I go. Yes indeed, it won’t be long now—GOD’s Decree! “Things are going to happen so fast my head will swim, one thing fast on the heels of the other. I won’t be able to keep up! Everything will be happening at once—and everywhere I look, blessings! Blessings like wine pouring off the mountains and hills.”

      I am finishing this year strongly and remarkably—with renewed vision, supernatural energy, overflowing grace, extraordinary speed, and unspeakable joy. I am positioned under the intense rain of God’s blessings!

    `,
  ];

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
      if (year === 2023) continue;

      for (let month of this.months) {
        try {
          await this.scrapeConfessionPerMonth(month, year);
        } catch (error: any) {
          console.log(
            `An error occurred while scraping confessions for ${month} ${year}: ${error.message}`
          );
        }
      }
    }

    console.log("All confessions have been scraped and saved to data.json");
  }

  public async scrapePublicConfessions() {
    for (const confessions of this.moreConfessions) {
      await this.formatDataAndWriteToJSON(confessions);
    }
  }
}
