import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowallquestionComponent } from './showallquestion.component';

describe('ShowallquestionComponent', () => {
  let component: ShowallquestionComponent;
  let fixture: ComponentFixture<ShowallquestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowallquestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowallquestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
