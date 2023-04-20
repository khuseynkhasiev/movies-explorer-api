module.exports.options = {
  origin: [
    'https://husmovies.nomoredomains.monster',
    'http://husmovies.nomoredomains.monster',
    'http://localhost:3001',
    'http://localhost:3000',
  ],
  methods: ['GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};
