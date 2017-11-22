import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { TextMaskModule } from 'angular2-text-mask';
/* Components */
import { AppComponent } from './app.component';
import { SelectCityComponent } from './components/select-city/select-city.component';
import { IndicateContactsComponent } from './components/indicate-contacts/indicate-contacts.component';
import { HeaderNavComponent } from './layouts/header-nav/header-nav.component';
import { SelectMasterComponent } from './components/first-master/select-master/select-master.component';
import { SelectServicesComponent } from './components/first-service/select-services/select-services.component';
import { SelectAddressComponent } from './components/select-address/select-address.component';
import { SelectServicesMasterComponent } from './components/first-master/select-services-master/select-services-master.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { SelectDateTimeComponent } from './components/first-master/select-date-time/select-date-time.component';
import { SelectTimeMasterComponent } from './components/first-service/select-time-master/select-time-master.component';
import { TimeBookedComponent } from './components/time-booked/time-booked.component';
import { InterruptRecordComponent } from './components/interrupt-record/interrupt-record.component';
/* Services */
import {SwitcherService} from './services/switcher.service';
/* Directives */
import { ActiveDirective } from './directives/active.directive';

@NgModule({
  declarations: [
    AppComponent,
    SelectCityComponent,
    SelectAddressComponent,
    IndicateContactsComponent,
    HeaderNavComponent,
    SelectMasterComponent,
    SelectServicesComponent,
    SelectServicesMasterComponent,
    ActiveDirective,
    SidebarComponent,
    SelectDateTimeComponent,
    SelectTimeMasterComponent,
    TimeBookedComponent,
    InterruptRecordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDBGVDv5fOFgfW4ixNZL_2krgkriGu6vvc',
      libraries: ['places']
    }),
    TextMaskModule
  ],
  providers: [SwitcherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
