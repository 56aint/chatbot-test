## Aim
To create an app to use with postman to carry out an API-test of the Natural Language Processing (NLP) performance of a chatbot. And the result is written the into a CSV file.

A performance file is created that will contain:
  text: the text given as an entry
  executionTime: the time it took to process the text by the NLP
  intentMatch: the intent found by the NLP mapped for each entry

## Build a simple chatbox
Visit ```https://dialogflow.cloud.google.com/#/login``` (*Create or login to your google account*).
On the left-hand side, create a new bot by clicking on the dropdown arrow and select “Create a new agent”
Fill in the agent name at the top (Hey!Bot in my case) and click on create. Wait for the training of your agent to be completed. It will take a very short time and you will be notified in the bottom right corner of your screen when this is complete. **Note:Accept Terms and conditions when you create/log in to your goole account, otherwise, you will be prompted for it again & 'new agent' won't be created.**

Test your bot by typing “hi” and see that the bot recognized this ang give a response. Click on “COPY CURL” and go to postman to communicate with your bot.

curl -H "Content-Type: application/json; charset=utf-8"  -H 
```bash
"Authorization: Bearer ya45.a0ARrdaM9bV525b8JLtc0PSaJCCANzyWcNXj6PefcEvRTYzpFa4I0F76fsR5LTO8FkQ1T4SV9a5ES1p3U65Bmv4tNTNZUodT5oQu70sr2w2e2ukYh2KCRTiK5t3_CA76Yibx3tZ1uwijklmSDG6666kmK5iw3ll9SHIBVupes3wHt4sg0TMdroi3Oa8PCL0Arb8p8lJtu9XVXq1PKaXphgg5p-jd49hGD7DhopEDlFlMoD8w"  -d "{\"queryInput\":{\"text\":{\"text\":\"hi\",\"languageCode\":\"en\"}},\"queryParams\":{\"source\":\"DIALOGFLOW_CONSOLE\",\"timeZone\":\"Europe/London\",\"sentimentAnalysisRequestConfig\":{\"analyzeQueryTextSentiment\":true}}}" "https://dialogflow.clients6.google.com/v2/projects/hey-bot-hmfh/agent/sessions/805bc64a-c38d-a942-8a83-2246a228b578:detectIntent"
```


In Postman add your URL as the POST link, *mine*: 
```https://dialogflow.clients6.google.com/v2/projects/hey-bot-hmfh/agent/sessions/805bc64a-c38d-a942-8a83-2246a228b578:detectIntent.```
Click on the “Authorization” tab, select “Bearer Token” in the dropdown, then paste your token from the copied curl into the “Token” field on the right. Mine copied from above is (*without the double quote)*: 
```bash
ya45.a0ARrdaM9bV525b8JLtc0PSaJCCANzyWcNXj6PefcEvRTYzpFa4I0F76fsR5LTO8FkQ1T4SV9a5ES1p3U65Bmv4tNTNZUodT5oQu70sr2w2e2ukYh2KCRTiK5t3_CA76Yibx3tZ1uwijklmSDG6666kmK5iw3ll9SHIBVupes3wHt4sg0TMdroi3Oa8PCL0Arb8p8lJtu9XVXq1PKaXphgg5p-jd49hGD7DhopEDlFlMoD8w
```

Click on the "Body" tab, select raw, & JSON format from dropdown. And add the corresponding body like as follows:
```bash
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
```

You can now send your request and get a 200 OK response with the corresponding body response to your call.
Save this into a new collection.

## Installations:
```npm install express fs body-parser csv-writer```
**Note: csvWriter won't work ES6module, so this App is adapted to Commonjs**
**Note: make sure you click save your pm-collection progress.**


Fire up the server with ```node script.js```
```keep server running for postman to communicate with your app```

Change the pm body content to:
```bash
{
   "queryInput": {
      "text": {
         "text": "{ {text} }",
         "languageCode": "en"
      }
   },
   "queryParams": {
      "timeZone": "Europe/London"
   }
}
```
To set ```'text'``` as an enviroment variable. So with every iteration, the value of ```'text'``` can be extracted in the ```csv file```
Enter this in the “Pre-request Script” tab:
```pm.environment.set("text", pm.iterationData.get("text"));```

Then paste this in the pm ```"Tests" field```
```bash
let jsonData = JSON.parse(responseBody);
let intent = jsonData.queryResult.intent.displayName
pm.sendRequest({
   url: 'http://localhost:3000/botTopmResponse',
   method: 'POST',
   header: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
   },
   body: {
      mode: 'raw',
      raw: JSON.stringify({ text: pm.environment.get("text"), executiontime: pm.response.responseTime, intentmatch: intent })
   }
}, function (err, res) {
   console.log(res);
   console.log(err);
});
```
intent name is retrieved from the request’s response. Which is in turn sent to our locally deployed Node application. The body is built with the values we intend to have in the CSV results file:
  text: from the environment variable
  execution time: from the Postman response
  intentMatch: from the Postman response

Next, Select your collection and choose “Run”, It opens a new window for Collection Runner. From there, click on “Select file” and choose your input sample data file that contains our phrases to be tested by the NLP. You can click on “Preview” to make sure your data are loaded correctly. Then run your test. Everything should go smoothly without error and should see as many iterations as you had entries in your input file.



