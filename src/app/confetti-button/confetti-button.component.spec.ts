import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfettiButtonComponent } from './confetti-button.component';

describe('ConfettiButtonComponent', () => {
  let component: ConfettiButtonComponent;
  let fixture: ComponentFixture<ConfettiButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfettiButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfettiButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
