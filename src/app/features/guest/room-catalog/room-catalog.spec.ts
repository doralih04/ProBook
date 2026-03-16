import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomCatalog } from './room-catalog';

describe('RoomCatalog', () => {
  let component: RoomCatalog;
  let fixture: ComponentFixture<RoomCatalog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomCatalog],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomCatalog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
