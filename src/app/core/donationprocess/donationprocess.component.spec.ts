import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationprocessComponent } from './donationprocess.component';

describe('DonationprocessComponent', () => {
  let component: DonationprocessComponent;
  let fixture: ComponentFixture<DonationprocessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonationprocessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonationprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
