import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvideradmComponent } from './provideradm.component';

describe('ProvideradmComponent', () => {
  let component: ProvideradmComponent;
  let fixture: ComponentFixture<ProvideradmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvideradmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvideradmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
