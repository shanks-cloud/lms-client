import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveBookComponent } from './archive-book.component';

describe('DeleteBookComponent', () => {
  let component: ArchiveBookComponent;
  let fixture: ComponentFixture<ArchiveBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArchiveBookComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
