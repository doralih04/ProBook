export const environment = {
  production: false,
  apiUrl: 'http://localhost:5033/api', // URL del backend ASP.NET Core (usando HTTP para evitar errores SSL)
  firebase: {
    apiKey: 'your-api-key',
    authDomain: 'your-project.firebaseapp.com',
    projectId: 'your-project-id',
    storageBucket: 'your-project.appspot.com',
    messagingSenderId: 'your-sender-id',
    appId: 'your-app-id'
  }
};