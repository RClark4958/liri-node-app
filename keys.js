console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};
exports.bandsInTown = {
  id: process.env.BANDSINTOWN_APP_ID
};
exports.omdb = {
  apiKey: process.env.OMDB_API_KEY
};