const sequelize = require("./databaseConfig/dbconfig");
const User = require("./models/user");
const Question = require("./models/questions");
const CountryQuestion = require("./models/countryQuestions");
const MovieQuestion = require("./models/movieQuestions");

const Attempt = require("./models/attempts");
const PeopleQuestion = require("./models/peopleQuestions");

async function seedDatabase() {
  // Sync models in order of dependencies
  await sequelize.sync({ force: false });

  // Sample data for Questions, CountryQuestions, and MovieQuestions
  // const questions = [
  //   {
  //     date: "2024-07-16",
  //     clueMainBefore: "Identify this country!",
  //     clueImage: "france_image.jpg",
  //     clueMainAfter: "You guessed France!",
  //     category: "country",
  //     answer: "France",
  //     CountryQuestion: {
  //       countryName: "France",
  //       clueLatLong: { lat: "48.8566", long: "2.3522" },
  //       clueFlag: "flag_france.png",
  //       clueCapital: "Paris",
  //       wikiLink: "https://en.wikipedia.org/wiki/France"
  //     }
  //   },
  //   {
  //     date: "2024-07-17",
  //     clueMainBefore: "Identify this country!",
  //     clueImage: "germany_image.jpg",
  //     clueMainAfter: "You guessed Germany!",
  //     category: "country",
  //     answer: "Germany",
  //     CountryQuestion: {
  //       countryName: "Germany",
  //       clueLatLong: { lat: "52.5200", long: "13.4050" },
  //       clueFlag: "flag_germany.png",
  //       clueCapital: "Berlin",
  //       wikiLink: "https://en.wikipedia.org/wiki/Germany"
  //     }
  //   },
  //   {
  //     date: "2024-07-18",
  //     clueMainBefore: "Identify this country!",
  //     clueImage: "japan_image.jpg",
  //     clueMainAfter: "You guessed Japan!",
  //     category: "country",
  //     answer: "Japan",
  //     CountryQuestion: {
  //       countryName: "Japan",
  //       clueLatLong: { lat: "35.6895", long: "139.6917" },
  //       clueFlag: "flag_japan.png",
  //       clueCapital: "Tokyo",
  //       wikiLink: "https://en.wikipedia.org/wiki/Japan"
  //     }
  //   },
  //   {
  //     date: "2024-07-19",
  //     clueMainBefore: "Identify this country!",
  //     clueImage: "australia_image.jpg",
  //     clueMainAfter: "You guessed Australia!",
  //     category: "country",
  //     answer: "Australia",
  //     CountryQuestion: {
  //       countryName: "Australia",
  //       clueLatLong: { lat: "-35.2809", long: "149.1300" },
  //       clueFlag: "flag_australia.png",
  //       clueCapital: "Canberra",
  //       wikiLink: "https://en.wikipedia.org/wiki/Australia"
  //     }
  //   },
  //   {
  //     date: "2024-07-20",
  //     clueMainBefore: "Identify this country!",
  //     clueImage: "brazil_image.jpg",
  //     clueMainAfter: "You guessed Brazil!",
  //     category: "country",
  //     answer: "Brazil",
  //     CountryQuestion: {
  //       countryName: "Brazil",
  //       clueLatLong: { lat: "-15.8267", long: "-47.9218" },
  //       clueFlag: "flag_brazil.png",
  //       clueCapital: "Brasília",
  //       wikiLink: "https://en.wikipedia.org/wiki/Brazil"
  //     }
  //   },
  //   {
  //     date: "2024-07-16",
  //     clueMainBefore: "Identify this movie!",
  //     clueImage: "inception_image.jpg",
  //     clueMainAfter: "You guessed Inception!",
  //     category: "movie",
  //     answer: "Inception",
  //     MovieQuestion: {
  //       movieName: "Inception",
  //       clueYear: 2010,
  //       clueDirector: "Christopher Nolan",
  //       clueCast: "Leonardo DiCaprio,Joseph Gordon-Levitt,Ellen Page",
  //       imdbLink: "https://www.imdb.com/title/tt1375666/"
  //     }
  //   },
  //   {
  //     date: "2024-07-17",
  //     clueMainBefore: "Identify this movie!",
  //     clueImage: "matrix_image.jpg",
  //     clueMainAfter: "You guessed The Matrix!",
  //     category: "movie",
  //     answer: "The Matrix",
  //     MovieQuestion: {
  //       movieName: "The Matrix",
  //       clueYear: 1999,
  //       clueDirector: "Lana Wachowski, Lilly Wachowski",
  //       clueCast: "Keanu Reeves,Laurence Fishburne,Carrie-Anne Moss",
  //       imdbLink: "https://www.imdb.com/title/tt0133093/"
  //     }
  //   },
  //   {
  //     date: "2024-07-18",
  //     clueMainBefore: "Identify this movie!",
  //     clueImage: "godfather_image.jpg",
  //     clueMainAfter: "You guessed The Godfather!",
  //     category: "movie",
  //     answer: "The Godfather",
  //     MovieQuestion: {
  //       movieName: "The Godfather",
  //       clueYear: 1972,
  //       clueDirector: "Francis Ford Coppola",
  //       clueCast: "Marlon Brando, Al Pacino, James Caan",
  //       imdbLink: "https://www.imdb.com/title/tt0068646/"
  //     }
  //   },
  //   {
  //     date: "2024-07-19",
  //     clueMainBefore: "Identify this movie!",
  //     clueImage: "lotr_image.jpg",
  //     clueMainAfter:
  //       "You guessed The Lord of the Rings: The Fellowship of the Ring!",
  //     category: "movie",
  //     answer: "The Lord of the Rings: The Fellowship of the Ring",
  //     MovieQuestion: {
  //       movieName: "The Lord of the Rings: The Fellowship of the Ring",
  //       clueYear: 2001,
  //       clueDirector: "Peter Jackson",
  //       clueCast: "Elijah Wood,Ian McKellen,Orlando Bloom",
  //       imdbLink: "https://www.imdb.com/title/tt0120737/"
  //     }
  //   },
  //   {
  //     date: "2024-07-20",
  //     clueMainBefore: "Identify this movie!",
  //     clueImage: "shawshank_image.jpg",
  //     clueMainAfter: "You guessed The Shawshank Redemption!",
  //     category: "movie",
  //     answer: "The Shawshank Redemption",
  //     MovieQuestion: {
  //       movieName: "The Shawshank Redemption",
  //       clueYear: 1994,
  //       clueDirector: "Frank Darabont",
  //       clueCast: "Tim Robbins,Morgan Freeman,Bob Gunton",
  //       imdbLink: "https://www.imdb.com/title/tt0111161/"
  //     }
  //   }
  // ];
// const questions = [
//   {
//     date: "2024-07-06",
//     clueMainBefore:
//       "With an area of 2,586 square kilometers (998 sq mi), (Country) is Europe's seventh-smallest country. In 2023, it had a population of 660,809, which makes it one of the least-populated countries in Europe, albeit with the highest population growth rate; foreigners account for nearly half the population. (Country) is a representative democracy headed by a constitutional monarch, Grand Duke Henri, making it the world's only remaining sovereign grand duchy.",
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       "With an area of 2,586 square kilometers (998 sq mi), Luxembourg is Europe's seventh-smallest country. In 2023, it had a population of 660,809, which makes it one of the least-populated countries in Europe, albeit with the highest population growth rate; foreigners account for nearly half the population. Luxembourg is a representative democracy headed by a constitutional monarch, Grand Duke Henri, making it the world's only remaining sovereign grand duchy.",
//     category: "country",
//     answer: "Luxembourg",
//     CountryQuestion: {
//       countryName: "Luxembourg",
//       clueLatLong: { lat: "49.8 N", long: "6.1 E" },
//       clueFlag: "images/flags/lu.svg",
//       clueCapital: "Luxembourg",
//       wikiLink: "https://en.wikipedia.org/wiki/Luxembourg"
//     }
//   },
//   {
//     date: "2024-07-07",
//     clueMainBefore:
//       '(Country) has four main geographic regions. La Costa (the coastal region) is the country\'s most fertile land, and is the seat of large banana exportation plantations. La Sierra ("the highlands") consists of the Andean and Interandean highland provinces. La Amazon�a, also known as El Oriente, or "the east" consists of the Amazon jungle provinces. La Regi�n Insular is the region comprising the islands well known as the place of birth to Darwin\'s Theory of Evolution.',
//     clueImage: "Use any sample",
//     clueMainAfter:
//       'Ecuador has four main geographic regions. La Costa (the coastal region) is the country\'s most fertile land, and is the seat of large banana exportation plantations. La Sierra ("the highlands") consists of the Andean and Interandean highland provinces. La Amazon�a, also known as El Oriente, or "the east" consists of the Amazon jungle provinces. La Regi�n Insular is the region comprising the islands well known as the place of birth to Darwin\'s Theory of Evolution.',
//     category: "country",
//     answer: "Ecuador",
//     CountryQuestion: {
//       countryName: "Ecuador",
//       clueLatLong: { lat: "1.8 S", long: "78.2 W" },
//       clueFlag: "images/flags/ec.svg",
//       clueCapital: "Quito",
//       wikiLink: "https://en.wikipedia.org/wiki/Ecuador"
//     }
//   },
//   {
//     date: "2024-07-08",
//     clueMainBefore:
//       'Samarkand is the second-largest city of (Country) and among the oldest continuously inhabited cities in Central Asia. The city is noted as a centre of Islamic scholarly study and the birthplace of the Timurid Renaissance. In the 14th century, Timur (aka Tamerlane) made it the capital of his empire. The name comes from samar "stone, rock" and kand "fort, town." In this respect, Samarkand shares the same meaning as the name of the (Country)\'s capital, with ____ being the Turkic term for "stone" and -kent the Turkic analogue of kand.',
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       'Samarkand is the second-largest city of Uzbekistan and among the oldest continuously inhabited cities in Central Asia. The city is noted as a centre of Islamic scholarly study and the birthplace of the Timurid Renaissance. In the 14th century, Timur (aka Tamerlane) made it the capital of his empire. The name comes from samar "stone, rock" and kand "fort, town." In this respect, Samarqand shares the same meaning as the name of the Uzbek capital Tashkent, with tash- being the Turkic term for "stone" and -kent the Turkic analogue of kand.',
//     category: "country",
//     answer: "Uzbekistan",
//     CountryQuestion: {
//       countryName: "Uzbekistan",
//       clueLatLong: { lat: "41.4 N", long: "64.6 E" },
//       clueFlag: "images/flags/uz.svg",
//       clueCapital: "Tashkent",
//       wikiLink: "https://en.wikipedia.org/wiki/Uzbekistan"
//     }
//   },
//   {
//     date: "2024-07-09",
//     clueMainBefore:
//       "Which country in the Horn of Africa has the longest coastline in the continent, the largest population of camels in the world, and is the world's major supplier of frankincense and myrrh?",
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       "Somalia, located in the Horn of Africa, has the longest coastline in the continent, the largest population of camels in the world, and is the world's major supplier of frankincense and myrrh.",
//     category: "country",
//     answer: "Somalia",
//     CountryQuestion: {
//       countryName: "Somalia",
//       clueLatLong: { lat: "5.2 N", long: "46.2 E" },
//       clueFlag: "images/flags/so.svg",
//       clueCapital: "Mogadishu",
//       wikiLink: "https://en.wikipedia.org/wiki/Somalia"
//     }
//   },
//   {
//     date: "2024-07-10",
//     clueMainBefore:
//       "The Iguaz� Falls on the border of Argentina and Brazil make up the largest waterfall system in the world. The falls may be reached from towns in Brazil and Argentina, as well as from the city of Ciudad del Este, which is in a third country. Which third country, one of only two landlocked countries in South America, completes this trio of nations having a joint border at the Iguaz� Falls?",
//     clueImage: "Use any sample",
//     clueMainAfter:
//       "The Iguaz� Falls on the border of Argentina and Brazil make up the largest waterfall system in the world. One of only two landlocked countries on its continent. The falls may be reached from towns in Brazil and Argentina, as well as from the city of Ciudad del Este, Paraguay. ",
//     category: "country",
//     answer: "Paraguay",
//     CountryQuestion: {
//       countryName: "Paraguay",
//       clueLatLong: { lat: "23.4 S", long: "58.4 W" },
//       clueFlag: "images/flags/py.svg",
//       clueCapital: "Asunci�n",
//       wikiLink: "https://en.wikipedia.org/wiki/Paraguay"
//     }
//   },
//   {
//     date: "2024-07-11",
//     clueMainBefore:
//       'Vegemite is a thick, dark brown (adjectival) food spread made from leftover brewers\' yeast extract with various vegetable and spice additives. Faced with growing competition from British Marmite, from 1928 to 1935 the product was renamed "Parwill" to make use of the advertising slogan "Marmite but Parwill", a two-step pun on the new name and that of its competitor; i.e. "If Ma [mother] might... then Pa [father] will." This attempt was unsuccessful and the name was reverted to Vegemite. Which country proudly claims this unique spread, often smeared on toast with butter, as a quintessential part of its cuisine?',
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       'Vegemite is a thick, dark brown Australian food spread made from leftover brewers\' yeast extract with various vegetable and spice additives. Faced with growing competition from Marmite, from 1928 to 1935 the product was renamed "Parwill" to make use of the advertising slogan "Marmite but Parwill", a two-step pun on the new name and that of its competitor; i.e. "If Ma [mother] might... then Pa [father] will." This attempt was unsuccessful and the name was reverted to Vegemite. Today, it\'s a staple on Aussie breakfast tables and is affectionately known as "Australia\'s black gold".',
//     category: "country",
//     answer: "Australia",
//     CountryQuestion: {
//       countryName: "Australia",
//       clueLatLong: { lat: "25.3 S", long: "133.8 E" },
//       clueFlag: "images/flags/au.svg",
//       clueCapital: "Canberra",
//       wikiLink: "https://en.wikipedia.org/wiki/Australia"
//     }
//   },
//   {
//     date: "2024-07-12",
//     clueMainBefore:
//       'According to one legend, the people of (Country) arose from the union of the Brahmana KAMBU and the apsara ("celestial nymph") MERA. Their marriage is said to have given rise to the name (Demonym) and founded the Varman dynasty of ancient (Country). This name is not only the demonym and the name of the language of the country, it also features in the popular name of the Communist Party of (Country), known as one of the most autocratic, totalitarian, and repressive regimes of the 20th century.',
//     clueImage: "Use any sample",
//     clueMainAfter:
//       'According to one legend, the Khmer people of Cambodia arose from the union of the Brahmana Kambu and the apsara ("celestial nymph") Mera. Their marriage is said to have given rise to the name Khmer and founded the Varman dynasty of ancient Cambodia. This name is not only the demonym and the name of the language of the country, it also features in the popular name of the Communist Party of Cambodia, i.e. Khmer Rouge, known as one of the most autocratic, totalitarian, and repressive regimes of the 20th century.',
//     category: "country",
//     answer: "Cambodia",
//     CountryQuestion: {
//       countryName: "Cambodia",
//       clueLatLong: { lat: "12.6 N", long: "105 E" },
//       clueFlag: "images/flags/kh.svg",
//       clueCapital: "Phnom Penh",
//       wikiLink: "https://en.wikipedia.org/wiki/Cambodia"
//     }
//   },
//   {
//     date: "2024-07-13",
//     clueMainBefore:
//       'The Kalenjin have been called by some "the running tribe." Since the mid-1960s, (Demonym) men have earned the largest share of major honours in international athletics at distances from 800 meters to the marathon; the vast majority of these (Demonym) running stars have been Kalenjin. A number of theories explaining the unusual athletic prowess of the Kalenjin have been proposed. These include many explanations that apply equally well to other (Demonyms) or people living elsewhere, such as that they run to school every day, that they live at relatively high altitude, and that the prize money from races is large compared to typical yearly earnings.',
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       'The Kalenjin have been called by some "the running tribe." Since the mid-1960s, Kenyan men have earned the largest share of major honours in international athletics at distances from 800 meters to the marathon; the vast majority of these Kenyan running stars have been Kalenjin. A number of theories explaining the unusual athletic prowess of the Kalenjin have been proposed. These include many explanations that apply equally well to other Kenyans or people living elsewhere, such as that they run to school every day, that they live at relatively high altitude, and that the prize money from races is large compared to typical yearly earnings.',
//     category: "country",
//     answer: "Kenya",
//     CountryQuestion: {
//       countryName: "Kenya",
//       clueLatLong: { lat: "0 S", long: "37.9 E" },
//       clueFlag: "images/flags/ke.svg",
//       clueCapital: "Nairobi",
//       wikiLink: "https://en.wikipedia.org/wiki/Kenya"
//     }
//   },
//   {
//     date: "2024-07-14",
//     clueMainBefore:
//       'The earliest known name for (Country) is Silam which appears in the 6th century BCE, likely derived from the Pali and/or Prakrit word for "island." When Portuguese explorers arrived in 1505, they adapted "Silam" to "Ceil�o" in their language. Finally, when the British took control in the 18th century, they anglicized the Dutch spelling to X, which became the official name until 1972. The British name remains a significant part of (Country)\'s history and culture. It\'s still used in some brands and institutions, like the Bank of X and the X Tea Board.',
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       'The earliest known name for Sri Lanka is Silam which appears in the 6th century BCE, likely derived from the Pali and/or Prakrit word for "island." When Portuguese explorers arrived in 1505, they adapted "Silam" to "Ceil�o" in their language. Finally, when the British took control in the 18th century, they anglicized the Dutch spelling to "Ceylon," which became the official name until 1972. The  British name "Ceylon" remains a significant part of Sri Lanka\'s history and culture. It\'s still used in some brands and institutions, like the Bank of Ceylon and the Ceylon Tea Board.',
//     category: "country",
//     answer: "Sri Lanka",
//     CountryQuestion: {
//       countryName: "Sri Lanka",
//       clueLatLong: { lat: "7.9 N", long: "80.8 E" },
//       clueFlag: "images/flags/lk.svg",
//       clueCapital: "Colombo (executive, judicial)",
//       wikiLink: "https://en.wikipedia.org/wiki/Sri_Lanka"
//     }
//   },
//   {
//     date: "2024-07-15",
//     clueMainBefore:
//       "The (Adjectival) heavy water sabotage was a series of Allied-led efforts to halt German heavy water production via hydroelectric plants in Nazi Germany-occupied (Country) during World War II. The Allies sought to inhibit the German development of nuclear weapons with the destruction of heavy-water production plants. Between 1940 and 1944, a series of sabotage actions by the (Adjectival) resistance movement and Allied bombing ensured the destruction of the Vemork power plant in (Country) and the loss of its heavy water.",
//     clueImage: "Use any sample",
//     clueMainAfter:
//       "The Norwegian heavy water sabotage was a series of Allied-led efforts to halt German heavy water production via hydroelectric plants in Nazi Germany-occupied Norway during World War II. The Allies sought to inhibit the German development of nuclear weapons with the destruction of heavy-water production plants. Between 1940 and 1944, a series of sabotage actions by the Norwegian resistance movement and Allied bombing ensured the destruction of the Vemork power plant in Norway and the loss of its heavy water.",
//     category: "country",
//     answer: "Norway",
//     CountryQuestion: {
//       countryName: "Norway",
//       clueLatLong: { lat: "60.5 N", long: "8.5 E" },
//       clueFlag: "images/flags/no.svg",
//       clueCapital: "Oslo",
//       wikiLink: "https://en.wikipedia.org/wiki/Norway"
//     }
//   },
//   {
//     date: "2024-07-16",
//     clueMainBefore:
//       "Before (Country) became independent in 1990, its territory was known first as German South-West Africa, and then as South West Africa, reflecting its colonial occupation by Germans and South Africans, respectively. The modern name of the country is derived from the _____ desert, estimated to be the oldest desert in the world.",
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       "Before Namibia became independent in 1990, its territory was known first as German South-West Africa, and then as South West Africa, reflecting its colonial occupation by Germans and South Africans, respectively. The modern name of the country is derived from the Namib desert, estimated to be the oldest desert in the world.",
//     category: "country",
//     answer: "Namibia",
//     CountryQuestion: {
//       countryName: "Namibia",
//       clueLatLong: { lat: "23 S", long: "18.5 E" },
//       clueFlag: "images/flags/na.svg",
//       clueCapital: "Windhoek",
//       wikiLink: "https://en.wikipedia.org/wiki/Namibia"
//     }
//   },
//   {
//     date: "2024-07-17",
//     clueMainBefore:
//       "Xs are an integral part of the way of life in (Country). Nearly all houses have either their own X or in multi-story apartment houses, a timeshare X. A Second World War-era (Adjectival) military field manual states that a break of eight hours is all that is required for a battalion to build Xs, warm them and bathe in them. When Elizabeth Rehn took over as (Country)'s first woman defense minister, she decreed an end to the practice of conducting important national security debates in the ministry's sex-segregated X.",
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       "Saunas are an integral part of the way of life in Finland. Nearly all Finnish houses have either their own sauna or in multi-story apartment houses, a timeshare sauna. A Second World War-era Finnish military field manual states that a break of eight hours is all that is required for a battalion to build saunas, warm them and bathe in them. When Elizabeth Rehn took over as Finland's first woman defense minister, she decreed an end to the practice of conducting important national security debates in the ministry's sex-segregated sauna.",
//     category: "country",
//     answer: "Finland",
//     CountryQuestion: {
//       countryName: "Finland",
//       clueLatLong: { lat: "61.9 N", long: "25.7 E" },
//       clueFlag: "images/flags/fi.svg",
//       clueCapital: "Helsinki",
//       wikiLink: "https://en.wikipedia.org/wiki/Finland"
//     }
//   },
//   {
//     date: "2024-07-18",
//     clueMainBefore:
//       'The English name (Country) comes directly from the Portuguese word Guin� which emerged in the mid-15th century to refer to the lands inhabited by the black African peoples south of the Senegal River, in contrast to the "tawny" Zenaga Berbers above it, whom they called Azengues or Moors. The land that is now (Country) either bordered or was situated within a series of historic African empires before the French arrived in the 1890s and claimed the terrain as part of colonial French West Africa. (Country) declared independence from France on 2 October 1958.',
//     clueImage: "Use any sample",
//     clueMainAfter:
//       'The English term Guinea comes directly from the Portuguese word Guin� which emerged in the mid-15th century to refer to the lands inhabited by the black African peoples south of the Senegal River, in contrast to the "tawny" Zenaga Berbers above it, whom they called Azengues or Moors. The land that is now Guinea either bordered or was situated within a series of historic African empires before the French arrived in the 1890s and claimed the terrain as part of colonial French West Africa. Guinea declared independence from France on 2 October 1958.',
//     category: "country",
//     answer: "Guinea",
//     CountryQuestion: {
//       countryName: "Guinea",
//       clueLatLong: { lat: "9.9 N", long: "9.7 W" },
//       clueFlag: "images/flags/gn.svg",
//       clueCapital: "Conakry",
//       wikiLink: "https://en.wikipedia.org/wiki/Guinea"
//     }
//   },
//   {
//     date: "2024-07-19",
//     clueMainBefore:
//       "Upon the death of Elizabeth II of the UK, Hassanal Bolkiah became the world's longest-reigning current monarch (his reign started over 56 years ago). Like his father, he was knighted by Elizabeth II. At an estimated net worth of $30 billion, he has been ranked among the wealthiest individuals in the world. Recently, his son's lavish 10-day wedding celebrations have been in the news. Which country is he the head of state of?",
//     clueImage: "Use any sample",
//     clueMainAfter:
//       "Upon the death of Elizabeth II of the UK, Hassanal Bolkiah of Brunei became the world's longest-reigning current monarch (his reign started over 56 years ago). Like his father, he was knighted by Elizabeth II. At an estimated net worth of $30 billion, he has been ranked among the wealthiest individuals in the world. Recently, his son's lavish 10-day wedding celebrations have been in the news.",
//     category: "country",
//     answer: "Brunei",
//     CountryQuestion: {
//       countryName: "Brunei",
//       clueLatLong: { lat: "4.5 N", long: "114.7 E" },
//       clueFlag: "images/flags/bn.svg",
//       clueCapital: "Bandar Seri Begawan",
//       wikiLink: "https://en.wikipedia.org/wiki/Brunei"
//     }
//   },
//   {
//     date: "2024-07-20",
//     clueMainBefore:
//       "X is a 15th-century citadel located in southern (Country) and one of the new 7 Wonders of the World. The civilization which built it had no written language, as a result there are no existing written records detailing the site during its period of active use. Modern archaeologists have carefully deduced the names of the buildings, their supposed uses, and their inhabitants based on physical evidence, including tombs at the site. Which site in which country?",
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       "Machu Picchu is a 15th-century Inca citadel located in southern Peru and one of the new 7 Wonders of the World. The Inca civilization had no written language, as a result there are no existing written records detailing the site during its period of active use. Modern archaeologists have carefully deduced the names of the buildings, their supposed uses, and their inhabitants based on physical evidence, including tombs at the site.",
//     category: "country",
//     answer: "Peru",
//     CountryQuestion: {
//       countryName: "Peru",
//       clueLatLong: { lat: "9.2 S", long: "75 W" },
//       clueFlag: "images/flags/pe.svg",
//       clueCapital: "Lima",
//       wikiLink: "https://en.wikipedia.org/wiki/Peru"
//     }
//   },
//   {
//     date: "2024-07-21",
//     clueMainBefore:
//       'Following the collapse of the Soviet Union, the Constitution of (Country) enshrined "permanent neutrality" as a fundamental principle of the state. (Country)\'s stance is absolute - it refrains from participating in any military activity, even peacekeeping missions, and avoids entering into security pacts or alliances. However, balancing absolute neutrality with its own interests can be challenging. Heavy reliance on energy exports to China and Russia raises questions about maintaining true neutrality. Water-sharing disputes with Uzbekistan, and narcotics trafficking through the long border with Afghanistan remain unresolved international disputes for (Country).',
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       'Following the collapse of the Soviet Union, the Constitution of Turkmenistan enshrined "permanent neutrality" as a fundamental principle of the state. Turkmenistan\'s stance is absolute - it refrains from participating in any military activity, even peacekeeping missions, and avoids entering into security pacts or alliances. However, balancing absolute neutrality with its own interests can be challenging. Heavy reliance on energy exports to China and Russia raises questions about maintaining true neutrality. Water-sharing disputes with Uzbekistan, and narcotics trafficking through the long border with Afghanistan remain unresolved international disputes for Turkmenistan.',
//     category: "country",
//     answer: "Turkmenistan",
//     CountryQuestion: {
//       countryName: "Turkmenistan",
//       clueLatLong: { lat: "39 N", long: "59.6 E" },
//       clueFlag: "images/flags/tm.svg",
//       clueCapital: "Ashgabat",
//       wikiLink: "https://en.wikipedia.org/wiki/Turkmenistan"
//     }
//   },
//   {
//     date: "2024-07-22",
//     clueMainBefore:
//       'The flag of (Country) is one of three national flags to feature a dragon. It alludes to the Dzongkha (local language) name of (Country) � Druk Yul ("Dragon Country" or "Dragon Kingdom") � as well as the Drukpa Lineage of Tibetan Buddhism, which is the dominant religion of (Country).',
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       'The national flag of Bhutan is one of three national flags to feature a dragon, the other two being Wales and Malta. It alludes to the Dzongkha (local language) name of Bhutan � Druk Yul ("Dragon Country" or "Dragon Kingdom") � as well as the Drukpa Lineage of Tibetan Buddhism, which is the dominant religion of Bhutan.',
//     category: "country",
//     answer: "Bhutan",
//     CountryQuestion: {
//       countryName: "Bhutan",
//       clueLatLong: { lat: "27.5 N", long: "90.4 E" },
//       clueFlag: "images/flags/bt.svg",
//       clueCapital: "Thimphu",
//       wikiLink: "https://en.wikipedia.org/wiki/Bhutan"
//     }
//   },
//   {
//     date: "2024-07-23",
//     clueMainBefore:
//       "On 1 June 2001, Crown Prince X opened fire at a house at the residence of the (Adjectival) monarchy, where a party was being held. He shot and killed his father, the King, his mother, the Queen, and seven other members of the royal family including his younger brother and sister before shooting himself in the head. Due to his wiping out of most of the line of succession, X himself became king while in a comatose state from the head wound.",
//     clueImage: "Use any sample",
//     clueMainAfter:
//       "On 1 June 2001, Crown Prince Dipendra opened fire at a house on the grounds of the Narayanhity Palace, the residence of the Nepalese monarchy, where a party was being held. He shot and killed his father, King Birendra, his mother, Queen Aishwarya, and seven other members of the royal family including his younger brother and sister before shooting himself in the head. Due to his wiping out of most of the line of succession, Dipendra became king while in a comatose state from the head wound.",
//     category: "country",
//     answer: "Nepal",
//     CountryQuestion: {
//       countryName: "Nepal",
//       clueLatLong: { lat: "28.4 N", long: "84.1 E" },
//       clueFlag: "images/flags/np.svg",
//       clueCapital: "Kathmandu",
//       wikiLink: "https://en.wikipedia.org/wiki/Nepal"
//     }
//   },
//   {
//     date: "2024-07-24",
//     clueMainBefore:
//       "This country, in the horn of Africa, is named after its own capital. It has the smallest population among all countries on mainland Africa. Due to its strategic location at the junction of the Red Sea and Gulf of Aden, it serves as a key refuelling and transshipment center, and a major maritime port. It is also the site of various foreign military bases.",
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       "Djibouti, in the horn of Africa, is named after its own capital (the city of Djibouti). It has the smallest population among all countries on mainland Africa. Due to its strategic location at the junction of the Red Sea and Gulf of Aden, it serves as a key refuelling and transshipment center, and a major maritime port. It is also the site of various foreign military bases.",
//     category: "country",
//     answer: "Djibouti",
//     CountryQuestion: {
//       countryName: "Djibouti",
//       clueLatLong: { lat: "11.8 N", long: "42.6 E" },
//       clueFlag: "images/flags/dj.svg",
//       clueCapital: "Djibouti",
//       wikiLink: "https://en.wikipedia.org/wiki/Djibouti"
//     }
//   },
//   {
//     date: "2024-07-25",
//     clueMainBefore:
//       "Before the discovery of oil, (Country) was a strategic trade port between Mesopotamia, Persia and India. In 1946, crude oil was exported for the first time. From 1946 to 1982, the country underwent large-scale modernization, largely based on income from oil production. In the 1980s, (Country) experienced a period of geopolitical instability and an economic crisis following the stock market crash. In 1990, after oil production disputes with neighbouring Iraq, (Country) was invaded, and later annexed into one of Iraq's governorates by Iraq under Saddam Hussein. The Iraqi occupation of (Country) came to an end on February 26, 1991, after military intervention by a coalition led by the United States.",
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       "Before the discovery of oil, Kuwait was a strategic trade port between Mesopotamia, Persia and India. In 1946, crude oil was exported for the first time. From 1946 to 1982, the country underwent large-scale modernization, largely based on income from oil production. In the 1980s, Kuwait experienced a period of geopolitical instability and an economic crisis following the stock market crash. In 1990, after oil production disputes with neighbouring Iraq, Kuwait was invaded, and later annexed into one of Iraq's governorates by Iraq under Saddam Hussein. The Iraqi occupation of Kuwait came to an end on February 26, 1991, after military intervention by a coalition led by the United States.",
//     category: "country",
//     answer: "Kuwait",
//     CountryQuestion: {
//       countryName: "Kuwait",
//       clueLatLong: { lat: "29.3 N", long: "47.5 E" },
//       clueFlag: "images/flags/kw.svg",
//       clueCapital: "Kuwait City",
//       wikiLink: "https://en.wikipedia.org/wiki/Kuwait"
//     }
//   },
//   {
//     date: "2024-07-26",
//     clueMainBefore:
//       "The _______ Army has more than 8,000 soldiers, 130 chariots with 520 horses, and 150 cavalry horses. Since its creation over 2000 years ago, it has been serving its objective of protecting the emperor of (Country). Unique materials and techniques have been used to give the army strength, durability, and resistance to weather, ensuring their longevity. The soldiers vary in height according to their rank, the tallest being the generals.",
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       "The Terracotta Army has more than 8,000 soldiers, 130 chariots with 520 horses, and 150 cavalry horses. Since its creation over 2000 years ago, it has been serving its objective of protecting Qin Shi Huang, the first emperor of China, in his afterlife. Unique materials and techniques have been used to give the army strength, durability, and resistance to weather, ensuring their longevity. The soldiers vary in height according to their rank, the tallest being the generals.",
//     category: "country",
//     answer: "China",
//     CountryQuestion: {
//       countryName: "China",
//       clueLatLong: { lat: "35.9 N", long: "104.2 E" },
//       clueFlag: "images/flags/cn.svg",
//       clueCapital: "Beijing",
//       wikiLink: "https://en.wikipedia.org/wiki/China"
//     }
//   },
//   {
//     date: "2024-07-27",
//     clueMainBefore:
//       "The (Country) Barrier Reef is a 300-kilometre long section of the 900-kilometre Mesoamerican Barrier Reef System, making it the second largest coral reef system in the world after the Great Barrier Reef in Australia. It is (Country)'s top tourist destination, popular for scuba diving and snorkeling. Tourists also flock to the Great Blue Hole, a giant marine sinkhole off the coast of (Country). The hole is 318 m across and 124 m deep. Jacques Cousteau, co-inventor of SCUBA, declared it one of the top five scuba diving sites in the world.",
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       "The Belize Barrier Reef is a 300-kilometre long section of the 900-kilometre Mesoamerican Barrier Reef System, making it the second largest coral reef system in the world after the Great Barrier Reef in Australia. It is Belize's top tourist destination, popular for scuba diving and snorkeling. Tourists also flock to the Great Blue Hole, a giant marine sinkhole off the coast of Belize. The hole is 318 m across and 124 m deep. Jacques Cousteau, co-inventor of SCUBA, declared it one of the top five scuba diving sites in the world.",
//     category: "country",
//     answer: "Belize",
//     CountryQuestion: {
//       countryName: "Belize",
//       clueLatLong: { lat: "17.2 N", long: "88.5 W" },
//       clueFlag: "images/flags/bz.svg",
//       clueCapital: "Belmopan",
//       wikiLink: "https://en.wikipedia.org/wiki/Belize"
//     }
//   },
//   {
//     date: "2024-07-28",
//     clueMainBefore:
//       "(Country) hosts the world's largest refugee camp - the Kutupalong refugee camp. The camp has a population of close to 600 thousand in a total area of just 5 square miles. It is inhabited mostly by Rohingya refugees who fled from ethnic and religious persecution in (Neighboring Country). While the camp began informally in 1991, extensive attacks in 2016-17 by (Neighbor)'s military and local civilians, drove hundreds of thousands of Rohingya to flee into (Country), swelling the camp.",
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       "Bangladesh hosts the world's largest refugee camp - the Kutupalong refugee camp. The camp has a population of close to 600 thousand in a total area of just 5 square miles. It is inhabited mostly by Rohingya refugees who fled from ethnic and religious persecution in neighboring Myanmar. While the camp began informally in 1991, extensive attacks in 2016-17 by Myanmar's military and local civilians, drove hundreds of thousands of Rohingya to flee into Bangladesh, swelling the camp.",
//     category: "country",
//     answer: "Bangladesh",
//     CountryQuestion: {
//       countryName: "Bangladesh",
//       clueLatLong: { lat: "23.7 N", long: "90.4 E" },
//       clueFlag: "images/flags/bd.svg",
//       clueCapital: "Dhaka",
//       wikiLink: "https://en.wikipedia.org/wiki/Bangladesh"
//     }
//   },
//   {
//     date: "2024-07-29",
//     clueMainBefore:
//       "(Country) is a land of interesting contradictions. While some studies suggest that a lush wetland in (Country) was the birthplace of all modern humans, today the country is 70% desert and one of the most sparsely populated countries in the world. It is among the top 3 diamond producing nations, as well as the top 3 in HIV prevalence rates, with over 20% of the population infected. It has gone from one of the poorest countries to an upper-middle income country over the last 50 years. ",
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       "Botswana is a land of interesting contradictions. While some studies suggest that a lush wetland in Botswana was the birthplace of all modern humans, today the country is 70% desert and one of the most sparsely populated countries in the world. It is among the top 3 diamond producing nations, as well as the top 3 in HIV prevalence rates, with over 20% of the population infected. It has gone from one of the poorest countries to an upper-middle income country over the last 50 years. ",
//     category: "country",
//     answer: "Botswana",
//     CountryQuestion: {
//       countryName: "Botswana",
//       clueLatLong: { lat: "22.3 S", long: "24.7 E" },
//       clueFlag: "images/flags/bw.svg",
//       clueCapital: "Gaborone",
//       wikiLink: "https://en.wikipedia.org/wiki/Botswana"
//     }
//   },
//   {
//     date: "2024-07-30",
//     clueMainBefore:
//       "The Treaty of Friendship, Cooperation and Mutual Assistance (TFCMA), better known as the (City) Pact, was a collective defense treaty signed in (Capital City of Country) between the Soviet Union and seven other Eastern Bloc socialist republics of Europe in 1955. It was established as a balance of power or counterweight to NATO and the Western Bloc, during the Cold War. NATO and the (City) Pact never directly waged war against each other in Europe; but implemented strategic policies aimed at the containment of each other in Europe, while working and fighting for influence within the wider Cold War on the international stage. The pact began to unravel with the spread of the Revolutions of 1989 through the Eastern Bloc, beginning with the Solidarity movement in (Country).",
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       "The Treaty of Friendship, Cooperation and Mutual Assistance (TFCMA), better known as the Warsaw Pact, was a collective defense treaty signed in Warsaw, Poland, between the Soviet Union and seven other Eastern Bloc socialist republics of Europe in 1955. It was established as a balance of power or counterweight to NATO and the Western Bloc, during the Cold War. NATO and the Warsaw Pact never directly waged war against each other in Europe; but implemented strategic policies aimed at the containment of each other in Europe, while working and fighting for influence within the wider Cold War on the international stage. The pact began to unravel with the spread of the Revolutions of 1989 through the Eastern Bloc, beginning with the Solidarity movement in Poland.",
//     category: "country",
//     answer: "Poland",
//     CountryQuestion: {
//       countryName: "Poland",
//       clueLatLong: { lat: "51.9 N", long: "19.1 E" },
//       clueFlag: "images/flags/pl.svg",
//       clueCapital: "Warsaw",
//       wikiLink: "https://en.wikipedia.org/wiki/Poland"
//     }
//   },
//   {
//     date: "2024-07-31",
//     clueMainBefore:
//       "Ba'athism is an Arab nationalist ideology which promotes the creation and development of a unified Arab state through the leadership of a vanguard party over a socialist revolutionary government. Ba'athism is based on the principles of secularism, Arab nationalism, pan-Arabism, and Arab socialism. Two Ba'athist states have existed - (Country) and Syria. The Ba'athist party of (Country) was officially banned in 2003, but continues to function underground.",
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       "Ba'athism is an Arab nationalist ideology which promotes the creation and development of a unified Arab state through the leadership of a vanguard party over a socialist revolutionary government. Ba'athism is based on the principles of secularism, Arab nationalism, pan-Arabism, and Arab socialism. Two Ba'athist states have existed - Iraq and Syria. The Ba'athist party of Iraq was officially banned in 2003, but continues to function underground.",
//     category: "country",
//     answer: "Iraq",
//     CountryQuestion: {
//       countryName: "Iraq",
//       clueLatLong: { lat: "33.2 N", long: "43.7 E" },
//       clueFlag: "images/flags/iq.svg",
//       clueCapital: "Baghdad",
//       wikiLink: "https://en.wikipedia.org/wiki/Iraq"
//     }
//   },
//   {
//     date: "2024-08-01",
//     clueMainBefore:
//       "(Country)'s 20th century was forged in fire. The First Indochina War (1946-54) freed them from French rule, only to launch them into a 20-year long brutal clash between North and South, killing between 1 and 4 million. In 1975, (Country) reunified. In 1978, the neighboring government ordered massacres of (demonym) residents in villages along the border, prompting (Country) to invade Cambodia. The intervention was a success, resulting in the establishment of a new, pro-(Country) socialist government in the neighboring country. However, this worsened relations with China, which had supported the neighbor. China later launched a brief incursion into northern (Country) in 1979.",
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       "Vietnam's 20th century was forged in fire. The First Indochina War (1946-54) freed them from French rule, only to launch them into a 20-year long brutal clash between North and South, killing between 1 and 4 million. In 1975, Vietnam reunified. In 1978, the neighboring government ordered massacres of Vietnamese residents in villages along the border, prompting the Vietnamese military to invade Cambodia. The intervention was a success, resulting in the establishment of a new, pro-Vietnam socialist government. However, this worsened relations with China, which had supported the Khmer Rouge. China later launched a brief incursion into northern Vietnam in 1979.",
//     category: "country",
//     answer: "Vietnam",
//     CountryQuestion: {
//       countryName: "Vietnam",
//       clueLatLong: { lat: "14.1 N", long: "108.3 E" },
//       clueFlag: "images/flags/vn.svg",
//       clueCapital: "Hanoi",
//       wikiLink: "https://en.wikipedia.org/wiki/Vietnam"
//     }
//   },
//   {
//     date: "2024-08-02",
//     clueMainBefore:
//       'A (Capital City) Rose is a type of memorial in (Capital City) made from concrete scar caused by a mortar shell\'s explosion that was later filled with red resin. Mortar rounds landing on concrete during the siege of (Capital City) created a unique fragmentation pattern that looks almost floral in arrangement, and therefore have been named "rose". There are around 200 "roses" in the entire city, and they are marked on locations where at least three people were killed during the siege. Which country\'s capital has these roses?',
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       'A Sarajevo Rose is a type of memorial in Sarajevo made from concrete scar caused by a mortar shell\'s explosion that was later filled with red resin. Mortar rounds landing on concrete during the siege of Sarajevo created a unique fragmentation pattern that looks almost floral in arrangement, and therefore have been named "rose". There are around 200 "roses" in the entire city, and they are marked on locations where at least three people were killed during the siege of Sarajevo.',
//     category: "country",
//     answer: "Bosnia and Herzegovina",
//     CountryQuestion: {
//       countryName: "Bosnia and Herzegovina",
//       clueLatLong: { lat: "43.9 N", long: "17.7 E" },
//       clueFlag: "images/flags/ba.svg",
//       clueCapital: "Sarajevo",
//       wikiLink: "https://en.wikipedia.org/wiki/Bosnia_and_Herzegovina"
//     }
//   },
//   {
//     date: "2024-08-03",
//     clueMainBefore:
//       'Under Napoleon\'s First French Empire (1804�1814), popular (Adjectival) nationalism thrived in the reorganized (Adjectival) states. Due in part to the shared experience, albeit under French dominance, various justifications emerged to identify "(Country)" as a potential future single state. The unification of (Country) commenced on 18 August 1866 with the establishment of the North (Adjectival) Confederation, initially a military alliance. The process symbolically concluded when most of the southern states joined the Confederation with the ceremonial proclamation of the (Adjectival) Empire having 25 member states and led by the Kingdom of Prussia of Hohenzollerns on 18 January 1871.',
//     clueImage: "Use any sample",
//     clueMainAfter:
//       'Under Napoleon\'s First French Empire (1804�1814), popular German nationalism thrived in the reorganized German states. Due in part to the shared experience, albeit under French dominance, various justifications emerged to identify "Germany" as a potential future single state. The unification of Germany commenced on 18 August 1866 with the establishment of the North German Confederation, initially a military alliance. The process symbolically concluded when most of the south German states joined the North German Confederation with the ceremonial proclamation of the German Empire having 25 member states and led by the Kingdom of Prussia of Hohenzollerns on 18 January 1871.',
//     category: "country",
//     answer: "Germany",
//     CountryQuestion: {
//       countryName: "Germany",
//       clueLatLong: { lat: "51.2 N", long: "10.5 E" },
//       clueFlag: "images/flags/de.svg",
//       clueCapital: "Berlin",
//       wikiLink: "https://en.wikipedia.org/wiki/Germany"
//     }
//   },
//   {
//     date: "2024-08-04",
//     clueMainBefore:
//       "Easter Island is an island and special territory of (Country) in the Pacific Ocean, at the southeasternmost point of the Polynesian Triangle in Oceania. It is famous for the monolithic human figures, called Moai, carved by the Rapa Nui people between the years 1250 and 1500. Nearly half are still at the main moai quarry but hundreds were transported from there and set on stone platforms around the island's perimeter. Almost all moai have famously large heads, which comprise three-eighths the size of the whole statue. Which country annexed the Easter island in 1888 and counts it as a 'Special Territory' today?",
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       "Easter Island is an island and special territory of Chile in the Pacific Ocean, at the southeasternmost point of the Polynesian Triangle in Oceania. It is famous for the monolithic human figures, called Moai, carved by the Rapa Nui people between the years 1250 and 1500. Nearly half are still at the main moai quarry but hundreds were transported from there and set on stone platforms called ahu around the island's perimeter. Almost all moai have famously large heads, which comprise three-eighths the size of the whole statue.",
//     category: "country",
//     answer: "Chile",
//     CountryQuestion: {
//       countryName: "Chile",
//       clueLatLong: { lat: "35.7 S", long: "71.5 W" },
//       clueFlag: "images/flags/cl.svg",
//       clueCapital: "Santiago",
//       wikiLink: "https://en.wikipedia.org/wiki/Chile"
//     }
//   },
//   {
//     date: "2024-07-06",
//     clueMainBefore:
//       "A widowed former reverend living with his children and brother on a Pennsylvania farm finds mysterious crop circles in their fields, which suggests something more frightening to come.",
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       "A widowed former reverend living with his children and brother on a Pennsylvania farm finds mysterious crop circles in their fields, which suggests something more frightening to come.",
//     category: "movie",
//     answer: "Signs",
//     MovieQuestion: {
//       movieName: "Signs",
//       clueYear: 2002,
//       clueDirector: "director Signs",
//       clueCast: "cast Signs",
//       imdbLink: "https://www.imdb.com/title/tt0286106/"
//     }
//   },
//   {
//     date: "2024-07-07",
//     clueMainBefore:
//       "A man learns something extraordinary about himself after a devastating accident.",
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       "A man learns something extraordinary about himself after a devastating accident.",
//     category: "movie",
//     answer: "Unbreakable",
//     MovieQuestion: {
//       movieName: "Unbreakable",
//       clueYear: 2000,
//       clueDirector: "director Unbreakable",
//       clueCast: "cast Unbreakable",
//       imdbLink: "https://www.imdb.com/title/tt0217869/"
//     }
//   },
//   {
//     date: "2024-07-08",
//     clueMainBefore:
//       "A young couple travels to a remote island to eat at an exclusive restaurant with some shocking surprises.",
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       "A young couple travels to a remote island to eat at an exclusive restaurant with some shocking surprises.",
//     category: "movie",
//     answer: "The Menu",
//     MovieQuestion: {
//       movieName: "The Menu",
//       clueYear: 2022,
//       clueDirector: "director The Menu",
//       clueCast: "cast The Menu",
//       imdbLink: "https://www.imdb.com/title/tt9764362/"
//     }
//   },
//   {
//     date: "2024-07-09",
//     clueMainBefore:
//       "Through a series of freak occurrences, a group of actors shooting a big-budget war movie are forced to become the soldiers they are portraying.",
//     clueImage: "Use any sample",
//     clueMainAfter:
//       "Through a series of freak occurrences, a group of actors shooting a big-budget war movie are forced to become the soldiers they are portraying.",
//     category: "movie",
//     answer: "Tropic Thunder",
//     MovieQuestion: {
//       movieName: "Tropic Thunder",
//       clueYear: 2008,
//       clueDirector: "director Tropic Thunder",
//       clueCast: "cast Tropic Thunder",
//       imdbLink: "https://www.imdb.com/title/tt0942385/"
//     }
//   },
//   {
//     date: "2024-07-10",
//     clueMainBefore:
//       "A human soldier is sent from 2029 to 1984 to stop a cyborg killing machine, sent from the same year, which has been programmed to execute a young woman whose unborn son is the key to humanity's future salvation.",
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       "A human soldier is sent from 2029 to 1984 to stop a cyborg killing machine, sent from the same year, which has been programmed to execute a young woman whose unborn son is the key to humanity's future salvation.",
//     category: "movie",
//     answer: "The Terminator",
//     MovieQuestion: {
//       movieName: "The Terminator",
//       clueYear: 1984,
//       clueDirector: "director The Terminator",
//       clueCast: "cast The Terminator",
//       imdbLink: "https://www.imdb.com/title/tt0088247/"
//     }
//   },
//   {
//     date: "2024-07-11",
//     clueMainBefore:
//       "Malcolm Crowe, a child psychologist, starts treating a young boy, Cole, with his unique affliction. In turn, Cole helps Malcolm reconcile with his estranged wife.",
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       "Malcolm Crowe, a child psychologist, starts treating a young boy, Cole, with his unique affliction. In turn, Cole helps Malcolm reconcile with his estranged wife.",
//     category: "movie",
//     answer: "The Sixth Sense",
//     MovieQuestion: {
//       movieName: "The Sixth Sense",
//       clueYear: 1999,
//       clueDirector: "director The Sixth Sense",
//       clueCast: "cast The Sixth Sense",
//       imdbLink: "https://www.imdb.com/title/tt0167404/"
//     }
//   },
//   {
//     date: "2024-07-12",
//     clueMainBefore:
//       "A team of commandos on a mission in a Central American jungle find themselves hunted by an extraterrestrial warrior.",
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       "A team of commandos on a mission in a Central American jungle find themselves hunted by an extraterrestrial warrior.",
//     category: "movie",
//     answer: "Predator",
//     MovieQuestion: {
//       movieName: "Predator",
//       clueYear: 1987,
//       clueDirector: "director Predator",
//       clueCast: "cast Predator",
//       imdbLink: "https://www.imdb.com/title/tt0093773/"
//     }
//   },
//   {
//     date: "2024-07-13",
//     clueMainBefore:
//       "In Ancient Polynesia, when a terrible curse incurred by the Demigod Maui reaches her island, the protagonist answers the Ocean's call to seek out the Demigod to set things right.",
//     clueImage: "Use any sample",
//     clueMainAfter:
//       "In Ancient Polynesia, when a terrible curse incurred by the Demigod Maui reaches her island, the protagonist answers the Ocean's call to seek out the Demigod to set things right.",
//     category: "movie",
//     answer: "Moana",
//     MovieQuestion: {
//       movieName: "Moana",
//       clueYear: 2016,
//       clueDirector: "director Moana",
//       clueCast: "cast Moana",
//       imdbLink: "https://www.imdb.com/title/tt3521164/"
//     }
//   },
//   {
//     date: "2024-07-14",
//     clueMainBefore:
//       "After a woman leaves a briefcase at the airport terminal, a limo driver and his friend set out on a hilarious cross-country road trip to Aspen to return it.",
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       "After a woman leaves a briefcase at the airport terminal, a limo driver and his friend set out on a hilarious cross-country road trip to Aspen to return it.",
//     category: "movie",
//     answer: "Dumb and Dumber",
//     MovieQuestion: {
//       movieName: "Dumb and Dumber",
//       clueYear: 1994,
//       clueDirector: "director Dumb and Dumber",
//       clueCast: "cast Dumb and Dumber",
//       imdbLink: "https://www.imdb.com/title/tt0109686/"
//     }
//   },
//   {
//     date: "2024-07-15",
//     clueMainBefore:
//       "After a job gone wrong, hitman Ray and his partner await orders from their ruthless boss in Belgium, the last place in the world Ray wants to be.",
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       "After a job gone wrong, hitman Ray and his partner await orders from their ruthless boss in Belgium, the last place in the world Ray wants to be.",
//     category: "movie",
//     answer: "In Bruges",
//     MovieQuestion: {
//       movieName: "In Bruges",
//       clueYear: 2008,
//       clueDirector: "director In Bruges",
//       clueCast: "cast In Bruges",
//       imdbLink: "https://www.imdb.com/title/tt0780536/"
//     }
//   },
//   {
//     date: "2024-07-16",
//     clueMainBefore:
//       "A workaholic architect finds a universal remote that allows him to fast-forward and rewind to different parts of his life. Complications arise when the remote starts to overrule his choices.",
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       "A workaholic architect finds a universal remote that allows him to fast-forward and rewind to different parts of his life. Complications arise when the remote starts to overrule his choices.",
//     category: "movie",
//     answer: "Click",
//     MovieQuestion: {
//       movieName: "Click",
//       clueYear: 2006,
//       clueDirector: "director Click",
//       clueCast: "cast Click",
//       imdbLink: "https://www.imdb.com/title/tt0389860/"
//     }
//   },
//   {
//     date: "2024-07-17",
//     clueMainBefore:
//       "Eddy persuades his three pals to pool money for a vital poker game against a powerful local mobster, Hatchet Harry. Eddy loses, after which Harry gives him a week to pay back 500,000 pounds.",
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       "Eddy persuades his three pals to pool money for a vital poker game against a powerful local mobster, Hatchet Harry. Eddy loses, after which Harry gives him a week to pay back 500,000 pounds.",
//     category: "movie",
//     answer: "Lock, Stock and Two Smoking Barrels",
//     MovieQuestion: {
//       movieName: "Lock, Stock and Two Smoking Barrels",
//       clueYear: 1998,
//       clueDirector: "director Lock, Stock and Two Smoking Barrels",
//       clueCast: "cast Lock, Stock and Two Smoking Barrels",
//       imdbLink: "https://www.imdb.com/title/tt0120735/"
//     }
//   },
//   {
//     date: "2024-07-18",
//     clueMainBefore:
//       "The early years of James Logan, featuring his rivalry with his brother Victor Creed, his service in the special forces team Weapon X, and his experimentation into a metal-lined mutant.",
//     clueImage: "Use any sample",
//     clueMainAfter:
//       "The early years of James Logan, featuring his rivalry with his brother Victor Creed, his service in the special forces team Weapon X, and his experimentation into a metal-lined mutant.",
//     category: "movie",
//     answer: "X-Men Origins: Wolverine",
//     MovieQuestion: {
//       movieName: "X-Men Origins: Wolverine",
//       clueYear: 2009,
//       clueDirector: "director X-Men Origins: Wolverine",
//       clueCast: "cast X-Men Origins: Wolverine",
//       imdbLink: "https://www.imdb.com/title/tt0458525/"
//     }
//   },
//   {
//     date: "2024-07-19",
//     clueMainBefore:
//       "Six Los Angeles celebrities are stuck in James Franco's house after a series of devastating events just destroyed the city. Inside, the group not only have to face the apocalypse, but themselves.",
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       "Six Los Angeles celebrities are stuck in James Franco's house after a series of devastating events just destroyed the city. Inside, the group not only have to face the apocalypse, but themselves.",
//     category: "movie",
//     answer: "This Is the End",
//     MovieQuestion: {
//       movieName: "This Is the End",
//       clueYear: 2013,
//       clueDirector: "director This Is the End",
//       clueCast: "cast This Is the End",
//       imdbLink: "https://www.imdb.com/title/tt1245492/"
//     }
//   },
//   {
//     date: "2024-07-20",
//     clueMainBefore:
//       "Nina is a talented but unstable artist on the verge of stardom. Pushed to the breaking point by her artistic director and a seductive rival, Nina's grip on reality slips, plunging her into a waking nightmare.",
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       "Nina is a talented but unstable artist on the verge of stardom. Pushed to the breaking point by her artistic director and a seductive rival, Nina's grip on reality slips, plunging her into a waking nightmare.",
//     category: "movie",
//     answer: "Black Swan",
//     MovieQuestion: {
//       movieName: "Black Swan",
//       clueYear: 2010,
//       clueDirector: "director Black Swan",
//       clueCast: "cast Black Swan",
//       imdbLink: "https://www.imdb.com/title/tt0947798/"
//     }
//   },
//   {
//     date: "2024-07-21",
//     clueMainBefore:
//       "When their relationship turns sour, a couple undergoes a medical procedure to have each other erased from their memories for ever.",
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       "When their relationship turns sour, a couple undergoes a medical procedure to have each other erased from their memories for ever.",
//     category: "movie",
//     answer: "Eternal Sunshine of the Spotless Mind",
//     MovieQuestion: {
//       movieName: "Eternal Sunshine of the Spotless Mind",
//       clueYear: 2004,
//       clueDirector: "director Eternal Sunshine of the Spotless Mind",
//       clueCast: "cast Eternal Sunshine of the Spotless Mind",
//       imdbLink: "https://www.imdb.com/title/tt0338013/"
//     }
//   },
//   {
//     date: "2024-07-22",
//     clueMainBefore:
//       "A wisecracking mercenary gets experimented on and becomes immortal yet hideously scarred, and sets out to track down the man who ruined his looks.",
//     clueImage: "Use any sample",
//     clueMainAfter:
//       "A wisecracking mercenary gets experimented on and becomes immortal yet hideously scarred, and sets out to track down the man who ruined his looks.",
//     category: "movie",
//     answer: "Deadpool",
//     MovieQuestion: {
//       movieName: "Deadpool",
//       clueYear: 2016,
//       clueDirector: "director Deadpool",
//       clueCast: "cast Deadpool",
//       imdbLink: "https://www.imdb.com/title/tt1431045/"
//     }
//   },
//   {
//     date: "2024-07-23",
//     clueMainBefore:
//       "A young German boy in the Hitler Youth whose hero and imaginary friend is the country's dictator is shocked to discover that his mother is hiding a Jewish girl in their home.",
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       "A young German boy in the Hitler Youth whose hero and imaginary friend is the country's dictator is shocked to discover that his mother is hiding a Jewish girl in their home.",
//     category: "movie",
//     answer: "Jojo Rabbit",
//     MovieQuestion: {
//       movieName: "Jojo Rabbit",
//       clueYear: 2019,
//       clueDirector: "director Jojo Rabbit",
//       clueCast: "cast Jojo Rabbit",
//       imdbLink: "https://www.imdb.com/title/tt2584384/"
//     }
//   },
//   {
//     date: "2024-07-24",
//     clueMainBefore:
//       "A young programmer is selected to participate in a ground-breaking experiment in synthetic intelligence by evaluating the human qualities of a highly advanced humanoid A.I.",
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       "A young programmer is selected to participate in a ground-breaking experiment in synthetic intelligence by evaluating the human qualities of a highly advanced humanoid A.I.",
//     category: "movie",
//     answer: "Ex Machina",
//     MovieQuestion: {
//       movieName: "Ex Machina",
//       clueYear: 2014,
//       clueDirector: "director Ex Machina",
//       clueCast: "cast Ex Machina",
//       imdbLink: "https://www.imdb.com/title/tt0470752/"
//     }
//   },
//   {
//     date: "2024-07-25",
//     clueMainBefore:
//       "In a city of anthropomorphic animals, a rookie bunny cop and a cynical con artist fox must work together to uncover a conspiracy.",
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       "In a city of anthropomorphic animals, a rookie bunny cop and a cynical con artist fox must work together to uncover a conspiracy.",
//     category: "movie",
//     answer: "Zootropolis",
//     MovieQuestion: {
//       movieName: "Zootropolis",
//       clueYear: 2016,
//       clueDirector: "director Zootropolis",
//       clueCast: "cast Zootropolis",
//       imdbLink: "https://www.imdb.com/title/tt2948356/"
//     }
//   },
//   {
//     date: "2024-07-26",
//     clueMainBefore:
//       "A nineteen-year-old girl returns to her childhood adventure, where she reunites with her old friends and learns of her true destiny: to end the Red Queen's reign of terror.",
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       "A nineteen-year-old girl returns to her childhood adventure, where she reunites with her old friends and learns of her true destiny: to end the Red Queen's reign of terror.",
//     category: "movie",
//     answer: "Alice in Wonderland",
//     MovieQuestion: {
//       movieName: "Alice in Wonderland",
//       clueYear: 2010,
//       clueDirector: "director Alice in Wonderland",
//       clueCast: "cast Alice in Wonderland",
//       imdbLink: "https://www.imdb.com/title/tt1014759/"
//     }
//   },
//   {
//     date: "2024-07-27",
//     clueMainBefore:
//       "A newly recruited night security guard discovers that an ancient curse causes strange things to happen at his workplace.",
//     clueImage: "Use any sample",
//     clueMainAfter:
//       "A newly recruited night security guard discovers that an ancient curse causes strange things to happen at his workplace.",
//     category: "movie",
//     answer: "Night at the Museum",
//     MovieQuestion: {
//       movieName: "Night at the Museum",
//       clueYear: 2006,
//       clueDirector: "director Night at the Museum",
//       clueCast: "cast Night at the Museum",
//       imdbLink: "https://www.imdb.com/title/tt0477347/"
//     }
//   },
//   {
//     date: "2024-07-28",
//     clueMainBefore:
//       "After visiting 2015, Marty must repeat his visit to 1955 to prevent disastrous changes to 1985...without interfering with his first trip.",
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       "After visiting 2015, Marty must repeat his visit to 1955 to prevent disastrous changes to 1985...without interfering with his first trip.",
//     category: "movie",
//     answer: "Back to the Future Part II",
//     MovieQuestion: {
//       movieName: "Back to the Future Part II",
//       clueYear: 1989,
//       clueDirector: "director Back to the Future Part II",
//       clueCast: "cast Back to the Future Part II",
//       imdbLink: "https://www.imdb.com/title/tt0096874/"
//     }
//   },
//   {
//     date: "2024-07-29",
//     clueMainBefore:
//       "When Jason is framed for a CIA operation gone awry, he is forced to resume his former life as a trained assassin to survive.",
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       "When Jason is framed for a CIA operation gone awry, he is forced to resume his former life as a trained assassin to survive.",
//     category: "movie",
//     answer: "The Bourne Supremacy",
//     MovieQuestion: {
//       movieName: "The Bourne Supremacy",
//       clueYear: 2004,
//       clueDirector: "director The Bourne Supremacy",
//       clueCast: "cast The Bourne Supremacy",
//       imdbLink: "https://www.imdb.com/title/tt0372183/"
//     }
//   },
//   {
//     date: "2024-07-30",
//     clueMainBefore:
//       "As students at the United States Navy's elite fighter weapons school compete to be best in the class, one daring young pilot learns a few things from a civilian instructor that are not taught in the classroom.",
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       "As students at the United States Navy's elite fighter weapons school compete to be best in the class, one daring young pilot learns a few things from a civilian instructor that are not taught in the classroom.",
//     category: "movie",
//     answer: "Top Gun",
//     MovieQuestion: {
//       movieName: "Top Gun",
//       clueYear: 1986,
//       clueDirector: "director Top Gun",
//       clueCast: "cast Top Gun",
//       imdbLink: "https://www.imdb.com/title/tt0092099/"
//     }
//   },
//   {
//     date: "2024-07-31",
//     clueMainBefore:
//       "A smart but sensible new graduate lands a job as an assistant to Miranda Priestly, the demanding editor-in-chief of a high fashion magazine.",
//     clueImage: "Use any sample",
//     clueMainAfter:
//       "A smart but sensible new graduate lands a job as an assistant to Miranda Priestly, the demanding editor-in-chief of a high fashion magazine.",
//     category: "movie",
//     answer: "The Devil Wears Prada",
//     MovieQuestion: {
//       movieName: "The Devil Wears Prada",
//       clueYear: 2006,
//       clueDirector: "director The Devil Wears Prada",
//       clueCast: "cast The Devil Wears Prada",
//       imdbLink: "https://www.imdb.com/title/tt0458352/"
//     }
//   },
//   {
//     date: "2024-08-01",
//     clueMainBefore:
//       "A research team in Antarctica is hunted by a shape-shifting alien that assumes the appearance of its victims.",
//     clueImage: "Use any sample",
//     clueMainAfter:
//       "A research team in Antarctica is hunted by a shape-shifting alien that assumes the appearance of its victims.",
//     category: "movie",
//     answer: "The Thing",
//     MovieQuestion: {
//       movieName: "The Thing",
//       clueYear: 1982,
//       clueDirector: "director The Thing",
//       clueCast: "cast The Thing",
//       imdbLink: "https://www.imdb.com/title/tt0084787/"
//     }
//   },
//   {
//     date: "2024-08-02",
//     clueMainBefore:
//       "In a future where people stop aging at 25, but are engineered to live only one more year, having the means to buy your way out of the situation is a shot at immortal youth. Here, Will Salas finds himself accused of murder and on the run with a hostage - a connection that becomes an important part of the way against the system.",
//     clueImage: "Use any sample",
//     clueMainAfter:
//       "In a future where people stop aging at 25, but are engineered to live only one more year, having the means to buy your way out of the situation is a shot at immortal youth. Here, Will Salas finds himself accused of murder and on the run with a hostage - a connection that becomes an important part of the way against the system.",
//     category: "movie",
//     answer: "In Time",
//     MovieQuestion: {
//       movieName: "In Time",
//       clueYear: 2011,
//       clueDirector: "director In Time",
//       clueCast: "cast In Time",
//       imdbLink: "https://www.imdb.com/title/tt1637688/"
//     }
//   },
//   {
//     date: "2024-08-03",
//     clueMainBefore:
//       "A Phoenix secretary embezzles $40,000 from her employer's client, goes on the run and checks into a remote motel run by a young man under the domination of his mother.",
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       "A Phoenix secretary embezzles $40,000 from her employer's client, goes on the run and checks into a remote motel run by a young man under the domination of his mother.",
//     category: "movie",
//     answer: "Psycho",
//     MovieQuestion: {
//       movieName: "Psycho",
//       clueYear: 1960,
//       clueDirector: "director Psycho",
//       clueCast: "cast Psycho",
//       imdbLink: "https://www.imdb.com/title/tt0054215/"
//     }
//   },
//   {
//     date: "2024-08-04",
//     clueMainBefore:
//       "In 2027, in a chaotic world in which women have somehow become infertile, a former activist agrees to help transport a miraculously pregnant woman to a sanctuary at sea.",
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       "In 2027, in a chaotic world in which women have somehow become infertile, a former activist agrees to help transport a miraculously pregnant woman to a sanctuary at sea.",
//     category: "movie",
//     answer: "Children of Men",
//     MovieQuestion: {
//       movieName: "Children of Men",
//       clueYear: 2006,
//       clueDirector: "director Children of Men",
//       clueCast: "cast Children of Men",
//       imdbLink: "https://www.imdb.com/title/tt0206634/"
//     }
//   },
//   {
//     date: "2024-08-05",
//     clueMainBefore:
//       "A young man and woman decide to take their friendship to the next level without becoming a couple, but soon discover that adding sex only leads to complications.",
//     clueImage: "Use any sample",
//     clueMainAfter:
//       "A young man and woman decide to take their friendship to the next level without becoming a couple, but soon discover that adding sex only leads to complications.",
//     category: "movie",
//     answer: "Friends with Benefits",
//     MovieQuestion: {
//       movieName: "Friends with Benefits",
//       clueYear: 2011,
//       clueDirector: "director Friends with Benefits",
//       clueCast: "cast Friends with Benefits",
//       imdbLink: "https://www.imdb.com/title/tt1632708/"
//     }
//   },
//   {
//     date: "2024-07-22",
//     clueMainBefore:
//       "X graduated from Keble College, Oxford. He began his international cricket career in 1971 and played until 1992, serving as the national team's captain intermittently between 1982 and 1992. X was later inducted into the ICC Cricket Hall of Fame. He founded a political party in 1996 and won a seat in the National Assembly in the 2002 general election, serving as an opposition member until 2007. In the 2018 general election, running on a populist platform, his party became the largest party in the National Assembly and formed a coalition government with independents with X as prime minister. ",
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       "Imran Khan graduated from Keble College, Oxford. He began his international cricket career in 1971 and played until 1992, serving as the national team's captain intermittently between 1982 and 1992. Khan was later inducted into the ICC Cricket Hall of Fame. He founded Pakistan Tehreek-e-Insaf (PTI) in 1996 and won a seat in the National Assembly in the 2002 general election, serving as an opposition member until 2007. In the 2018 general election, running on a populist platform, PTI became the largest party in the National Assembly and formed a coalition government with independents with Khan as prime minister. ",
//     category: "people",
//     answer: "Imran Khan",
//     PeopleQuestion: {
//       personName: "Imran Khan",
//       clueNationality: "Pakistan",
//       clueLifespan: "1952 - ",
//       clueInitials: "IK",
//       wikiLink: "https://en.wikipedia.org/wiki/Imran_Khan"
//     }
//   },
//   {
//     date: "2024-07-23",
//     clueMainBefore:
//       "X had a religious conversion experience after embarking on a pilgrimage to a monastery. He later travelled to Saint Petersburg and captivated a number of religious and social leaders, eventually becoming a prominent figure in Russian society. In November 1905, he met Nicholas II and his empress consort, Alexandra Feodorovna. He began acting as a faith healer for Nicholas' and Alexandra's only son, Alexei Nikolaevich, who suffered from haemophilia. He was a divisive figure at court, seen by some as a mystic, visionary and prophet, and by others as a religious charlatan.",
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       "Rasputin had a religious conversion experience after embarking on a pilgrimage to a monastery. He later travelled to Saint Petersburg and captivated a number of religious and social leaders, eventually becoming a prominent figure in Russian society. In November 1905, Rasputin met Nicholas II and his empress consort, Alexandra Feodorovna. He began acting as a faith healer for Nicholas' and Alexandra's only son, Alexei Nikolaevich, who suffered from haemophilia. He was a divisive figure at court, seen by some as a mystic, visionary and prophet, and by others as a religious charlatan.",
//     category: "people",
//     answer: "Grigori Rasputin",
//     PeopleQuestion: {
//       personName: "Grigori Rasputin",
//       clueNationality: "Russia",
//       clueLifespan: "1869 - 1916",
//       clueInitials: "GR",
//       wikiLink: "https://en.wikipedia.org/wiki/Grigori_Rasputin"
//     }
//   },
//   {
//     date: "2024-07-24",
//     clueMainBefore:
//       'X was nicknamed the "Austrian Oak" in his bodybuilding days, "_____"  during his acting career, and "the Governator" during his political career. He married Maria Shriver, a niece of the former U.S. President John F. Kennedy, in 1986. They separated in 2011 after he admitted to having fathered a child with their housemaid in 1997.',
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       'Arnold Schwarzenegger was nicknamed the "Austrian Oak" in his bodybuilding days, "Arnie" or during his acting career, and "the Governator" (a portmanteau of "Governor" and "Terminator") during his political career. He married Maria Shriver, a niece of the former U.S. President John F. Kennedy, in 1986. They separated in 2011 after he admitted to having fathered a child with their housemaid in 1997',
//     category: "people",
//     answer: "Arnold Shwarzenegger",
//     PeopleQuestion: {
//       personName: "Arnold Shwarzenegger",
//       clueNationality: "Austrian / American",
//       clueLifespan: "1947 - ",
//       clueInitials: "AS",
//       wikiLink: "https://en.wikipedia.org/wiki/Arnold_Schwarzenegger"
//     }
//   },
//   {
//     date: "2024-07-31",
//     clueMainBefore:
//       "X graduated from Keble College, Oxford. He began his international cricket career in 1971 and played until 1992, serving as the national team's captain intermittently between 1982 and 1992. X was later inducted into the ICC Cricket Hall of Fame. He founded a political party in 1996 and won a seat in the National Assembly in the 2002 general election, serving as an opposition member until 2007. In the 2018 general election, running on a populist platform, his party became the largest party in the National Assembly and formed a coalition government with independents with X as prime minister. ",
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       "Imran Khan graduated from Keble College, Oxford. He began his international cricket career in 1971 and played until 1992, serving as the national team's captain intermittently between 1982 and 1992. Khan was later inducted into the ICC Cricket Hall of Fame. He founded Pakistan Tehreek-e-Insaf (PTI) in 1996 and won a seat in the National Assembly in the 2002 general election, serving as an opposition member until 2007. In the 2018 general election, running on a populist platform, PTI became the largest party in the National Assembly and formed a coalition government with independents with Khan as prime minister. ",
//     category: "people",
//     answer: "Imran Khan",
//     PeopleQuestion: {
//       personName: "Imran Khan",
//       clueNationality: "Pakistan",
//       clueLifespan: "1952 - ",
//       clueInitials: "IK",
//       wikiLink: "https://en.wikipedia.org/wiki/Imran_Khan"
//     }
//   },
//   {
//     date: "2024-08-01",
//     clueMainBefore:
//       "X had a religious conversion experience after embarking on a pilgrimage to a monastery. He later travelled to Saint Petersburg and captivated a number of religious and social leaders, eventually becoming a prominent figure in Russian society. In November 1905, he met Nicholas II and his empress consort, Alexandra Feodorovna. He began acting as a faith healer for Nicholas' and Alexandra's only son, Alexei Nikolaevich, who suffered from haemophilia. He was a divisive figure at court, seen by some as a mystic, visionary and prophet, and by others as a religious charlatan.",
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       "Rasputin had a religious conversion experience after embarking on a pilgrimage to a monastery. He later travelled to Saint Petersburg and captivated a number of religious and social leaders, eventually becoming a prominent figure in Russian society. In November 1905, Rasputin met Nicholas II and his empress consort, Alexandra Feodorovna. He began acting as a faith healer for Nicholas' and Alexandra's only son, Alexei Nikolaevich, who suffered from haemophilia. He was a divisive figure at court, seen by some as a mystic, visionary and prophet, and by others as a religious charlatan.",
//     category: "people",
//     answer: "Grigori Rasputin",
//     PeopleQuestion: {
//       personName: "Grigori Rasputin",
//       clueNationality: "Russia",
//       clueLifespan: "1869 - 1916",
//       clueInitials: "GR",
//       wikiLink: "https://en.wikipedia.org/wiki/Grigori_Rasputin"
//     }
//   },
//   {
//     date: "2024-08-02",
//     clueMainBefore:
//       'X was nicknamed the "Austrian Oak" in his bodybuilding days, "_____"  during his acting career, and "the Governator" during his political career. He married Maria Shriver, a niece of the former U.S. President John F. Kennedy, in 1986. They separated in 2011 after he admitted to having fathered a child with their housemaid in 1997.',
//     clueImage: "sample_image.jpg",
//     clueMainAfter:
//       'Arnold Schwarzenegger was nicknamed the "Austrian Oak" in his bodybuilding days, "Arnie" or during his acting career, and "the Governator" (a portmanteau of "Governor" and "Terminator") during his political career. He married Maria Shriver, a niece of the former U.S. President John F. Kennedy, in 1986. They separated in 2011 after he admitted to having fathered a child with their housemaid in 1997',
//     category: "people",
//     answer: "Arnold Shwarzenegger",
//     PeopleQuestion: {
//       personName: "Arnold Shwarzenegger",
//       clueNationality: "Austrian / American",
//       clueLifespan: "1947 - ",
//       clueInitials: "AS",
//       wikiLink: "https://en.wikipedia.org/wiki/Arnold_Schwarzenegger"
//     }
//   }
// ];
// const questions = []

const questions = [
  {
    date: "2024-06-06",
    clueMainBefore:
      "With an area of 2,586 square kilometers (998 sq mi), (Country) is Europe's seventh-smallest country. In 2023, it had a population of 660,809, which makes it one of the least-populated countries in Europe, albeit with the highest population growth rate; foreigners account for nearly half the population. (Country) is a representative democracy headed by a constitutional monarch, Grand Duke Henri, making it the world's only remaining sovereign grand duchy.",
    clueImage: "sample_image.jpg",
    clueMainAfter:
      "With an area of 2,586 square kilometers (998 sq mi), Luxembourg is Europe's seventh-smallest country. In 2023, it had a population of 660,809, which makes it one of the least-populated countries in Europe, albeit with the highest population growth rate; foreigners account for nearly half the population. Luxembourg is a representative democracy headed by a constitutional monarch, Grand Duke Henri, making it the world's only remaining sovereign grand duchy.",
    category: "country",
    answer: "Luxembourg",
    CountryQuestion: {
      countryName: "Luxembourg",
      clueLatLong: { lat: "49.8 N", long: "6.1 E" },
      clueFlag: "images/flags/lu.svg",
      clueCapital: "Luxembourg",
      wikiLink: "https://en.wikipedia.org/wiki/Luxembourg"
    }
  },
  {
    date: "2024-06-06",
    clueMainBefore:
      "A widowed former reverend living with his children and brother on a Pennsylvania farm finds mysterious crop circles in their fields, which suggests something more frightening to come.",
    clueImage: "sample_image.jpg",
    clueMainAfter:
      "A widowed former reverend living with his children and brother on a Pennsylvania farm finds mysterious crop circles in their fields, which suggests something more frightening to come.",
    category: "movie",
    answer: "Signs",
    MovieQuestion: {
      movieName: "Signs",
      clueYear: 2002,
      clueDirector: "director Signs",
      clueCast: "cast Signs",
      imdbLink: "https://www.imdb.com/title/tt0286106/"
    }
  },
  {
    date: "2024-06-06",
    clueMainBefore:
      "X had a religious conversion experience after embarking on a pilgrimage to a monastery. He later travelled to Saint Petersburg and captivated a number of religious and social leaders, eventually becoming a prominent figure in Russian society. In November 1905, he met Nicholas II and his empress consort, Alexandra Feodorovna. He began acting as a faith healer for Nicholas' and Alexandra's only son, Alexei Nikolaevich, who suffered from haemophilia. He was a divisive figure at court, seen by some as a mystic, visionary and prophet, and by others as a religious charlatan.",
    clueImage: "sample_image.jpg",
    clueMainAfter:
      "Rasputin had a religious conversion experience after embarking on a pilgrimage to a monastery. He later travelled to Saint Petersburg and captivated a number of religious and social leaders, eventually becoming a prominent figure in Russian society. In November 1905, Rasputin met Nicholas II and his empress consort, Alexandra Feodorovna. He began acting as a faith healer for Nicholas' and Alexandra's only son, Alexei Nikolaevich, who suffered from haemophilia. He was a divisive figure at court, seen by some as a mystic, visionary and prophet, and by others as a religious charlatan.",
    category: "people",
    answer: "Grigori Rasputin",
    PeopleQuestion: {
      personName: "Grigori Rasputin",
      clueNationality: "Russia",
      clueLifespan: "1869 - 1916",
      clueInitials: "GR",
      wikiLink: "https://en.wikipedia.org/wiki/Grigori_Rasputin"
    }
  }
];
  // for (const questionData of questions) {
  //   const {
  //     CountryQuestion: countryData,
  //     MovieQuestion: movieData,
  //     PeopleQuestion: peopleData,
  //     ...question
  //   } = questionData;
  //   const createdQuestion = await Question.create(question);

  //   if (countryData) {
  //     await CountryQuestion.create({
  //       ...countryData,
  //       clueLatLong: JSON.stringify(countryData.clueLatLong),
  //       quesID: createdQuestion.id
  //     });
  //   }

  //   if (movieData) {
  //     await MovieQuestion.create({
  //       ...movieData,
  //       clueCast: JSON.stringify(movieData.clueCast),
  //       quesID: createdQuestion.id
  //     });
  //   }
  //   if (peopleData) {
  //     await PeopleQuestion.create({
  //       ...peopleData,
  //       quesID: createdQuestion.id
  //     });
  //   }
  // }

  console.log("Database seeded successfully");
}

seedDatabase().catch((error) => {
  console.error("Error seeding database:", error);
});
