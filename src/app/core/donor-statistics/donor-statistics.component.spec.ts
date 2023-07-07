import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorStatisticsComponent } from './donor-statistics.component';

describe('DonorStatisticsComponent', () => {
  let component: DonorStatisticsComponent;
  let fixture: ComponentFixture<DonorStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonorStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonorStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
