import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitsDonatingBloodComponent } from './benefits-donating-blood.component';

describe('BenefitsDonatingBloodComponent', () => {
  let component: BenefitsDonatingBloodComponent;
  let fixture: ComponentFixture<BenefitsDonatingBloodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenefitsDonatingBloodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenefitsDonatingBloodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
