import { client_id } from 'config/configuration';
import { OAuth2Client } from 'google-auth-library';

export const verifyTokenGoogle = async (token: string) => {
  const client = new OAuth2Client(client_id);
  return client
    .verifyIdToken({
      idToken: token,
      audience: client_id,
    })
    .then((ticket) => {
      const { email, name, picture } = ticket.getPayload();
      return { email, name, picture };
    })
    .catch((error) => {
      throw error;
    });
};
