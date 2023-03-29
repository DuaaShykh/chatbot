const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

// // Set up body-parser middleware to handle incoming requests
app.use(bodyParser.urlencoded({ extended: true }));

const product_id = "6790d779-78f2-4662-a4f7-0824427e1c8d";
const secret_token = "e841b514-0790-4366-b5aa-7d8fe2a8debd";
const phone_id = "27649";
let url = `https://api.maytapi.com/api/${product_id}/${phone_id}/sendMessage`;

app.post(url, (req, res) => {
    const { Body, From } = req.body;

    if (Body.toLowerCase().match(/hi|hey|hello/)) {
        sendMessage(From, 'Hi, welcome to TechOn. How may we help you today?\n1. Customer support\n2. Sales');
    }
    else if (Body === '1') {
        sendMessage(From, "We'll connect you to support shortly.");
    }
    else if (Body === '2') {
        sendMessage(From, 'Sales will reach out to you.');
    }
    else if (Body === '1' && userSelectedOption === '1') {
        sendMessage(From, 'Please type your query.');
    }
    else if (Body === '2') {
        sendMessage(From, 'Thanks for your time.');
    }
    else {
        sendMessage(From, "I'm sorry, I didn't understand your message.");
    }

    res.end();
});

// let data = {
//     to_number: "+923331581690",
//     message: 'Hello, Duaa Yousuf', 
//     type: "text"
// };
// request({
//   url: url,
//   method: "POST",
//   headers: {
//     "x-maytapi-key": secret_token
//   },
//   json: data
// });


// Helper function to send a WhatsApp message
function sendMessage(message) {
    let data = {
        to_number: "+923331581690",
        message: message, 
        type: "text"
      };
    const options = {
        method: 'POST',
        url: url,
        headers: {
        'Content-Type': 'application/json',
        "x-maytapi-key": secret_token
        },
        json: data
  };

  request(options, (error, response, body) => {
    if (error) {
      console.error(error);
    } else {
      console.log(body);
    }
  });
}

// Start the server
app.listen(3000, () => console.log('Server started on port 3000.'));

