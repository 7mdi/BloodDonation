import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from '../../helpers/validationform';
import { AuthService } from '../../services/auth.service';
import { UserStoreService } from '../../services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  public loginForm!: FormGroup;
  
  constructor(private fb: FormBuilder,private authService: AuthService,private router: Router, private toast: NgToastService,private userService: UserStoreService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.authService.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res.message);
          // alert(res.message)
          this.loginForm.reset();
          this.authService.storeToken(res.token);
          const tokenPayload = this.authService.decodedToken();
          this.userService.setUserNameForStore(tokenPayload.name);
          this.userService.setRoleForStore(tokenPayload.role);
          this.toast.success({detail:"SUCCESS", summary:res.message, duration: 5000});
          // this.router.navigate(['home'])
          this.router.navigate(['home'])
        },
        error: (err) => {
          this.toast.error({detail:"ERROR", summary:"Something when wrong!", duration: 5000});
          console.log(err?.error.message);
        },
      });
    } else {
      ValidateForm.validateAllFormFields(this.loginForm);
    }
  }
  
}
