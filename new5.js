const Mailjs = require('@cemalgnlts/mailjs');
const mailjs = new Mailjs();
const fs = require('fs');

const FILE_PATH = 'chualu6.csv';

const NUMBER_ACCOUNTS = 5000;

const new5 = async () => {
    const emails = [];
    for (let i = 0; i < NUMBER_ACCOUNTS; i++) {
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

new5();