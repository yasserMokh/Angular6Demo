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
}