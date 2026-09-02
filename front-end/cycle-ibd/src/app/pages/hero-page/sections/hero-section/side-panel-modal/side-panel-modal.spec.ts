import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidePanelModal } from './side-panel-modal';

describe('SidePanelModal', () => {
  let component: SidePanelModal;
  let fixture: ComponentFixture<SidePanelModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidePanelModal],
    }).compileComponents();

    fixture = TestBed.createComponent(SidePanelModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
