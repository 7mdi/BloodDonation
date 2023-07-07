import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './core/about/about.component';
import { BlogComponent } from './core/blog/blog.component';
import { ContactComponent } from './core/contact/contact.component';
import { HomeComponent } from './core/home/home.component';
import { MainLayoutComponent } from './core/main-layout/main-layout.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { LoginComponent } from './features/Authentication/components/login/login.component';
import { SignupComponent } from './features/Authentication/components/signup/signup.component';
import { ConfirmEmailComponent } from './features/Authentication/components/confirm-email/confirm-email.component';
import { ConfirmForgotPasswordComponent } from './features/Authentication/components/confirm-forgot-password/confirm-forgot-password.component';
import { ResetPasswordComponent } from './features/Authentication/components/reset-password/reset-password.component';
import { AuthGuard } from './features/Authentication/guards/auth.guard';
import { AddDonarComponent } from './features/Donation/components/add-donar/add-donar.component';
import { DonationListComponent } from './features/Donation/components/donation-list/donation-list.component';
import { AddNeederComponent } from './features/Needy/components/add-needer/add-needer.component';
import { NeedyListComponent } from './features/Needy/components/needy-list/needy-list.component';
import { ProfileComponent } from './features/Profile/components/profile/profile.component';
import { UserDataelsComponent } from './features/Profile/components/user-dataels/user-dataels.component';
import { UserDonationListComponent } from './features/Profile/components/user-donation-list/user-donation-list.component';
import { UserNeedyListComponent } from './features/Profile/components/user-needy-list/user-needy-list.component';
import { ForgotPasswordComponent } from './features/Authentication/components/forgot-password/forgot-password.component';
import { ChatComponent } from './features/Profile/components/chat/chat.component';
import { ServicecardComponent } from './core/servicecard/servicecard.component';
import { SingleBlogComponent } from './core/single-blog/single-blog.component';
import { NotificationComponent } from './features/Profile/components/notification/notification.component';


const routes: Routes = [
  {path:"",component:MainLayoutComponent,children:[
    {path:"",redirectTo:"/home",pathMatch:"full"}, //Default path
    {path:"home",component:HomeComponent,canActivate:[AuthGuard]},
    {path:"about",component:AboutComponent,canActivate:[AuthGuard]},
    {path:"service",component:ServicecardComponent,canActivate:[AuthGuard]},
    {path:"blog",component:BlogComponent,canActivate:[AuthGuard]},
    {path:"singleblog/:id",component:SingleBlogComponent},
    {path:"contact",component:ContactComponent,canActivate:[AuthGuard]},
    {path:"donars",component:DonationListComponent,canActivate:[AuthGuard]},
    {path:"needers/:id",component:NeedyListComponent,canActivate:[AuthGuard]},
    {path:"profile",component:ProfileComponent,canActivate:[AuthGuard]},
    {path:"userdonationrequest",component:UserDonationListComponent,canActivate:[AuthGuard]},
    {path:"userneedyrequest",component:UserNeedyListComponent,canActivate:[AuthGuard]},
    {path:"userinformation",component:UserDataelsComponent,canActivate:[AuthGuard]},
    {path:"chat",component:ChatComponent,canActivate:[AuthGuard]},],canActivate:[AuthGuard]},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'forgotpassword', component:ForgotPasswordComponent},
  {path:'resetpassword', component:ResetPasswordComponent},
  {path:'confirmemail', component:ConfirmEmailComponent},
  {path:'confirmeforgotpassword', component:ConfirmForgotPasswordComponent},
  {path:"addDonar",component:AddDonarComponent,canActivate:[AuthGuard]},
  {path:"addNeeder",component:AddNeederComponent,canActivate:[AuthGuard]},
  {path:"notifi",component:NotificationComponent},
  {path:"**",component:NotFoundComponent},  //Wild card path

];

// const routes: Routes = [
//   {path:"",component:MainLayoutComponent,children:[
//     {path:"",redirectTo:"/home",pathMatch:"full"}, //Default path
//     {path:"home",component:HomeComponent},
//     {path:"about",component:AboutComponent},
//     {path:"blog",component:BlogComponent},
//     {path:"contact",component:ContactComponent},
//     {path:"donars/:id",component:DonationListComponent},
//     {path:"needers/:id",component:NeedyListComponent},
//     {path:"profile",component:ProfileComponent,children:[
//       {path:"userdonationrequest",component:UserDonationListComponent},
//       {path:"userneedyrequest",component:UserNeedyListComponent},
//       {path:"userdataels",component:UserDataelsComponent},
//       {path:"chat",component:ChatComponent},
//     ],canActivate:[AuthGuard]}
//   ],canActivate:[AuthGuard]},
//   {path:'login', component:LoginComponent},
//   {path:'signup', component:SignupComponent},
//   {path:'forgotpassword', component:ForgotPasswordComponent},
//   {path:'resetpassword', component:ResetPasswordComponent},
//   {path:'confirmemail', component:ConfirmEmailComponent},
//   {path:'confirmeforgotpassword', component:ConfirmForgotPasswordComponent},
//   {path:"addDonar",component:AddDonarComponent},
//   {path:"addNeeder",component:AddNeederComponent},
//   {path:"**",component:NotFoundComponent},  //Wild card path

// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }







// {path:"profile",component:ProfileComponent,children:[
//   {path:"userdonationrequest",component:UserDonationListComponent,canActivate:[AuthGuard]},
//   {path:"userneedyrequest",component:UserNeedyListComponent,canActivate:[AuthGuard]},
//   {path:"userdataels",component:UserDataelsComponent,canActivate:[AuthGuard]},
//   {path:"chat",component:ChatComponent,canActivate:[AuthGuard]},
// ],canActivate:[AuthGuard]}
