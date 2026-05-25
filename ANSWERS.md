**How to run**

Note : Make sure you have install Node.js, before following the below steps.
1. Go to https://github.com/mohammadahmadraza/aeroweather and click on **Code** button and click on **Download ZIP** option from the dropdown.
2. Extract the files, go to client folder and open the folder in command prompt.
3. Run the npm i command in the command prompt. and follow the same instructions by moving to server folder.
4. Now open your browser and enter the http://localhost:5173/ in search bar and hit enter button. Application frontend will be run in the browser.

**Stack choice**
1. I have chosen this stack (React, Tailwind CSS, Nodejs, Expressjs) because i am already familiar with this tech stack and have developed some practice projects.
2. Choosing the Tailwind CSS is really worse because it took me more than 2 hours to set up it with react.

**One real edge case**
Its the user input handling on server side. As the application has to show the results based on user input. 
Handling is done in server folder > index.js file and line no 23.

**AI usage**
I have used claude AI for frontend design, i have changed the weather details and flight details card.

**Honest gap**
In this application, two APIs are used one for weather data (https://openweathermap.org/) and one for flight data(https://www.goflightlabs.com/). Both apis are handle on one endpoint, i would handle both api calls in such a way that if any api is not responding then show error message accordingly.
