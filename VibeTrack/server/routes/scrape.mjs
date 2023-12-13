import cheerio from "cheerio";
import axios from "axios";

export const scrape = async () => {
  try {
    const response = await axios.get('https://www.visitsanmarcos.com/listen-san-marcos/live-this-week/'); // Replace with your target URL
    const $ = cheerio.load(response.data); // Creates HTML response an an object

    const eventInfo = [];
    // Div container holding all events
    const eventContainer = $('.contentRender');
    // For each date and events under that date
    eventContainer.find('h3').each((_, dayElement) => {
      // Date of event
      const day = $(dayElement).text();
      // Grab the list of events under that date
      const eventsElements = $(dayElement).nextUntil('h3', 'div');
      // iterate through each event 
      eventsElements.each((_, eventElement) => {
        // Grab the event
        const divText = $(eventElement).text();
        eventInfo.push({ day, divText });
      });
    });
    return eventInfo;
  } catch (error) {
    throw new Error('Error scraping data');
  }
};
