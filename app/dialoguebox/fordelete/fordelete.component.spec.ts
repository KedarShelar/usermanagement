import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FordeleteComponent } from './fordelete.component';

describe('FordeleteComponent', () => {
  let component: FordeleteComponent;
  let fixture: ComponentFixture<FordeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FordeleteComponent]
    });
    fixture = TestBed.createComponent(FordeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
