import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from '../../helpers/validationform';
import { AuthService } from '../../services/auth.service';
import { UserStoreService } from '../../services/user-store.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  currEmail:string | undefined;
  currToken:string | undefined;
  public resetPasswordForm!: FormGroup;
  constructor(private fb: FormBuilder,private authService: AuthService,private activatedRoute:ActivatedRoute,private router: Router, private toast: NgToastService,private userService: UserStoreService) { }

  ngOnInit(): void {
    // this.activatedRoute.queryParamMap.subscribe(params => {
    //   const email = params.get('email');
    //   const token = params.get('token');
    //   console.log(email, token);
    // });

    const email = this.activatedRoute.snapshot.queryParamMap.get('email');
    const token = this.activatedRoute.snapshot.queryParamMap.get('token');
    // console.log(email, token);
    this.resetPasswordForm = this.fb.group({
      email: [ email, Validators.required],
      token: [ token, Validators.required],
      password: ['', Validators.required],
    });
    // console.log(this.resetPasswordForm.value)
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  onSubmit() {
    // console.log(this.resetPasswordForm.value);
    if (this.resetPasswordForm.valid) {
      console.log(this.resetPasswordForm.value);
      this.authService.resetPassword(this.resetPasswordForm.value).subscribe({
        next: (res) => {
          console.log(res.message);
          this.router.navigate(['login'])
        },
        error: (err) => {
          this.toast.error({detail:"ERROR", summary:"Something when wrong!", duration: 5000});
          console.log(err?.error.message);
        },
      });
    } else {
      ValidateForm.validateAllFormFields(this.resetPasswordForm);
    }
  }

}
