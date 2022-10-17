import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/Shared/custom.validators';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html'
})
export class CreateEmployeeComponent implements OnInit {

  //#region [Members]

  employeeForm: FormGroup;

  validationMessages = {
    'fullName': {
      'required': 'Full Name is required.',
      'minlength': 'Full Name must be greater than 2 characters.',
      'maxlength': 'Full Name must be less than 20 characters.'
    },
    'contactPreference': {
      'required': 'Contact Preference is required.'
    },
    'email': {
      'required': 'Email is required.',
      'emailDomainNotValid': 'Email domain not valid.'
    },
    'confirmEmail': {
      'required': 'Confirm Email is required.',
      'valueMismatch': 'Email and Confirm Email do not match.'
    },
    'phone': {
      'required': 'Phone is required.'
    },
    'skillName': {
      'required': 'Skill Name is required.',
    },
    'experienceInYears': {
      'required': 'Experience is required.',
    },
    'proficiency': {
      'required': 'Proficiency is required.',
    },
  };

  formErrors = {
    'fullName': '',
    'contactPreference': '',
    'email': '',
    'confirmEmail':'',
    'phone': '',
    'skillName': '',
    'experienceInYears': '',
    'proficiency': ''
  };

  //#endregion [/Members]

  //#region [Constructor]

  constructor(private _formBuilder: FormBuilder) {

    this.employeeForm = this._formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(19)]],
      contactPreference: ['', Validators.required],
      email: ['', [Validators.required, CustomValidators.validateEmailDomain('outlook.com')]],
      confirmEmail: ['', Validators.required],
      phone: [''],
      skills: this._formBuilder.group({
        skillName: ['', Validators.required],
        experienceInYears: ['', Validators.required],
        proficiency: ['', Validators.required]
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

  //#endregion [/Constructor]

  //#region [Events]

  ngOnInit(): void {
    this.employeeForm.get('confirmEmail')?.addValidators(CustomValidators.confirmValidator(this.employeeForm.get('email')));
    this.employeeForm.valueChanges.subscribe(data => {
      this.logValidationErrors(this.employeeForm);
    });
    this.employeeForm.get('contactPreference')?.valueChanges.subscribe(value => {
      this.onContactPreferenceChange(value);
    });
  }

  onFormSubmit(): void {
    //console.log(this.employeeForm.value);
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

  onLogControlsClick(): void {
    //this.logValidationErrors(this.employeeForm);
    //console.log(this.formErrors);
    this.logFormControlsKeyValue(this.employeeForm);
  }

  onContactPreferenceChange(selectedValue: string): void {    
    const phoneCtrl = this.employeeForm.get('phone');
    if (selectedValue === 'email') {      
      phoneCtrl?.removeValidators(Validators.required);
    } else {      
      phoneCtrl?.setValidators(Validators.required);
    }    
    phoneCtrl?.updateValueAndValidity();
  }

  //#endregion [/Events]

  //#region [Functions]

  logFormControlsKeyValue(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      let control = formGroup.get(key);
      if (control instanceof FormGroup) {
        this.logFormControlsKeyValue(control);
      } else {
        console.log('key: ', key, ', value: ', control?.value)
      }
    });
  }

  logValidationErrors(formGroup: FormGroup = this.employeeForm): void {
    Object.keys(formGroup.controls).forEach((key) => {
            const control = formGroup.get(key);
      if (control instanceof FormGroup) {
        this.logValidationErrors(control);
      } else {        
        const k = key as keyof typeof this.formErrors;
        this.formErrors[k] = '';
        if (control && !control.valid && (control.touched || control.dirty)) {
          // const kk = key as keyof typeof this.validationMessages;
          const messages = this.validationMessages[k];
          for (const errorKey in control.errors) {
            if (errorKey) {
              const ek = errorKey as keyof typeof messages;
              this.formErrors[k] += messages[ek] + ' ';
            }
          }
        }
      }
    });
  }

  
  //#endregion [/Functions]  

}
