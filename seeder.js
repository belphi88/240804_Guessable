const moment = require("moment");

function restructureJSON(rawData) {
  const restructredData = [];

  // Helper function to format dates
  const formatDate = (dateStr) =>
    moment(dateStr, "DD-MMM-YY").format("YYYY-MM-DD");

  // Process MovieQuestions
  rawData.MovieQuestions.forEach((movie) => {
    restructredData.push({
      date: formatDate(movie.date),
      clueMainBefore: movie.clueMainBefore,
      clueMainAfter: movie.clueMainAfter,
      clueImage:
        movie.clueImage !== "NA" ? movie.clueImage : "sample_image.jpg",
      category: "movie",
      answer: movie.movieName,
      MovieQuestion: {
        movieName: movie.movieName,
        clueYear: movie.clueYear,
        clueDirector: movie.clueDirector,
        clueCast: JSON.parse(movie.clueCast),
        imdbLink: movie.imdbLink
      }
    });
  });

  // Process Countries
  rawData.Countries.forEach((country) => {
    restructredData.push({
      date: formatDate(country.date),
      clueMainBefore: country.clueMainBefore.replace("(Country)", "(Country)"),
      clueMainAfter: country.clueMainAfter.replace(
        "(Country)",
        country.countryName
      ),
      clueImage:
        country.clueImage !== "NA" ? country.clueImage : "sample_image.jpg",
      category: "country",
      answer: country.countryName,
      CountryQuestion: {
        countryName: country.countryName,
        clueLatLong: {
          lat: country.clueLatLong.split(", ")[0],
          long: country.clueLatLong.split(", ")[1]
        },
        clueFlag: country.clueFlag,
        clueCapital: country.clueCapital,
        wikiLink: country.wikiLink
      }
    });
  });

  // Process People
  rawData.People.forEach((person) => {
    restructredData.push({
      date: formatDate(person.date),
      clueMainBefore: person.clueMainBefore.replace("X", person.personName),
      clueMainAfter: person.clueMainAfter.replace("X", person.personName),
      clueImage:
        person.clueImage !== "NA" ? person.clueImage : "sample_image.jpg",
      category: "people",
      answer: person.personName,
      PeopleQuestion: {
        personName: person.personName,
        clueNationality: person.clueNationality,
        clueLifespan: person.clueLifespan,
        clueInitials: person.clueInitials,
        wikiLink: person.wikiLink
      }
    });
  });

  return restructredData;
}

// Example usage
const rawData = {
  MovieQuestions: [
    {
      date: "06-Jul-24",
      movieName: "Signs",
      clueMainBefore:
        "A widowed former reverend living with his children and brother on a Pennsylvania farm finds mysterious crop circles in their fields, which suggests something more frightening to come.",
      clueMainAfter:
        "A widowed former reverend living with his children and brother on a Pennsylvania farm finds mysterious crop circles in their fields, which suggests something more frightening to come.",
      clueImage: "NA",
      clueYear: "2002",
      clueDirector: "director Signs",
      clueCast: '["cast Signs"]',
      imdbLink: "https://www.imdb.com/title/tt0286106/"
    },
    {
      date: "07-Jul-24",
      movieName: "Unbreakable",
      clueMainBefore:
        "A man learns something extraordinary about himself after a devastating accident.",
      clueMainAfter:
        "A man learns something extraordinary about himself after a devastating accident.",
      clueImage: "NA",
      clueYear: "2000",
      clueDirector: "director Unbreakable",
      clueCast: '["cast Unbreakable"]',
      imdbLink: "https://www.imdb.com/title/tt0217869/"
    }
  ],
  Countries: [
    {
      date: "06-Jul-24",
      countryName: "Luxembourg",
      clueMainBefore:
        "With an area of 2,586 square kilometers (998 sq mi), (Country) is Europe's seventh-smallest country.",
      clueMainAfter:
        "With an area of 2,586 square kilometers (998 sq mi), Luxembourg is Europe's seventh-smallest country",
      clueImage: "NA",
      clueLatLong: "49.8 N, 6.1 E",
      clueFlag: "images/flags/lu.svg",
      clueCapital: "Luxembourg",
      wikiLink: "https://en.wikipedia.org/wiki/Luxembourg"
    },
    {
      date: "07-Jul-24",
      countryName: "Ecuador",
      clueMainBefore:
        "(Country) has four main geographic regions. La Costa (the coastal region) is the country's most fertile land.",
      clueMainAfter:
        "Ecuador has four main geographic regions. La Costa (the coastal region) is the country's most fertile land",
      clueImage: "Use any sample",
      clueLatLong: "1.8 S, 78.2 W",
      clueFlag: "images/flags/ec.svg",
      clueCapital: "Quito",
      wikiLink: "https://en.wikipedia.org/wiki/Ecuador"
    }
  ],
  People: [
    {
      date: "22-Jul-24",
      personName: "Imran Khan",
      clueMainBefore:
        "X graduated from Keble College, Oxford. He began his international cricket career in 1971 and played until 1992.",
      clueMainAfter:
        "Imran Khan graduated from Keble College, Oxford. He began his international cricket career in 1971 and played until 1992, serving as the national team's captain intermittently between 1982 and 1992.",
      clueNationality: "Pakistan",
      clueLifespan: "1952 - ",
      clueInitials: "IK",
      wikiLink: "https://en.wikipedia.org/wiki/Imran_Khan"
    },
    {
      date: "23-Jul-24",
      personName: "Grigori Rasputin",
      clueMainBefore:
        "X had a religious conversion experience after embarking on a pilgrimage to a monastery. He later travelled to Saint Petersburg and captivated a number of religious and social leaders, eventually becoming a prominent figure in Russian society.",
      clueMainAfter:
        "Rasputin had a religious conversion experience after embarking on a pilgrimage to a monastery. He later travelled to Saint Petersburg and captivated a number of religious and social leaders, eventually becoming a prominent figure in Russian society.",
      clueNationality: "Russia",
      clueLifespan: "1869 - 1916",
      clueInitials: "GR",
      wikiLink: "https://en.wikipedia.org/wiki/Grigori_Rasputin"
    }
  ]
};

console.log(restructureJSON(rawData));
