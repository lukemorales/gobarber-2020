import express from 'express';

const app = express();

app.get('/', (request, response) => response.json({ message: 'Hello Twitch' }));

app.listen(3333, () => {
  console.log('🚀 Server Started on port 3333'); // eslint-disable-line no-console
});
