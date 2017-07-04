import {NgModule} from  '@angular/core'
import{Router,RouterModule} from '@angular/router'
import{BrowserModule} from '@angular/platform-browser'
import { HttpModule } from '@angular/http';
import {EventsAppComponent} from './events-app.component'
import {AuthService} from './user/auth.service'

import{
    EventsListComponent,
    EventThumbnailComponent,
    CreateEventComponent,
    EventListResolver,
    EventDetailsComponent,
    EventRouteActivator
    
    
} from'./events/index'

import{
EventService
}from './events/shared/index'


import {NavBarComponent} from './nav/navbar.component'
import{appRoutes} from './routes'
import {Error404Component} from './errors/404.component'


@NgModule({
    imports:[
        BrowserModule,
        HttpModule,
        RouterModule.forRoot(appRoutes)],
    declarations:[
        EventsAppComponent,
        EventsListComponent,
        EventThumbnailComponent,
        NavBarComponent,
        EventDetailsComponent,
        CreateEventComponent,
        Error404Component

        ],
    providers:[ 
        EventService,
        EventRouteActivator,
        EventListResolver,
        AuthService,
        {
            provide:'canDeactivateCreateEvent',
            useValue: chekDirtyState
        }
     ],
    bootstrap:[EventsAppComponent]
})

export class AppModule{

}


    function chekDirtyState(component:CreateEventComponent){
       if(component.isDirty)
         return window.confirm('You have not saved this event, do you really want to cancel?')
       return true 
    }