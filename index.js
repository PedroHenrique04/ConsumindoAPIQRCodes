const axios = require('axios');
const fs = require('fs');
const https = require('https');

const pfxPath = 'CAMINHO_DO_CERTIFICADO.pfx';
const pfxPassword = 'onzsoftware';

const httpsAgent = new https.Agent({
  pfx: fs.readFileSync(pfxPath),
  passphrase: pfxPassword,
});

const clientId = 'CLIENT_ID';
const clientSecret = 'CLIENT_SECRET';
const authUrl = 'https://api.pix-h.amplea.coop.br/oauth/token';
const data = {
  client_id: clientId,
  client_secret: clientSecret,
  grant_type: 'client_credentials',
};

axios
  .post(authUrl, data, {
    httpsAgent: httpsAgent,
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((response) => {
    console.log('Token:', response.data.access_token);
  })
  .catch((error) => {
    console.error(
      'Erro:',
      error.response ? error.response.data : error.message
    );
  });
