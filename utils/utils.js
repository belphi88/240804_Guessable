const { QuestionsConstants } = require("./constants");
class Utils {

  //For unregistered users
  static getCurrentDate() {
    const today = new Date();
    // Format the date as needed
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
    const day = String(today.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
    // return "2024-07-31";
  }

  //For registered users
  static getCurrentDate(timezone) {
    const options = {
      timeZone: timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    };
    const formatter = new Intl.DateTimeFormat("en-US", options);
    const parts = formatter.formatToParts(new Date());
    const formattedDate = `${parts[4].value}-${parts[0].value}-${parts[2].value}`;
     console.log("Timezone DATE");
    return formattedDate;
    // return "2024-08-04";
  }

  static getPreviousDayDate(timezone) {
    // Get the current date in the provided timezone
    const currentDate = new Date().toLocaleString("en-US", {
      timeZone: timezone
    });

    // Convert the currentDate to a Date object
    const dateObj = new Date(currentDate);

    // Get the previous day by subtracting one day's worth of milliseconds
    const previousDay = new Date(dateObj.getTime() - 24 * 60 * 60 * 1000);

    // Format the previous day date
    const year = previousDay.getFullYear();
    const month = String(previousDay.getMonth() + 1).padStart(2, "0");
    const day = String(previousDay.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  static getInstance(type) {
    if (type === QuestionsConstants.COUNTRY) {
      const CountryQuestion = require("../services/CountryQuestion");
      return new CountryQuestion();
    } else if (type == QuestionsConstants.MOVIE) {
      const MovieQuestion = require("../services/movieQuesion");
      return new MovieQuestion();
    } else if (type == QuestionsConstants.PEOPLE) {
      const PeopleQuestion = require("../services/peopleQuestion");
      return new PeopleQuestion();
    } else {
      throw Error("Bad argument: " + type);
    }
  }
}

module.exports = Utils;
