import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { AdminService } from './admin.service';

@Component({
  selector: 'ngx-form-admin',
  styleUrls: ['./form-admin.component.scss'],
  templateUrl: './form-admin.component.html',
})
export class FormAdminComponent implements OnInit {
  @Input() appointmentSectionPosition: string;
  @Input() appointmentSectionVisible: boolean;

  @Input() medicationSectionPosition: string;
  @Input() medicationSectionVisible: boolean;

  @Input() labResultsSectionPosition: string;
  @Input() labResultsSectionVisible: boolean;

  @Input() newsLettersSectionPosition: string;
  @Input() newsLettersSectionVisible: boolean;

  constructor(private adminService: AdminService){

  }

  adminObject;

  toggle(checked: boolean, section) {
    this.adminObject[section]['visible'] = checked;
    sessionStorage.setItem("adminSettings", JSON.stringify(this.adminObject));
  }

  changeAdminSetting(event, section){    
    this.adminObject[section]['position'] = event+"";
    sessionStorage.setItem("adminSettings", JSON.stringify(this.adminObject));
  }

  
  ngOnInit(): void {

    this.adminObject = sessionStorage.getItem("adminSettings");
    console.log(this.adminObject);

    if(!this.adminObject){
      this.adminService.load().subscribe((data)=>{
        this.adminObject = data;
  
        this.appointmentSectionPosition = this.adminObject?.appointment_section?.position;
        this.appointmentSectionVisible = this.adminObject?.appointment_section?.visible;
    
        this.medicationSectionPosition = this.adminObject?.medication_section?.position;
        this.medicationSectionVisible = this.adminObject?.medication_section?.visible;
    
        this.labResultsSectionPosition = this.adminObject?.lab_results_section?.position;
        this.labResultsSectionVisible = this.adminObject?.lab_results_section?.visible;
    
        this.newsLettersSectionPosition = this.adminObject?.news_letters_section?.position;
        this.newsLettersSectionVisible = this.adminObject?.news_letters_section?.visible;
      });
    } else {
      this.adminObject = JSON.parse(this.adminObject);

      this.appointmentSectionPosition = this.adminObject?.appointment_section?.position;
      this.appointmentSectionVisible = this.adminObject?.appointment_section?.visible;
  
      this.medicationSectionPosition = this.adminObject?.medication_section?.position;
      this.medicationSectionVisible = this.adminObject?.medication_section?.visible;
  
      this.labResultsSectionPosition = this.adminObject?.lab_results_section?.position;
      this.labResultsSectionVisible = this.adminObject?.lab_results_section?.visible;
  
      this.newsLettersSectionPosition = this.adminObject?.news_letters_section?.position;
      this.newsLettersSectionVisible = this.adminObject?.news_letters_section?.visible;
    }
  }
}
