'use strict'

const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const { html } = require("cheerio");
const { error } = require("console");

const file = fs.createWriteStream("file.csv");

request("https://www.oxfordlearnersdictionaries.com/wordlists/oxford3000-5000", (error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        $(".top-g > li > a").each((i, el) => {
            const word = $(el).text();

            file.write(word + "\n");
        });
    }
});