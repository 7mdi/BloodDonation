import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedyListComponent } from './needy-list.component';

describe('NeedyListComponent', () => {
  let component: NeedyListComponent;
  let fixture: ComponentFixture<NeedyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeedyListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeedyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
