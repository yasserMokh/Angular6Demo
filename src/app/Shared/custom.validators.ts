import { AbstractControl } from "@angular/forms";

export class CustomValidators{
    static validateEmailDomain(domain: string){
        return (control: AbstractControl):{[key: string]: any} | null =>{
        if(!control || !control.value){           
          return null;
        }
        const email: string=control.value;
        
        const domainExtraxted: string=email.substring(email.lastIndexOf('@')+1);
        if(domainExtraxted.toLowerCase() === domain.toLocaleLowerCase()){            
            return null;
        }    
        return {'emailDomainNotValid': true};
      };
    }

    static confirmValidator(controlToCompareWith: AbstractControl | null){
        return (controlToCompare: AbstractControl): {[key: string] : any} | null =>{
            if(!controlToCompare || !controlToCompare.value){
                console.log('No Value !');
                return null;
            }
          if(controlToCompare.value.toLocaleLowerCase() === controlToCompareWith?.value.toLocaleLowerCase()){
            console.log('Success :)');
            return null;
          }
          console.log('Wrong XXX');
          return {'valueMismatch': true};
        }
      }
}