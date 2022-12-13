// path: ./src/api/restaurant/routes/custom-restaurant.js

module.exports={
    routes: [
        {
            method: 'POST',
            path: '/orders/pretransaction',
            handler: 'custom.pre',
        },
    ],
    routes: [
        {
            method: 'POST',
            path: '/orders/posttransaction',
            handler: 'custom.post',
        },
    ],
};
