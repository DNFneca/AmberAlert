import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  public apiUrl : string = 'http://147.185.221.223:59351/api';

  constructor(private http: HttpClient) { }


  public getRecordById(id : number): Observable<any> {
    return this.http.post(`${this.apiUrl}/getrecord`, {'Id':id});
  }

  public getRecords(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getrecords`);
  }

  public addRecord(firstName : string, lastName : string, image : File, report: string, description: string): Observable<any> {
    let formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("image", image);
    formData.append("report", report);
    formData.append("description", description);
    console.log(formData.get("report"));
    console.log(report);
    return this.http.post(`${this.apiUrl}/addrecord`, formData)
  }

}
