import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextTypeDialogComponent } from './text-type-dialog.component';

describe('TextTypeDialogComponent', () => {
  let component: TextTypeDialogComponent;
  let fixture: ComponentFixture<TextTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextTypeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
