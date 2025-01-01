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
    I am grateful to God for the redemption made available to me in Christ Jesus and for all the victories and breakthroughs of the past year. 

    Indeed, God, who has been on my side, has been my strength, my fortress, and my refuge. Blessed be the LORD, who has not given me as prey to the teeth of the enemy of my soul.

    I start this year fully conscious of the righteous nature given to me in Christ Jesus. I stand before God without any sense of guilt, shame, or condemnation. 

    I am eternally forgiven through the blood of Jesus and drenched in His grace. I am bold and fearless and enjoy all-around dominion through the abundance of grace and the gift of righteousness.

    I am loved by God, blessed to be a blessing, favoured for exceptional results, and anointed for a fruitful life. Sicknesses, lack, and every form of danger are forbidden in and around me throughout 2025. I am satisfied with a healthy, long, productive, and purposeful life.

    In 2025, I am focused on Jesus, His finished work, and His assignment for my life. I am free from all distractions, and I run my race with patience and full momentum, even as I lay aside every encumbrance and the sin that so easily entangles me.

    The abundance of God’s rain is over my household and church community. I am positioned for uncommon harvests through this rain, and I walk in an unusual increase in every aspect of my life. I am impactful, prosperous, and consistently manifest the goodness of God in my space. 

    I am fully drenched in the abundance of God’s rain, and I drip His glory everywhere. I am a carrier of His presence, and I am a solution provider to my world. I am a light that shines in darkness, and I am a city set on a hill that cannot be hidden.
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
