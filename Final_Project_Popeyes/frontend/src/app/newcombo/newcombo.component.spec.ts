import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcomboComponent } from './newcombo.component';

describe('NewcomboComponent', () => {
  let component: NewcomboComponent;
  let fixture: ComponentFixture<NewcomboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewcomboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewcomboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
