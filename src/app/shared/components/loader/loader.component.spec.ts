import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderComponent } from './loader.component';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

@Component({
  template: `<app-loader [label]="testLabel"></app-loader>`,
  standalone: true,
  imports: [LoaderComponent]
})
class TestHostComponent {
  testLabel = 'Escaneando multiverso...';
}

describe('LoaderComponent', () => {
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, LoaderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const loader = fixture.debugElement.query(By.directive(LoaderComponent));
    expect(loader).toBeTruthy();
  });

  it('should display the default label', () => {
    const labelEl = fixture.debugElement.query(By.css('.portal-label')).nativeElement;
    expect(labelEl.textContent.trim()).toBe('Escaneando multiverso...');
  });

  it('should display a custom label', () => {
    hostComponent.testLabel = 'Custom Loading...';
    fixture.detectChanges();
    const labelEl = fixture.debugElement.query(By.css('.portal-label')).nativeElement;
    expect(labelEl.textContent.trim()).toBe('Custom Loading...');
  });
});
