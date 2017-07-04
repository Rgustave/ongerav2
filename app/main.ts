import {platformBrowserDynamic} from
'@angular/platform-browser-dynamic'
import './rxjs-extensions';

import {AppModule} from'./app.module'


platformBrowserDynamic().bootstrapModule(AppModule)

