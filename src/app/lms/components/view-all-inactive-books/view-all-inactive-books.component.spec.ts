import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllInactiveBooksComponent } from './view-all-inactive-books.component';

describe('ViewAllInactiveBooksComponent', () => {
  let component: ViewAllInactiveBooksComponent;
  let fixture: ComponentFixture<ViewAllInactiveBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllInactiveBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllInactiveBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
