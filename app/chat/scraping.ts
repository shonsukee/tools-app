import puppeteer from "puppeteer-core";

// スクレイピングするための関数
async function scrapeNHK(url: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const results = await page.$eval(
    "div.body-text, p",
    (element) => element.textContent
  );
  const mergedSentence = results;
  console.log(mergedSentence);
  await browser.close();

  return mergedSentence;
}

export default scrapeNHK;
