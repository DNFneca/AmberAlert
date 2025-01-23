import { ApiServiceService } from './../api-service/api-service.service';
import { MapComponent } from './../map/map.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  Router,
  RouterModule,
  RouterOutlet,
  provideRouter,
} from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MapComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  title = 'teyvatmap';
  firstName = "";
  lastName = "";
  info = "";
  city = "";
  description = "";
  selectedFile: File | null = null;
  constructor(
    private router: Router,
    private routerLink: RouterOutlet,
    private api: ApiServiceService
  ) {}
  toList() {
    this.router.navigate(['/', 'missing']).then(
      (nav) => {
        console.log(nav); // true if navigation is successful
      },
      (err) => {
        console.log(err); // when there's an error
      }
    );
  }

  selectPerson(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input?.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }

  newPerson() {
    console.log(this.selectedFile);
    console.log(document.getElementById('name'));
    console.log(this.firstName);


    // this.api
    //   .addRecord(
    //     document.getElementById('name')!.innerText,
    //     document.getElementById('surname')!.innerText,
    //     this.selectedFile!,
    //     document.getElementById('info')!.innerText,
    //     document.getElementById('description')!.innerText
    //   )
    //   .subscribe((res) => {
    //     console.log(res);
    //   });
  }
}
