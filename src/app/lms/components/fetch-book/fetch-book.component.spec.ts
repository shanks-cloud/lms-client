import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchBookComponent } from './fetch-book.component';

describe('FetchBookComponent', () => {
  let component: FetchBookComponent;
  let fixture: ComponentFixture<FetchBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FetchBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
