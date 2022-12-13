const { createCoreController } = require('@strapi/strapi').factories;
const https = require('https');
const PaytmChecksum = require('paytmchecksum');


module.exports = createCoreController('api::order.order', ({ strapi }) => ({
    // Method 1: Creating an entirely custom action
    async pre(ctx) {

        var paytmParams = {};
        let params = JSON.parse(ctx.request.body);
      
        console.log(ctx.request.body);

        const entry = await strapi.entityService.create('api::order.order', {
            data: {
              email: params.email,
              orderId: params.orderid,
              paymentInfo:null,
              products: params.cart,
              address: params.address,
              city: params.city,
              state: params.state,
              pincode: params.pincode,
              name: params.name,
              transactionID: null,
              amount: params.amount,
              status: 'pending',
            },
          });

        paytmParams.body = {
            "requestType": "Payment",
            "OBJID":entry.id,
            "mid": process.env.MID,
            "websiteName": "YOUR_WEBSITE_NAME",
            "orderId":  params.orderid,
            "callbackUrl": "http://localhost:1337/api/orders/posttransaction",
            "txnAmount": {
                "value": params.amount,
                "currency": "INR",
            },
            "userInfo": {
                "custId": "CUST_001",
            },
        };

        let checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.MKEY);

        paytmParams.head = {
            "signature": checksum
        };

        var post_data = JSON.stringify(paytmParams);

        const getToken = async () => {
            return new Promise((resolve, reject) => {
                var options = {

                    /* for Staging */
                    hostname: 'securegw-stage.paytm.in',

                    /* for Production */
                    // hostname: 'securegw.paytm.in',

                    port: 443,
                    path: `/theia/api/v1/initiateTransaction?mid=${process.env.MID}&orderId=${params.orderid}`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': post_data.length,
                    }
                };

                var response = "";
                var post_req = https.request(options, function (post_res) {
                    post_res.on('data', function (chunk) {
                        response += chunk;
                    });

                    post_res.on('end', function () {
                        console.log('Response: ', response);
                        resolve(response);
                    });
                });

                post_req.write(post_data);
                post_req.end();
            })

        }

        let myr = await getToken();

        ctx.send(JSON.parse(myr)) ;


    },


    async post(ctx) {

     
   
        let params = ctx.request.body;
        // console.log(ctx.request.body);
        
        const entries = await strapi.entityService.findMany('api::order.order', {
            fields: ['id'],
            filters: { orderId : params.ORDERID },
            
          });
        let id = entries[0].id;

        await strapi.entityService.update('api::order.order', id, {
            data: {
              transactionID: params.TXNID,
              paymentInfo: params,
              status:params.STATUS,
            },
          });

          ctx.redirect("http://localhost:3000/success");
    },

}));
