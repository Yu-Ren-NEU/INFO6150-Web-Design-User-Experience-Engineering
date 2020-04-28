import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboinfoComponent } from './comboinfo.component';

describe('ComboinfoComponent', () => {
  let component: ComboinfoComponent;
  let fixture: ComponentFixture<ComboinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComboinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
