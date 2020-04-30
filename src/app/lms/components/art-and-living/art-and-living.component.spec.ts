import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtAndLivingComponent } from './art-and-living.component';

describe('ArtAndLivingComponent', () => {
  let component: ArtAndLivingComponent;
  let fixture: ComponentFixture<ArtAndLivingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtAndLivingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtAndLivingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
