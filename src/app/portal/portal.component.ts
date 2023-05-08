import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Employee } from './employee';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {

  exportTableToCSV() {
   let csv = [];
    let rows : any = document.querySelectorAll<HTMLElement>("table tr");

    for (var i = 0; i < rows.length; i++) {
        let row = [], cols = rows[i].querySelectorAll("td, th");

        for (var j = 0; j < cols.length-1; j++)
            row.push(cols[j].innerText);

        csv.push(row.join(","));
    }

    // Download CSV file
    this.downloadCSV(csv.join("\n"));
}

downloadCSV(csv) {
    var csvFile;
    var downloadLink;

    // Create CSV file
    csvFile = new Blob([csv], { type: "text/csv" });

    // Create download link
    downloadLink = document.createElement("a");
    downloadLink.download = 'exportedSheet.csv';
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";

    // Add download link to document
    document.body.appendChild(downloadLink);

    // Click download link to trigger the download
    downloadLink.click();
}

  ngOnInit() {
     this.currentLoggedUser = this.authService.username;
     console.log(this.currentLoggedUser);
  }
  currentLoggedUser: string
  employeeArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  name: string ="";
  address: string ="";
  mobile: number;
  skills: string;
  hobbies: string;
  currentEmployeeID = "";
  isDisplay: boolean = false;
 
constructor(private http: HttpClient, private authService: AuthService){
    this.getAllEmployee();
  }

  logout(){
      this.authService.logout();
  }
  getAllEmployee(){
    this.http.get("http://localhost:8084/api/v1/employee/getAllEmployee").subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        console.log(resultData);
        this.employeeArray = resultData;
    });
  }
  register(){
    let bodyData  = {
      "employeeName" : this.name,
      "employeeAddress" : this.address,
      "employeeMobile" : this.mobile,
      "employeeSkills": this.skills,
      "employeeHobbies": this.hobbies
    };

    this.http.post("http://localhost:8084/api/v1/employee/save",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Employee Registered Successfully");
        this.getAllEmployee();
    });
  }
  setUpdate(data: Employee)
  {
   this.name = data.employeeName;
   this.address = data.employeeAddress;
   this.mobile = data.employeeMobile;
   this.skills = data.employeeSkills;
   this.hobbies = data.employeeHobbies;
   this.currentEmployeeID = data.employeeId;
  }


  UpdateRecords(){
    let bodyData : Employee = {
      "employeeName" : this.name,
      "employeeAddress" : this.address,
      "employeeMobile" : this.mobile,
      "employeeSkills": this.skills,
      "employeeHobbies": this.hobbies,
      "employeeId": this.currentEmployeeID 
    };
    
    this.http.put("http://localhost:8084/api/v1/employee/update",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Employee has been Updated.")
        this.getAllEmployee();
       
    });
  }


  save()
  { 
    this.isDisplay = true;
    if(this.currentEmployeeID == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
      }      
  }


  setDelete(data: any)
  {
    this.http.delete("http://localhost:8084/api/v1/employee/delete"+ "/"+ data.employeeId,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert(`Employee : ${data.employeeName} has been deleted.`)
        this.getAllEmployee();

  
    });
  }

}
