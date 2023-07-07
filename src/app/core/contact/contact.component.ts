import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MapGeocoder } from '@angular/google-maps';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/features/Authentication/helpers/validationform';
import { CoreService } from '../services/core.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  location_lat: any;
  location_lng: any;
  public contactForm!: FormGroup;
  constructor(private fb: FormBuilder, private coreService: CoreService, private toast: NgToastService) { }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.location_lat = this.center.lat.toString()
      this.location_lng = this.center.lng.toString()
    });

    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      message: ['', Validators.required],
    });

  }

  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 24,
    lng: 12
  };
  zoom = 4;
  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = (event.latLng.toJSON());
  }
  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.showPosition,
        this.showError
      );
    } else {
      alert('Geolocation is not supported by this browser.');
      console.log('Geolocation is not supported by this browser.');
    }
  }

  showPosition(position: GeolocationPosition) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    console.log('Latitude:', latitude);
    console.log('Longitude:', longitude);

    // You can perform further actions with the obtained coordinates here
  }

  showError(error: GeolocationPositionError) {
    switch (error.code) {
      case error.PERMISSION_DENIED:

        console.log('User denied the request for Geolocation.');
        break;
      case error.POSITION_UNAVAILABLE:
        console.log('Location information is unavailable.');
        break;
      case error.TIMEOUT:
        console.log('The request to get user location timed out.');
        break;
      case error.POSITION_UNAVAILABLE:
        console.log('An unknown error occurred.');
        break;
    }
  }

  sendContact(){    
    if (this.contactForm.valid) {
      // console.log(this.contactForm.value);
      this.coreService.sendNewContact(this.contactForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.contactForm.reset();
          this.toast.success({detail:"SUCCESS", summary:"Data Sent", duration: 5000});
        },
        error: (err) => {
          console.log(err?.error.message);
          this.toast.error({detail:"ERROR", summary:"Something when wrong!", duration: 5000});
        },
      });
    } else {
      ValidateForm.validateAllFormFields(this.contactForm);
    }
   }

}
