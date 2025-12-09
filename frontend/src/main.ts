import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .then(() => console.log('Angular Bootstrap Successful!'))
  .catch((err) => console.error('Bootstrap Error:', err));
