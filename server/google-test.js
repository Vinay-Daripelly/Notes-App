require('dotenv').config();
const { OAuth2Client } = require('google-auth-library');

async function testGoogleAuth() {
  const code = '4/0AVMBsJhQ4VlOu8gfH5P-c55YjldGWlBlun5PV2gOxzAemLJ5mXTsPryGkiVxaIYvOUZ0Ag';

  const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'http://localhost:5173'
  );

  console.log('Attempting to get token with code:', code);

  try {
    const { tokens } = await client.getToken(code);
    console.log('SUCCESS! Received tokens:', tokens);
  } catch (error) {
    console.error('FAILED! Google returned an error:', error.response?.data || error.message);
  }
}

testGoogleAuth();