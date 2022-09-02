import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionTypeDialogComponent } from './selection-type-dialog.component';

describe('SelectionTypeDialogComponent', () => {
  let component: SelectionTypeDialogComponent;
  let fixture: ComponentFixture<SelectionTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectionTypeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectionTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
