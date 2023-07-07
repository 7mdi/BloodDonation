import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from '../../helpers/validationform';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  type: string = 'password';
  isText: boolean = false;
  eyeIcon:string = "fa-eye-slash"
  public signUpForm!: FormGroup;
  constructor(private fb : FormBuilder, private service: AuthService, private router: Router,private toast: NgToastService) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      userName:['', Validators.required],
      email:['', Validators.required],
      password:['', Validators.required]
    })
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = 'fa-eye' : this.eyeIcon = 'fa-eye-slash'
    this.isText ? this.type = 'text' : this.type = 'password'
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);

      this.service.signUp(this.signUpForm.value)
      .subscribe({
        next:(res=>{
          console.log(res.message);
          this.signUpForm.reset();
          this.router.navigate(['login']);
          this.toast.success({detail:"SUCCESS", summary:res.message, duration: 5000});
          // alert(res.message)
        }),
        error:(err=>{
          this.toast.error({detail:"ERROR", summary:"Something when wrong!", duration: 5000});
          alert(err?.error.message)
        })
      })
    } else {
      ValidateForm.validateAllFormFields(this.signUpForm); //{7}
    }
  }

}
