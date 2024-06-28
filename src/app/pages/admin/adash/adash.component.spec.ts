import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdashComponent } from './adash.component';

describe('AdashComponent', () => {
  let component: AdashComponent;
  let fixture: ComponentFixture<AdashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
