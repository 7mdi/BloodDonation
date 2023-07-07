import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNeedyListComponent } from './user-needy-list.component';

describe('UserNeedyListComponent', () => {
  let component: UserNeedyListComponent;
  let fixture: ComponentFixture<UserNeedyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserNeedyListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserNeedyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
