import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html'
})
export class CreateEmployeeComponent implements OnInit {

  employeeForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) { 

    this.employeeForm = this._formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(19)]],
      email: [''],
      skills: this._formBuilder.group({
        skillName: [''],
        experienceInYears: [''],
        proficiency: ['']
      })
    });
    /*this.employeeForm = new FormGroup({
      fullName: new FormControl(),
      email: new FormControl(),
      skills: new FormGroup({
        skillName: new FormControl(),
        experienceInYears: new FormControl(),
        proficiency: new FormControl()
      })
    });*/
  }

  logFormControlsKeyValue(formGroup:FormGroup):void{
    Object.keys(formGroup.controls).forEach(key=>{
      let control = formGroup.get(key);
      if(control instanceof FormGroup){
        this.logFormControlsKeyValue(control);
      }else{
        console.log('key: ', key, ', value: ', control?.value)
      }
    });
  }

  ngOnInit(): void {
  }

  onFormSubmit():void{
    console.log(this.employeeForm.value);
  }

  onLoadDataClick(): void {
    this.employeeForm.patchValue({
      fullName: 'Pragim Technologies',
      email: 'pragim@pragimtech.com',
      skills: {
        skillName: 'C#',
        experienceInYears: 5,
        proficiency: 'beginner'
      }
    });
  }

  onLogControlsClick():void{
    this.logFormControlsKeyValue(this.employeeForm);
  }

}
