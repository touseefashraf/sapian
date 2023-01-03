export const environment = {
    production: true
}
//
export const apis = {
    baseUrl: 'https://api.sapiensvalero.com/api',
    // baseUrl: 'http://localhost:8000/api',

    googleApiKey: 'AIzaSyBCx7WlCiNeipaS8j4ApuMVOsIU3Ma-zME',
    googleCaptchaSiteKey: '6LcOuyYTAAAAAHTjFuqhA52fmfJ_j5iFk5PsfXaU'


}

export const socialLoginUrls = {
    google: `${apis.baseUrl}/public/login/google`,
    facebook: `${apis.baseUrl}/public/login/facebook`
}

export const appURL = 'https://sapiensvalero.com'
