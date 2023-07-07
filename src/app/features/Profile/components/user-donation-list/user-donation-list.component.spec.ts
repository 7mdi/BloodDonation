import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDonationListComponent } from './user-donation-list.component';

describe('UserDonationListComponent', () => {
  let component: UserDonationListComponent;
  let fixture: ComponentFixture<UserDonationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDonationListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDonationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
