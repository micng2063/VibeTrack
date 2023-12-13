const axios = require('axios'); // Axios for making HTTP request
const cheerio = require('cheerio'); // Cheerio for parsing HTML content

const scrapeEvents = async () => {
  try {
    // Make a 'get' request to the specified url that has the upcoming events for the specified clubs/bars
    const response = await axios.get('https://www.visitsanmarcos.com/listen-san-marcos/live-this-week/');
    // Load HTML content into $
    const $ = cheerio.load(response.data);

    // Grab the container that holds the upcoming events from the web page
    const eventContainer = $('.contentRender');
    const eventInfo = [];

    // Use the h3 tags (the date of the events) and iterate over all of the elements  for that event
    eventContainer.find('h3').each((_, dayElement) => {
      // Extract the text under the h3 tag (date of event)  
      const day = $(dayElement).text();
      // Use nextUntil to select all of the elements bewteen the h3 (date) and the next date
      // this will hold all of the divs under that specific date
      const eventsElements = $(dayElement).nextUntil('h3', 'div');

      // Iterate over each div in the selected range
      eventsElements.each((_, eventElement) => {
        // Find all of the 'a' tags with the selected div and get the content (name of the club is contained here)
        const name = $(eventElement).find('a').text();
        // Add the event date with the corresponding name of the club/bar
        eventInfo.push({ day, name });
      });
    });

    return eventInfo;
  } catch (error) {
    console.error('Error fetching data', error);
    return [];
  }
};

// Wrap the call in an async function and log the result
(async () => {
  const events = await scrapeEvents();
  console.log(events);
})();

/* Container {
    h3 Date of event {
        div {
            Name of club/bar
        }
        div {
            Name of club/bar
        }
        div {
            Name of club/bar
        }
    }
    h3 Date of event {
        div {
            Name of club/bar
        }
        div {
            Name of club/bar
        }
        div {
            Name of club/bar
        }
    }
    ...
} */
// Find the container of the events
// Find the first header tag with the date
//      Get the date and add the date from the header content
// Iterate over each div between the header tags to get the content in each div (the naame of the clulb/bar)
// repeat for the entire conatiner