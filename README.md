# How to run

1. Open terminal and run `npm install`
2. Sass whatcher `sass --watch ./scss/theme.sass ./public/css/theme.css`
3. Create config file `config.env` and fill it with your data

```ini
LOCALE=uk-UA
CURRENCY=UAH
API_DOMAIN=https://opendatabot.com
API_PATH=/api/v3/full-company-open-data
PORT=8080
APIKEY=your_api_key
```

4. Download FontAwesome and put it in `fontawesome` folder

5. Start server
   `npm run build`
   `npm run start`
