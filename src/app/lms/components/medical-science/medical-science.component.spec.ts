import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalScienceComponent } from './medical-science.component';

describe('MedicalScienceComponent', () => {
  let component: MedicalScienceComponent;
  let fixture: ComponentFixture<MedicalScienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalScienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalScienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
