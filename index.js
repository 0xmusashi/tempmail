const axios = require('axios');
const Mailjs = require('@cemalgnlts/mailjs');
const mailjs = new Mailjs();
const fs = require('fs');
const csv = require('csv-parser');

const FILE_PATH = 'chualu1.csv';

const URL = 'https://api.mail.tm';
const ADDRESS = 'o22du@soscandia.org';
const PASSWORD = 'n6cll7oz';

const NUMBER_ACCOUNTS = 1000;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function authenticateAndCreateAccount() {
    try {
        // 1. Authenticate and get token
        const authResponse = await axios.post(URL + '/token', {
            address: ADDRESS,
            password: PASSWORD
        });

        const { id, token } = authResponse.data;

        const messages = await axios.get(URL + '/messages/', {
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log('messages:', messages.data);
    } catch (error) {
        console.error('Error:', error);
    }
}

const main = async () => {
    const emails = [];
    for (let i = 0; i < NUMBER_ACCOUNTS; i++) {
        console.log('i: ', i);
        const result = await mailjs.createOneAccount();
        const { username, password } = result.data;
        if (username) {
            emails.push({
                email: username,
                password
            });
        }
    }

    try {
        const csvString = emails.map(item => `${item.email},${item.password}`).join('\n');
        fs.writeFileSync(FILE_PATH, csvString);
        console.log('CSV file created successfully:', FILE_PATH);
    } catch (error) {
        console.error('Error creating CSV file:', error);
    }
}

main();