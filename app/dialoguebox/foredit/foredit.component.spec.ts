import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForeditComponent } from './foredit.component';

describe('ForeditComponent', () => {
  let component: ForeditComponent;
  let fixture: ComponentFixture<ForeditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForeditComponent]
    });
    fixture = TestBed.createComponent(ForeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
