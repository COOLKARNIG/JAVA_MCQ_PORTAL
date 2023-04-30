import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { LoginModule } from './app/login/login.module';

// login module will open insted of app module
platformBrowserDynamic().bootstrapModule(LoginModule)
  .catch(err => console.error(err));
