import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetdetailComponent } from './planetdetail.component';

describe('PlanetdetailComponent', () => {
  let component: PlanetdetailComponent;
  let fixture: ComponentFixture<PlanetdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanetdetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanetdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
