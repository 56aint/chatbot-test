## Aim
To create an app to use with postman to carry out an API-test of the Natural Language Processing (NLP) performance of a chatbot.

## Build a simple chatbox
Visit ```https://dialogflow.cloud.google.com/#/login``` (*Create or login to your google account*).
On the left-hand side, create a new bot by clicking on the dropdown arrow and select “Create a new agent”
Fill in the agent name at the top (Hey!Bot in my case) and click on create. Wait for the training of your agent to be completed. It will take a very short time and you will be notified in the bottom right corner of your screen when this is complete. **Note:Accept Terms and conditions when you create/log in to your goole account, otherwise, you will be prompted for it again & 'new agent' won't be created.**

Test your bot by typing “hi” and see that the bot recognized this ang give a response. Click on “COPY CURL” and go to postman to communicate with your bot.

curl -H "Content-Type: application/json; charset=utf-8"  -H "Authorization: Bearer ya45.a0ARrdaM9bV525b8JLtc0PSaJCCANzyWcNXj6PefcEvRTYzpFa4I0F76fsR5LTO8FkQ1T4SV9a5ES1p3U65Bmv4tNTNZUodT5oQu70sr2w2e2ukYh2KCRTiK5t3_CA76Yibx3tZ1uwijklmSDG6666kmK5iw3ll9SHIBVupes3wHt4sg0TMdroi3Oa8PCL0Arb8p8lJtu9XVXq1PKaXphgg5p-jd49hGD7DhopEDlFlMoD8w"  -d "{\"queryInput\":{\"text\":{\"text\":\"hi\",\"languageCode\":\"en\"}},\"queryParams\":{\"source\":\"DIALOGFLOW_CONSOLE\",\"timeZone\":\"Europe/London\",\"sentimentAnalysisRequestConfig\":{\"analyzeQueryTextSentiment\":true}}}" "https://dialogflow.clients6.google.com/v2/projects/hey-bot-hmfh/agent/sessions/805bc64a-c38d-a942-8a83-2246a228b578:detectIntent"


In Postman add your URL as the POST link, mine: https://dialogflow.clients6.google.com/v2/projects/hey-bot-hmfh/agent/sessions/805bc64a-c38d-a942-8a83-2246a228b578:detectIntent. 
Click on the “Authorization” tab, select “Bearer Token” in the dropdown, then paste your token from the copied curl into the “Token” field on the right. Mine copied from above is (without the double quote): ya45.a0ARrdaM9bV525b8JLtc0PSaJCCANzyWcNXj6PefcEvRTYzpFa4I0F76fsR5LTO8FkQ1T4SV9a5ES1p3U65Bmv4tNTNZUodT5oQu70sr2w2e2ukYh2KCRTiK5t3_CA76Yibx3tZ1uwijklmSDG6666kmK5iw3ll9SHIBVupes3wHt4sg0TMdroi3Oa8PCL0Arb8p8lJtu9XVXq1PKaXphgg5p-jd49hGD7DhopEDlFlMoD8w


Click on the "Body" tab, select raw, & JSON format from dropdown. And add the corresponding body like as follows:
{
   "queryInput": {
      "text": {
         "text": "hi",
         "languageCode": "en"
      }
   },
   "queryParams": {
      "timeZone": "Europe/London"
   }
}

You can now send your request and get a 200 OK response with the corresponding body response to your call.
Save this into a new collection.

## Installations:
```npm install express fs body-parser csv-writer```
**Note: csvWriter won't work ES6module, so this App is adapted to Commonjs**


