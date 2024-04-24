import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarshipdetailComponent } from './starshipdetail.component';

describe('StarshipdetailComponent', () => {
  let component: StarshipdetailComponent;
  let fixture: ComponentFixture<StarshipdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarshipdetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StarshipdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
