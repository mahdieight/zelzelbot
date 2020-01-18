const axios = require('axios');
const cheerio = require('cheerio')
const fs = require('fs');
const HtmlTableToJson = require('html-table-to-json');
var jsonDiff = require('json-diff')

const TelegramBot = require('node-telegram-bot-api');
const token = 'YOUR ROBOT TOKEN';
const chatID = 'CHAT ID';
const bot = new TelegramBot(token);


function writeInFiel(theFile, content) {
    fs.writeFile(theFile, content, function (err) {
        if (err) {
            return console.log(err);
        }
    });
}
function scanSite() {
    var lastExportFile = "./last.html";
    try {
        axios.get("http://irsc.ut.ac.ir/index.php?lang=fa")
            .then(function (response) {
                var htmlExport = response.data;
                const $ = cheerio.load(htmlExport)
                var table = $('#AutoNumber3 > tbody > tr > td:nth-child(3) > center');
                if (fs.existsSync(lastExportFile)) {
                    const newTableJson = new HtmlTableToJson(table.html());
                    const oldTableJson = new HtmlTableToJson(fs.readFileSync(lastExportFile).toString());

                    var isDiffrent = jsonDiff.diff(newTableJson.results, oldTableJson.results);
                    if (typeof (isDiffrent) != "undefined") {
                        fs.writeFileSync("./diff.json", JSON.stringify(isDiffrent));
                        var itemsForSend = null;

                        isDiffrent[0][1].forEach(function (elem) {
                            if (elem[0] === "-" && itemsForSend === null) {
                                itemsForSend = elem;
                            }
                        });
                        if (itemsForSend != null) {
                            itemsForSend.forEach(function (news) {
                                if (typeof news === 'object') {
                                    var location = news[6];
                                    var greatness = news[2];
                                    var time = news[1];
                                    var msg = " فوری " + "زلزله جدیدی در " + location + " به بزرگی  " + greatness + "ریشتر در " + time + "به وقوع پیوست. "
                                    bot.sendMessage(chatID, msg);
                                }
                            });
                        }
                        writeInFiel(lastExportFile, table.html());
                    }
                } else {
                    writeInFiel(lastExportFile, table.html());
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    catch (err) {
        console.log(err);
    }

}


setInterval(scanSite, 6000);
