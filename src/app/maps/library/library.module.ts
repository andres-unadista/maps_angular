import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LibraryRoutingModule } from './library-routing.module';
import { MapComponent } from './map/map.component';

import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    LibraryRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'API_KEY_HERE'
    })
  ]
})
export class LibraryModule { }
