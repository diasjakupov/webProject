import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomPostsComponent } from './bottom-posts.component';

describe('BottomPostsComponent', () => {
  let component: BottomPostsComponent;
  let fixture: ComponentFixture<BottomPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomPostsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BottomPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
