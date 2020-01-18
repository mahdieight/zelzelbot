# zelzelbot

#Telegram Robot - Receive the latest earthquakes in Iran

A simple step to get the latest earthquakes in Iran.

## 1. Install the used plugins
You must install the used extensions before running the original file (reader.js).


	npm i axios
    npm i cheerio
    npm i json-diff
    npm i node-telegram-bot-api
    npm i html-table-to-json
	
## 2-Set up a telegram robot token.
On line 8, set up your bot's token file reader.js
	
	const token = 'YOUR ROBOT TOKEN';
  
  
## 3-Set up a telegram chat id
On Line 9, set up target chat id or chanel id. for example ('@zelzelbot')
	
	const chatID = 'CHAT ID';

## 4-The final step
Run the file reader.js , by the following command
	
	node reader.js

  