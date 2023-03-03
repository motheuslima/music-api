import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMusicComponent } from './create-music.component';

describe('CreateMusicComponent', () => {
  let component: CreateMusicComponent;
  let fixture: ComponentFixture<CreateMusicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMusicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
