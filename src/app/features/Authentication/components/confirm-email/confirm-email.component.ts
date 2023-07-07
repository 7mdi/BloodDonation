import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {

  queryParams: { email: string; token: string; } | undefined;
  email:string | undefined;
  token:string | undefined;
  massageConfirme:string | undefined;
  constructor(private activatedRoute:ActivatedRoute, private authService:AuthService) { }

  ngOnInit(): void {
    // this.email = String(this.activatedRoute.snapshot.queryParamMap.get('email'));
    // this.token = String(this.activatedRoute.snapshot.queryParamMap.get('token'));
 
    const emailurl = String(this.activatedRoute.snapshot.queryParamMap.get('email'));
    const tokenurl = String(this.activatedRoute.snapshot.queryParamMap.get('token'));

    this.queryParams = { email: emailurl, token: tokenurl };
    console.log(this.queryParams);

    this.authService.confirmEmail(this.queryParams).subscribe({
      next: (res) => {
        this.massageConfirme="Email Confrmed..!";
        console.log(res.message);
        console.log(this.queryParams);
      },
      error: (err) => {
        this.massageConfirme="Email Don't Confrmed..!";
        console.log(err?.error.message);
      },
    });

  }

}
