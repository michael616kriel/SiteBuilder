import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarPaneComponent } from './sidebar-pane.component';

describe('SidebarPaneComponent', () => {
  let component: SidebarPaneComponent;
  let fixture: ComponentFixture<SidebarPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
