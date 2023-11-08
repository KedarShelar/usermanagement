import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserprofilepageComponent } from './userprofilepage.component';

describe('UserprofilepageComponent', () => {
  let component: UserprofilepageComponent;
  let fixture: ComponentFixture<UserprofilepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserprofilepageComponent]
    });
    fixture = TestBed.createComponent(UserprofilepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
