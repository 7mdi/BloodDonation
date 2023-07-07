import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNeederComponent } from './add-needer.component';

describe('AddNeederComponent', () => {
  let component: AddNeederComponent;
  let fixture: ComponentFixture<AddNeederComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNeederComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNeederComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
