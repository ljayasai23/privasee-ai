import chromium from "@sparticuz/chromium";
import puppeteer, { Browser } from "puppeteer-core";
import { TechnicalData } from "../models/PrivacyReport";

export async function scrapeWebsite(url: string): Promise<TechnicalData> {
  const isDev = process.env.NODE_ENV === "development";
  
  let browser: Browser;
  if (isDev) {
    const localPuppeteer = require("puppeteer");
    browser = await localPuppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
  } else {
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: { width: 1920, height: 1080 },
      executablePath: await chromium.executablePath(),
      headless: true,
    });
  }
  
  const page = await browser.newPage();
  let securityHeaders: Record<string, string> = {
    'Content-Security-Policy': 'Missing',
    'Strict-Transport-Security': 'Missing',
    'X-Frame-Options': 'Missing',
  };

  page.on('response', (response) => {
    // Capture headers from the main document navigation
    if (response.url() === url || response.url() === url + '/') {
      const headers = response.headers();
      securityHeaders = {
        'Content-Security-Policy': headers['content-security-policy'] || 'Missing',
        'Strict-Transport-Security': headers['strict-transport-security'] || 'Missing',
        'X-Frame-Options': headers['x-frame-options'] || 'Missing',
      };
    }
  });

  await page.goto(url, { waitUntil: "networkidle2" });

  // Extract cookies
  const cookies = await page.cookies();
  const cookieData = cookies.map(c => ({
    name: c.name,
    domain: c.domain,
    expires: c.expires > -1 ? new Date(c.expires * 1000).toISOString() : 'Session'
  }));

  // Extract scripts
  const scripts = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("script"))
      .map(script => script.src)
      .filter(src => src.length > 0);
  });

  await browser.close();

  return {
    targetUrl: url,
    securityHeaders,
    cookies: cookieData,
    scripts,
  };
}
