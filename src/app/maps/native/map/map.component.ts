/// <reference types="../../../../../node_modules/@types/googlemaps" />
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild('divMap') divMap: ElementRef;

  map: google.maps.Map;
  markers: google.maps.Marker[];

  constructor() {
    this.markers = [];
  }

  ngOnInit(): void { }

  ngAfterViewInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.loadMap(position);
        this.eventAutocompleteInput();
      });
    } else {
      alert('Navegador no compatible ☢');
    }
  }

  loadMap(position) {
    const options = {
      center: new google.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude
      ),
      zoom: 19,
      mapTypeId: google.maps.MapTypeId.HYBRID,
    };
    this.map = new google.maps.Map(this.divMap.nativeElement, options);

    this.setMarkerMap();
    this.addMarkerEventMouseMap();
  }

  setMarkerMap() {
    const icon: google.maps.Icon = {
      url: 'https://cdn.pixabay.com/photo/2014/10/02/08/30/honey-bee-469560_960_720.png',
      scaledSize: new google.maps.Size(100, 100),
    };

    const markerPosition = new google.maps.Marker({
      position: this.map.getCenter(),
      animation: google.maps.Animation.DROP,
      icon,
    });

    markerPosition.setMap(this.map);
  }

  addMarkerEventMouseMap() {
    google.maps.event.addListener(
      this.map,
      'click',
      (event: google.maps.MouseEvent) => {
        const markerPositionMouse = new google.maps.Marker({
          position: event.latLng,
          animation: google.maps.Animation.DROP,
        });
        this.markers.push(markerPositionMouse);
        markerPositionMouse.setMap(this.map);
        markerPositionMouse.setDraggable(true);
        this.eventMarkerMouse(markerPositionMouse);
      }
    );
  }

  eventMarkerMouse(marker: google.maps.Marker) {
    google.maps.event.addListener(marker, 'click', (event) => {
      marker.setMap(null);
    });
    google.maps.event.addListener(marker, 'mouseover', (event) => {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    });
    google.maps.event.addListener(marker, 'mouseout', (event) => {
      marker.setAnimation(google.maps.Animation.DROP);
    });
  }

  deleteMarkersMap() {
    for (const marker of this.markers) {
      marker.setMap(null);
    }
  }

  eventAutocompleteInput() {
    const autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('inputPlaces') as HTMLInputElement
    );
    google.maps.event.addListener(autocomplete, 'place_changed', (event) => {
      const place = autocomplete.getPlace();
      console.log(place);
      this.map.setCenter(place.geometry.location);
    });
  }

  calculateRoute() {
    const directionService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();

    directionsRenderer.setMap(this.map);
    directionService.route({
      origin: 'Madrid, españa',
      destination: 'Valencia, españa',
      travelMode: google.maps.TravelMode.DRIVING
    }, result => {
      console.log(result);
    })
  }
}
