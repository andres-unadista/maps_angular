import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NativeRoutingModule } from './native-routing.module';
import { MapComponent } from './map/map.component';


@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    NativeRoutingModule
  ]
})
export class NativeModule { }
