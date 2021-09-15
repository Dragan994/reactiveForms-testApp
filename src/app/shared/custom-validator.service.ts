import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorService {

  constructor() { }

  public checkMatch(mainName: string, confirmkName: string): ValidatorFn{
    return(c: AbstractControl): {[key:string]:boolean} | null => {
      const main = c.get(mainName);
      const confirm = c.get(confirmkName);
      if(main?.value !== confirm?.value) { return {match:true} }  
      return null
    }}

   public password(safeCharset: string[], requiredLength: number): ValidatorFn {
      return (c: AbstractControl): {[key:string]: boolean} | null => {
        if(c.value.length <= requiredLength){
          return {passwordShort: true}
        }
        for(let safeChar of safeCharset){
          let notSafe:boolean|null = null;
          if(!c.value.includes(safeChar)){
            notSafe = true
          }
          if(notSafe) return {passwordNotSafe: true}
        }
        return null
      }
    }
}
