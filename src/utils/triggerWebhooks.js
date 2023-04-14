const axios = require('axios');

module.exports = async function triggerWebhooks(webhooks, data) {
  for (let i = 0; i < webhooks.length; i += 1) {
    const webhook = webhooks[i];
    const options = {
      method: 'POST',
      url: webhook.url,
    };

    if (webhook.authUsername && webhook.authPassword) {
      options.auth = {
        username: webhook.authUsername,
        password: webhook.authPassword,
      };
    }

    if (webhook.headers) {
      const headers = {};
      for (let h = 0; h < webhook.headers.length; h += 1) {
        const { key, value } = webhook.headers[h];
        headers[key] = value;
      }
      options.headers = headers;
    }

    const formData = data;
    if (webhook.staticKeys) {
      for (let s = 0; s < webhook.staticKeys.length; s += 1) {
        const { key, value } = webhook.staticKeys[s];
        formData[key] = value;
      }
    }
    options.data = formData;

    axios(options)
      .catch(() => {});
  }
};
