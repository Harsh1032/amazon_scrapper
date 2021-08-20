const express = require('express');
const { initParams } = require('request');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 5000;


const generateScraperUrl = (apikey) => `http://api.scraperapi.com?api_key=${apikey}&autoparse=true`;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Amazon Scraper Api.');
});

//Get product details

app.get('/products/:productId', async (req, res) => {
    const {productId} = req.params;
    const { api_key } = req.query;

     try {
         const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`);

         res.json(JSON.parse(response));
     } catch (error) {
         res.json(error);
     }

});

//Get product Reviews

app.get('/products/:productId/reviews', async (req, res) => {
    const {productId} = req.params;
    const { api_key } = req.query;
     try {
         const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`);

         res.json(JSON.parse(response));
     } catch (error) {
         res.json(error);
     }

});

//Get product Offers

app.get('/products/:productId/offers', async (req, res) => {
    const {productId} = req.params;
    const { api_key } = req.query;
     try {
         const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`);

         res.json(JSON.parse(response));
     } catch (error) {
         res.json(error);
     }

});

//Get Search Results

app.get('/search/:searchQuery', async (req, res) => {
    const {searchQuery} = req.params;
    const { api_key } = req.query;
     try {
         const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`);

         res.json(JSON.parse(response));
     } catch (error) {
         res.json(error);
     }

});




app.listen(PORT, () => console.log(`Server ruuning on port ${PORT}`));