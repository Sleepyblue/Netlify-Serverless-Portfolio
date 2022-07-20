const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const url = 'https://icanhazdadjoke.com/';
  try {
    const jokeStream = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
    });
    const jsonJoke = await jokeStream.json();
    return {
      statusCode: 200,
      body: JSON.stringify(jsonJoke),
    };
  } catch (err) {
    return { statusCode: 422, body: err.stack };
  }
};
// //////////////////////////////////////////
// //////////////////////////////////////////
// //////////////////////////////////////////
// //////////////////////////////////////////

// const handler = async (event, context) => {
//   const url = 'https://api.github.com/graphql';
//   const API_TOKEN = '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';

//   try {
//     const headers = {
//       Authorization: `bearer ${API_TOKEN}`,
//     };

//     const body = {
//       query: `query {
//           user(login: "sleepyblue") {
//             name
//             contributionsCollection {
//               contributionCalendar {
//                 colors
//                 totalContributions
//                 weeks {
//                   contributionDays {
//                     color
//                     contributionCount
//                     contributionLevel
//                     date
//                     weekday
//                   }
//                   firstDay
//                 }
//               }
//             }
//           }
//         }`,
//     };

//     const res = await fetch(url, {
//       method: 'POST',
//       body: JSON.stringify(body),
//       headers: headers,
//     });

//     const { data } = await res.json();

//     const dataArr = [];

//     dataArr.push(data);

//     return {
//       statusCode: 200,
//       body: JSON.stringify(dataArr),
//     };
//   } catch (err) {
//     console.error(err);
//   }
// };

// module.exports = { handler };
