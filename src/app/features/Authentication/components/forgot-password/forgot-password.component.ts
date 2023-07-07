import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from '../../helpers/validationform';
import { AuthService } from '../../services/auth.service';
import { UserStoreService } from '../../services/user-store.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public forgotPasswordForm!: FormGroup;
  constructor(private fb: FormBuilder,private authService: AuthService,private router: Router, private toast: NgToastService,private userService: UserStoreService) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      console.log(this.forgotPasswordForm.value);
      this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe({
        next: (res) => {
          console.log(res.message);
          this.toast.success({detail:"SUCCESS", summary:res.message, duration: 5000});
          this.router.navigate(['confirmeforgotpassword'])
        },
        error: (err) => {
          this.toast.error({detail:"ERROR", summary:"Something when wrong!", duration: 5000});
          console.log(err?.error.message);
        },
      });
    } else {
      ValidateForm.validateAllFormFields(this.forgotPasswordForm);
    }
  }

}
