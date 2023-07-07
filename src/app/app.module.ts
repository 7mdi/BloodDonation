import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgToastModule } from 'ng-angular-popup';
import { GoogleMapsModule } from '@angular/google-maps';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule,MatIconModule } from '@angular/material';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { DisablePinchZoomDirective } from './shared/directive/disable-pinch-zoom.directive';
import { TokenInterceptor } from './features/Authentication/interceptors/token.interceptor';

import { HomeComponent } from './core/home/home.component';
import { BlogComponent } from './core/blog/blog.component';
import { AboutComponent } from './core/about/about.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { BannerComponent } from './core/banner/banner.component';
import { ServicecardComponent } from './core/servicecard/servicecard.component';
import { DonationprocessComponent } from './core/donationprocess/donationprocess.component';
import { BenefitsDonatingBloodComponent } from './core/benefits-donating-blood/benefits-donating-blood.component';
import { DonorStatisticsComponent } from './core/donor-statistics/donor-statistics.component';
import { SingleBlogComponent } from './core/single-blog/single-blog.component';
import { DonationListComponent } from './features/Donation/components/donation-list/donation-list.component';
import { NeedyListComponent } from './features/Needy/components/needy-list/needy-list.component';
import { MainLayoutComponent } from './core/main-layout/main-layout.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ProfileComponent } from './features/Profile/components/profile/profile.component';
import { UserDonationListComponent } from './features/Profile/components/user-donation-list/user-donation-list.component';
import { UserNeedyListComponent } from './features/Profile/components/user-needy-list/user-needy-list.component';
import { AddDonarComponent } from './features/Donation/components/add-donar/add-donar.component';
import { AddNeederComponent } from './features/Needy/components/add-needer/add-needer.component';
import { UserDataelsComponent } from './features/Profile/components/user-dataels/user-dataels.component';
import { ChatComponent } from './features/Profile/components/chat/chat.component';
import { ConversationComponent } from './features/Profile/components/chat/conversation/conversation.component';
import { ConfirmEmailComponent } from './features/Authentication/components/confirm-email/confirm-email.component';
import { ConfirmForgotPasswordComponent } from './features/Authentication/components/confirm-forgot-password/confirm-forgot-password.component';
import { ForgotPasswordComponent } from './features/Authentication/components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './features/Authentication/components/reset-password/reset-password.component';
import { ContactComponent } from './core/contact/contact.component';
import { LoginComponent } from './features/Authentication/components/login/login.component';
import { SignupComponent } from './features/Authentication/components/signup/signup.component';
import { NotifiFormComponent } from './core/notifi-form/notifi-form.component';
import { NotificationComponent } from './features/Profile/components/notification/notification.component';

export function rootLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json')
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    ServicecardComponent,
    DonationprocessComponent,
    BenefitsDonatingBloodComponent,
    DonorStatisticsComponent,
    HomeComponent,
    AboutComponent,
    BlogComponent,
    SingleBlogComponent,
    DonationListComponent,
    LoginComponent,
    SignupComponent,
    NeedyListComponent,
    MainLayoutComponent,
    NotFoundComponent,
    ProfileComponent,
    UserDonationListComponent,
    UserNeedyListComponent,
    AddDonarComponent,
    AddNeederComponent,
    UserDataelsComponent,
    DisablePinchZoomDirective,
    ChatComponent,
    ConversationComponent,
    ConfirmEmailComponent,
    ConfirmForgotPasswordComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ContactComponent,
    NotifiFormComponent,
    NotificationComponent,
  ],
  imports: [
    MatFormFieldModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    NgToastModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-left',
      closeButton: true,
      timeOut: 5000,
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: rootLoaderFactory,
        deps: [HttpClient]
      }
    }),

    ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
