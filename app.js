const express = require('express');
const app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index.pug', {
        title: 'Home Page'
    });
});
app.get('/about', (req, res) => {
    res.render('about.pug', {
        title: 'About Page'
    });
});
app.listen(8699, () => {
    console.log('Server is running on 8699');

})