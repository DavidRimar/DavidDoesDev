import { environment } from "../environments/environment"

export const APP_CONFIG = {
  spaceId: environment.spaceId,
  accessToken: environment.accessToken,
  contentTypeIds: {
    about: environment.aboutMeId
  },
  contentType: 'dddPosts'
}
