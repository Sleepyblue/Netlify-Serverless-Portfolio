import fetch from 'node-fetch';

const handler = async (event, context) => {
  try {
    const url = 'https://api.github.com/graphql';
    const API_TOKEN = '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';

    const headers = {
      Authorization: `bearer ${API_TOKEN}`,
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

module.exports = { handler };
