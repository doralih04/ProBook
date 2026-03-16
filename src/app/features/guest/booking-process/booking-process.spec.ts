import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingProcess } from './booking-process';

describe('BookingProcess', () => {
  let component: BookingProcess;
  let fixture: ComponentFixture<BookingProcess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingProcess],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingProcess);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
