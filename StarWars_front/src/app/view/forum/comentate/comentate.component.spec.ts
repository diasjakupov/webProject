import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentateComponent } from './comentate.component';

describe('ComentateComponent', () => {
  let component: ComentateComponent;
  let fixture: ComponentFixture<ComentateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComentateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComentateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
