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
    `I am the righteousness of God in Christ Jesus, blessed of the Lord and surrounded with favor as a shield. The finished work of Christ on the cross is my reality, so I take the posture of rest, ruling, and reigning in life.

God is able to make me overflow with grace. I have divine grace for the different aspects of my life. God's grace is my sufficiency in all things. I have received the gift of God's grace, and by this grace, I excel in all aspects of my life.

Lines are fallen unto me in pleasant places. My talents and skills find great expression in life because I am endowed with the grace of God. The favor of God positions me for greatness in life. I am desired by kings and nobles who are connected to my assignment in life.

I have uncommon opportunities, am unusually preferred, and enjoy acceptance with men relevant to my purpose in life. I have assets in choice places, engage in strategic, profitable investments, and my gifts are embraced in the palaces connected to my destiny.

Goshen is my reality. I am loved by God, blessed everywhere, relevant in my generation, and positioned for greatness. I am under God’s intense rain and my church community enjoys great grace and flows in great power.`,

    `
I am born of God, full of His Spirit, seated with Him in majesty and empowered for victorious living. I am justified by the blood of Jesus, enjoy unrestricted access to God, and constantly draw grace for an exceptional lifestyle.

I have the spirit of excellence. 
I am blessed by God to excel above every limitation in this life. 

The empowerment to succeed, excel, and prosper is continually at work in my life. I fulfill my God ordained purpose impacting humanity and glorifying God.

I have uncommon capacity in God to produce uncommon results. I manifest supernatural wisdom in all aspects of my life. I stand out in life as I represent God everywhere. I am ten times better than my peers because of the supernatural edge I have in Christ.

I am resistant to mediocrity. I live a life that is above and beyond the average. I am a city built upon the hill that cannot be hidden. I am surrounded by relevant people called to play vital roles in my assignment on earth.

The cloud is full and the rain is here! 

It is Goshen all the way, and in the spirit of excellence, I display God to my world.`,

    `I excitedly welcome 2024, anticipating a heaven-on-earth experience for me, my household and my church community. I am positioned for uncommon supernatural encounters throughout the year. The darkness around the world is not permitted to impact my life and the people connected to me.

Goshen is my experience throughout this new year as I enjoy an intimate relationship with God. I dominate in every area of my life through Zoe, the God-kind of life. This life that I share with Christ imparts every area of my life, supplying me with a supernatural edge.

I am whole, healthy, protected and kept from all evil. My angels are actively engaged to bring my salvation benefits into manifestation. I enjoy supernatural opportunities, and I advance in life through the grace of God.

I am blessed, helped, favored, shielded and strengthened by God. I am the righteousness of God in Christ Jesus, and I am free from guilt, shame, fear and condemnation. I live from the place of rest, free from worldly cares, walking in faith and full of joy.

This is my year of Enlightenment and Supernatural Advancement. I recover the lost years, ideas and opportunities. I have wisdom and strategies for uncommon recoveries and breakthrough discoveries. I experience unending laughter, and I am free from sorrow. I am imparted with spiritual gifts to be resolutely aligned with God’s purpose, plans, and prophecies for my life.

I am supernaturally equipped and empowered for God’s purpose. Beyond being blessed, I am a blessing to humanity globally as I distribute resources as God’s agent on earth. My gifts and talents are maximized. I am propelled by favor to produce uncommon results in my allocated space. I take my place in God’s end-time agenda as a member of the Supernatural army, wired and designed for signs and wonders.`,

    `I am a man/woman of purpose created in God’s image to fulfill a unique destiny. I am fearfully, marvelously and wonderfully made. Therefore, I celebrate my uniqueness.

I have a revelation of my divine purpose. My gifts find adequate expression in life and they open great doors for me before great men. Every gift of God within me is constantly stirred up to release my destiny.

I am sensitive to the plan and counsel of God. I am strategically positioned in life for great success. I excel by the grace of God in all good things.

God predestined, justified, called and glorified me before the foundation of the world. There is a blue print from God for my life. I work with God, the Master builder. Therefore, I do not build in vain. I have a clear vision. I do not run wild in life. I am not easily discouraged, but I follow through with the plan of God for my life.

I am diligent in my business so I always stand before kings and not before ordinary men. I am a great blessing to my generation. My life is patterned after God’s original intention for me. All things are working together for my good. My future is bright and secure because God is on my side.`,
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
