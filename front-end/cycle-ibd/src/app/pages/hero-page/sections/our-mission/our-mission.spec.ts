import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurMission } from './our-mission';

describe('MyMission', () => {
  let component: OurMission;
  let fixture: ComponentFixture<OurMission>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurMission],
    }).compileComponents();

    fixture = TestBed.createComponent(OurMission);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
