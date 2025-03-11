import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { emailValidator, passwordValidator } from './my-form.validators';
import { ThemeService } from './my-forme.theme';

@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule] 
})
export class MyFormComponent {
  loginForm: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder, public themeService: ThemeService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, emailValidator()]],
      password: ['', [Validators.required, passwordValidator()]]
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  onSubmit() {
    if (this.loginForm.invalid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    const mockRequest = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    // Моковый запрос
    fetch('https://www.vl.ru/authtestcase/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mockRequest)
    })
    .then(response => response.json())
    .then(data => {
      if (data.token) {
        console.log(`Welcome, ${data.user.name}!`);
      } else {
        console.error('Authorization failed:', data.errors);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    })
    .finally(() => {
      this.isSubmitting = false;
    });
  }
}