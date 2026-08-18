import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMission } from './my-mission';

describe('MyMission', () => {
  let component: MyMission;
  let fixture: ComponentFixture<MyMission>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyMission],
    }).compileComponents();

    fixture = TestBed.createComponent(MyMission);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
