import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraManagerComponent } from './extra-manager.component';

describe('ExtraManagerComponent', () => {
  let component: ExtraManagerComponent;
  let fixture: ComponentFixture<ExtraManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtraManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtraManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
