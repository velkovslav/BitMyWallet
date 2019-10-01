const request = require('request');


module.exports = test;


function test(req,res) {
    let crypto = req.body.crypto; //Example output BTC
    let currency = req.body.currency; //Example output USD
    let amount = req.body.amount;

    let options = {
        url: 'https://apiv2.bitcoinaverage.com/convert/global',
        method: 'GET',
        qs: {
            from: crypto,
            to: currency,
            amount: amount,
        }
    };

    request(options, function (error, respond, body) {
        let data = JSON.parse(body);
        let time = data.time;
        let price = data.price;

        convertionResult = Math.round(price);
        currentCurrency = currency;
        res.redirect("/");
        // res.render('index', {conversionResult: convertionResult,currentCurrency: currentCurrency});
    });

}