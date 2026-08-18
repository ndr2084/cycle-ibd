import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatImDoing } from './what-im-doing';

describe('WhatImDoing', () => {
  let component: WhatImDoing;
  let fixture: ComponentFixture<WhatImDoing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhatImDoing],
    }).compileComponents();

    fixture = TestBed.createComponent(WhatImDoing);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
