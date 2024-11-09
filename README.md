# Agricultre-Project
Agriculture:Integrating Weather, Soil and Crop Data for Optimal Farming:

*******************Title:******************
Agriculture:Integrating Weather, Soil and Crop Data for Optimal Farming:

*****************Objective:*************************
By providing real time weather data, Weather forecasts, soil details like Temperature, moisture, Crop  recommendation report , which aims to empower farmers with actionable insights. This will enable them to make informed decisions, optimize crop yields and manage resources more efficiently. The ultimate goal is to foster sustainable agricultural practices, enhance food security, and improve the livelihoods of farmers.Also the Goal is to Provide a Page for Community Engagement.

********************Features:***********************
1.Upcoming Weather Details Page
 a.Current weather conditions
 b.Weather Conditions for Future
  i.Hourly Forecast for 7 days
  ii.daily Forecast for 16 days
  iii.Seasonal Forcast for 6 months 

2.Soil Information including Temperature,Moisture
3.Crop Recommendation Analysis Using Plots & Graphs
4.Environmental details
  a.AQI Details including pm2.5,pm10,aqi real time etc.
  b.Community Engagement Page

****************App details:***************
The App has 4 parts which are :

1. Upcoming Weather Details which includes current weather details, future weather forecast. Future Weather forecast includes Three parts which are 1.hourly forecast for 7day ahead. 2. Daily weather forecast for 16day ahead. 3. Seasonal weather forecast with a time period of 6months ahead and data for every 7days from today. The future weather Data is represented in table format with parameters like temperature, rainfall, accumulated precipitation , wind speed, wind direction,
chances of rain. 

2. Soil information: which provides 4 details by entering user's location in form of latitudes and longitudes. It provides date and time of data record (which is updated twice a day) ,Soil moisture content, soil surface temperature and soil temperature at a depth of 10cms. By using this data, farmers can check about the irrigation needs. 

3. The third part of this project is Crop Recommendation dataset analysis. The dataset has 2200 entries for the columns like crop type, N, P, K level in the soil, temperature, humidity, ph value, rainfall. The graphs are plotted using Python libraries matplotlib, seaborn and plotted graphs including Nitrogen distribution across various crops, temperature vs humidity, average nutrients (N, P, k) by each crop(highlighting nutrients requirements)... The Plot images have been download and shown as HTML image tag... 

4. The fourth part Gives Details about atmospheric Conditions,Air Quality Index for all Places by Entering City Location.It Also has a page for Community Engagement which Gives has the option for sharing Events and Other Useful information in detail.

*************Technologies used:*****************
HTML, CSS, JAVASCRIPT( to show the details on web), PYTHON libraries(Pandas, Matplotlib, seaborn) for making data plots. 
Openweathermap API(to show current weather Data), Openmeteo API(to show future weather forecasts), Agromonitor API (for showing soil details),AQICN For AIr Quality Indexing.




