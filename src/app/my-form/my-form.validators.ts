import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Валидатор для email
export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const valid = emailRegex.test(control.value);
    return valid ? null : { invalidEmail: true };
  };
}

// Валидатор для пароля
export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*]/.test(value);
    const valid = value.length >= 6 && hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;
    return valid ? null : { invalidPassword: true };
  };
}