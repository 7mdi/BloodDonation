import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDataelsComponent } from './user-dataels.component';

describe('UserDataelsComponent', () => {
  let component: UserDataelsComponent;
  let fixture: ComponentFixture<UserDataelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDataelsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDataelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
