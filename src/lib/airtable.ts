import Airtable from 'airtable';
var base = new Airtable({
  apiKey: process.env.AIRTABLE_KEY,
}).base('appEt0LIcwvJBjgvB');



export {base};
