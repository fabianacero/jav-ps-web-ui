import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderQuotesComponent } from './provider-quotes.component';

describe('ProviderQuotesComponent', () => {
  let component: ProviderQuotesComponent;
  let fixture: ComponentFixture<ProviderQuotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderQuotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
