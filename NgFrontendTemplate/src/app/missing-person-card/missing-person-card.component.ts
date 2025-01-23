import { ApiServiceService } from './../api-service/api-service.service';
import { AfterViewInit, Component, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-missing-person-card',
  standalone: true,
  imports: [ RouterOutlet ],
  templateUrl: './missing-person-card.component.html',
  styleUrl: './missing-person-card.component.css'
})
export class MissingPersonCardComponent implements AfterViewInit {
  @Input() Id : number;
  missingRecordName : string = "";
  missingRecordLastName : string = "";
  missingRecordReport : string = "";
  missingReportImage : string = "";
  missingReportDescription : string = "";

  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiServiceService) {
    this.Id = Number(this.route.snapshot.paramMap.get('id'));
  }


  ngAfterViewInit(): void {
    console.log(this.Id);

    var record = this.apiService.getRecordById(this.Id).subscribe(res => {
      console.log(res);
      this.missingRecordName = res.FirstName;
      this.missingRecordLastName = res.LastName;
      this.missingRecordReport = res.Report;
      this.missingReportImage = this.apiService.apiUrl.replace("/api", "") + "/" + res.Image;
      this.missingReportDescription = res.Description;
    });
    if(record == null) throw new Error('Error not implemented.');
  }

  goToProfile() {
    this.router.navigate(['card/' + this.Id.toString()])
    .then(nav => {
      console.log(nav); // true if navigation is successful
    }, err => {
      console.log(err) // when there's an error
    });
  }

}
