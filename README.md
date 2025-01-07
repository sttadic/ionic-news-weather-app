# Weather and News Ionic App
Mobile Application Development module - Higher Diploma in Software Development <br>
Author: Stjepan Tadic

<br>

## Description
An Ionic mobile application built with Angular, providing weather, news, and country information. This app fetches data from online APIs and includes additional features to enhance user experience.

<br>

## Installation
- Prerequisites: 
  - **Node.js** 20.17.0 or higher
  - **Angular** 18.2.6 or higher
  - **Ionic CLI** 7.2.0 or higher

- Clone the repository:
```bash
git clone https://github.com/sttadic/ionic-news-weather-app.git
```

- Install dependencies:
```bash
npm install
```

- Run the application and navigate to the *localhost:8100* in your browser:
```bash
ionic serve
```

- To set API keys, navigate to the **Settings** page of the app and enter your API keys in the designated fields:
  - [OpenWeatherMap](https://openweathermap.org/api) for weather data
  - [NewsData](https://newsdata.io) for news articles

- For mobile testing, build the application for your desired platform:
```bash
ionic capacitor build android
ionic capacitor build ios
```