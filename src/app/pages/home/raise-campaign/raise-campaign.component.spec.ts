import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiseCampaignComponent } from './raise-campaign.component';

describe('RaiseCampaignComponent', () => {
  let component: RaiseCampaignComponent;
  let fixture: ComponentFixture<RaiseCampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RaiseCampaignComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RaiseCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
