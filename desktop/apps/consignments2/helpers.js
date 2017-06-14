import request from 'superagent'
import { data as sd } from 'sharify'

export async function fetchToken (accessToken) {
  const {
    body: {
      token
    }
  } = await request
              .post(`${sd.API_URL}/api/v1/me/token`)
              .set('X-ACCESS-TOKEN', accessToken)
              .send({ client_application_id: sd.CONVECTION_APP_ID })
  return token
}
