import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeFormErrors, SkillErrors } from 'src/app/models/errors.models';
import { Skill } from 'src/app/models/skill.model';
import { CustomValidators } from 'src/app/shared/custom.validators';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html'
})
export class EmployeeFormComponent implements OnInit {


  //#region [Members]

  //#region [Output]
  @Output() formSubmitted: EventEmitter<Employee> = new EventEmitter<Employee>();
  //#endregion [Output]

  //#region [Inoput]  
  @Input()
  set employeeModel(value: Employee) {
    this.setFormFromEmployee(value);
  }
  //#endregion [/Input]

  //#region [Public]
  employeeForm: FormGroup;

  formErrors: EmployeeFormErrors = {
    fullName: '',
    contactPreference: '',
    email: '',
    confirmEmail: '',
    phone: ''
  };

  skillErrors: SkillErrors[] = [this.getNewSkillErrors()];
  //#endregion [/Public]

  //#region [Private]
  private validationMessages = {
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
  //#endregion [/Private]

  //#endregion [/Members]

  //#region [Constructor]

  constructor(private _formBuilder: FormBuilder) {

    this.employeeForm = this._formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(19)]],
      contactPreference: ['', Validators.required],
      email: ['', [Validators.required, CustomValidators.validateEmailDomain('outlook.com')]],
      confirmEmail: ['', Validators.required],
      phone: [''],
      skills: this._formBuilder.array([this.getSkillsFormGroup()])
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
    //console.log(empForm.valid);
    //console.log(empForm);
    if (!this.employeeForm.valid) {
      return;
    }
    this.formSubmitted.emit(this.getEmployeeFromForm());
    this.employeeForm.reset();
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

  onAddSkillClick(): void {
    this.addSkillsFormGroup();
  }

  onDeleteSkillClick(skillIndex: number): void {
    this.deleteSkillsFormGroup(skillIndex);
  }

  //#endregion [/Events]

  //#region [Functions]

  addSkillsFormGroup(skillFormGroup: FormGroup = this.getSkillsFormGroup()): void {
    (this.employeeForm.get('skills') as FormArray).push(skillFormGroup);
    this.skillErrors.push(this.getNewSkillErrors());
  }

  deleteSkillsFormGroup(skillIndex: number): void {
    (this.employeeForm.get('skills') as FormArray).removeAt(skillIndex);
    this.skillErrors.splice(skillIndex, 1);
  }

  getSkillsFormGroup(skill: Skill=new Skill()): FormGroup {    
    return this._formBuilder.group({
      skillName: [skill.skillName, Validators.required],
      experienceInYears: [skill.experienceInYears, Validators.required],
      proficiency: [skill.proficiency, Validators.required]
    });
  }

  getNewFormErrors(): EmployeeFormErrors {
    return {
      fullName: '',
      contactPreference: '',
      email: '',
      confirmEmail: '',
      phone: ''
    };
  }

  getNewSkillErrors(): SkillErrors {
    return {
      skillName: '',
      experienceInYears: '',
      proficiency: ''
    };
  }

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
      /* if (control instanceof FormGroup) {
        this.logValidationErrors(control);
      }
      if (control instanceof FormArray) {        
        for(let i=0; i< control.controls.length; i++){}
        control.controls.forEach(ctrl => {
          if(ctrl instanceof FormGroup){
            //this.logValidationErrors(ctrl);  
          }
        });
      } */
    });
  }

  logSkillsValidationErrors(skillsFormArray: FormArray = this.employeeForm.get('skills') as FormArray): void {

    Object.keys(skillsFormArray.controls).forEach((key, index) => {
      const control = skillsFormArray.get(key);
      //const k = key as keyof typeof this.validationMessages;
      if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach((sk) => {
          let se = this.skillErrors[index];
          const skr = sk as keyof typeof se;
          const ctrl = control.get(sk);
          se[skr] = '';
          if (ctrl && !ctrl.valid && (ctrl.touched || ctrl.dirty)) {
            const messages = this.validationMessages[skr];
            se[skr] = messages?.required;
          }
        });
      }
    });
  }

  castToFormArray(control: AbstractControl | null) {
    return control as FormArray;
  }

  getEmployeeFromForm(formGroup: FormGroup = this.employeeForm): Employee {
    const emp: Employee = new Employee();

    emp.fullName = formGroup.get('fullName')?.value;
    emp.contactPreference = formGroup.get('contactPreference')?.value;
    emp.email = formGroup.get('email')?.value;
    emp.phone = formGroup.get('phone')?.value;
    ((formGroup.get('skills') as FormArray).controls).forEach(skillGroup => {
      const skill: Skill = {
        skillName: skillGroup.get('skillName')?.value,
        experienceInYears: skillGroup.get('experienceInYears')?.value,
        proficiency: skillGroup.get('proficiency')?.value
      };
      emp.skills.push(skill);
    });

    return emp;
  }

  setFormFromEmployee(employee: Employee): void {

    console.log('setFormFromEmployee', 'employee', employee);

    this.employeeForm.get('fullName')?.setValue(employee.fullName);
    this.employeeForm.get('contactPreference')?.setValue(employee.contactPreference);
    this.employeeForm.get('email')?.setValue(employee.email);
    this.employeeForm.get('phone')?.setValue(employee.phone);

    if(!employee.skills || !employee.skills.length){
      return;
    }
    this.deleteSkillsFormGroup(0);
    for (let i = 0; i < employee.skills.length; i++) {
      const skillFormGroup=this.getSkillsFormGroup(employee.skills[i]);
      console.log('skillFormGroup-', i, '---', skillFormGroup,);
      this.addSkillsFormGroup(skillFormGroup);
    }


  }

  //#endregion [/Functions]

}
