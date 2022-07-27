import fetch from 'node-fetch';

exports.handler = async (event, context) => {
  try {
    const url = 'https://api.github.com/graphql';
    const TOKEN = process.env.API_TOKEN;

    const headers = {
      Authorization: `bearer ${TOKEN}`,
    };
    const body = {
      query: `query {
            user(login: "sleepyblue") {
              name
              contributionsCollection {
                contributionCalendar {
                  colors
                  totalContributions
                  weeks {
                    contributionDays {
                      color
                      contributionCount
                      contributionLevel
                      date
                      weekday
                    }
                    firstDay
                  }
                }
              }
            }
          }`,
    };
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: headers,
    });

    const { data } = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return { statusCode: 422, body: err.stack };
  }
};
