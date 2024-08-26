import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstancesActionsComponent } from './instances-actions.component';

describe('InstancesActionsComponent', () => {
  let component: InstancesActionsComponent;
  let fixture: ComponentFixture<InstancesActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstancesActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstancesActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
