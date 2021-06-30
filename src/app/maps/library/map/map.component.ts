import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/interfaces/country';

import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  lat: number;
  long: number;
  countries: Country[];

  constructor(private _countries: CountriesService) { }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition(position => {
      this.lat = position.coords.latitude;
      this.long = position.coords.longitude;
    });

    this._countries.getCountries().subscribe(resp => {
      this.countries = resp;
      console.log(resp);
    });
  }

}
