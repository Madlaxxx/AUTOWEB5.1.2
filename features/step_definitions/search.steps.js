const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const { clickElement, getText } = require("../../lib/commands.js");
// const { setDefaultTimeout } = require("@cucumber/cucumber");
// setDefaultTimeout(60 * 1000);

Before(async function () {
  const browser = await puppeteer.launch({ 
      headless: false, 
      slowMo: 50 
    });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on page {string}", async function (string) {
  return await this.page.goto(`${string}`, {
    setTimeout: 50000,
  });
});

When("user choose date", async function () {
  return await clickElement(this.page, "body nav a:nth-child(2)");
});
When("user choose date that has been choosen earlier", async function () {
    return await clickElement(this.page, "body nav a:nth-child(2)");
  });
When("user choose time of a movie", async function () {
  return await clickElement(this.page, "body main section:nth-child(2) div:nth-child(3) ul li a");
});
When("user choose time of a movie that has been choosen earlier", async function () {
    return await clickElement(this.page, "body main section:nth-child(2) div:nth-child(3) ul li a");
  });
When("user choose a first sit", async function () {
  return await clickElement(
    this.page,
    ".buying-scheme__wrapper div:nth-child(5) span:nth-child(9)"
  );
});
When("user choose a second sit", async function () {
  return await clickElement(
    this.page,
    ".buying-scheme__wrapper div:nth-child(2) span:nth-child(8)"
  );
});
When("user choose a sit", async function () {
  return await clickElement(
    this.page,
    ".buying-scheme__wrapper div:nth-child(1) span:nth-child(7)"
  );
});
When("user choose a sit that has been choosen earlier", async function () {
  return await clickElement(
    this.page,
    ".buying-scheme__wrapper div:nth-child(1) span:nth-child(7)"
  );
});
When("user click on the booking button", async function () {
  return await clickElement(this.page, "button.acceptin-button");
});
When("user click on the button to get booking code", async function () {
  return await clickElement(this.page, "button.acceptin-button");
});

Then("user get the code and text {string}", async function (string) {
  const actual = await getText(this.page, "h2.ticket__check-title");
  const expected = await string;
  expect(actual).contains(expected);
});

Then("button for booking is inactive {string}", async function (string) {
  const actual = String(
    await this.page.$eval("button", (button) => {
      return button.disabled;
    })
  );
  const expected = await string;
  expect(actual).contains(expected);
});