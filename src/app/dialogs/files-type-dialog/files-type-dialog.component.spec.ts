import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesTypeDialogComponent } from './files-type-dialog.component';

describe('FilesTypeDialogComponent', () => {
  let component: FilesTypeDialogComponent;
  let fixture: ComponentFixture<FilesTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilesTypeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilesTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
