import { Component, ViewContainerRef } from '@angular/core';
import { OverlayConfig, Overlay, OverlayContainer } from '@angular/cdk/overlay';
import { ComponentPortal, Portal, CdkPortal } from '@angular/cdk/portal';
import { tap, filter } from 'rxjs/operators';
import { AuthPortalComponent } from '@app/portal/auth-portal/auth-portal.component';
import { AuthService } from '@app/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})





export class AppComponent {
  title = 'rate-it';
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 2, rows: 1 },
          { title: 'Card 2', cols: 2, rows: 1 },

          { title: 'Card 3', cols: 2, rows: 1 },
          { title: 'Card 4', cols: 2, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 1, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },

        { title: 'Card 3', cols: 1, rows: 1 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(
    public overlay: Overlay,
    public overlayContainer: OverlayContainer,
    public viewContainerRef: ViewContainerRef,
    private auth: AuthService,
    private breakpointObserver: BreakpointObserver) {

  }
  signOut() {
    return this.auth.signOut();
  }

  openAuth() {
    const config = new OverlayConfig({
      hasBackdrop: true,
      maxWidth: '400px',
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
    });
    const overlayRef = this.overlay.create(config);

    const componentRef = overlayRef
      .attach(new ComponentPortal(AuthPortalComponent, this.viewContainerRef));

    componentRef.instance.overlayRef = overlayRef;

    overlayRef.backdropClick().subscribe(() => overlayRef.detach());

    overlayRef.keydownEvents()
      .pipe(
        tap(e => componentRef.instance.lastKeydown = e.key),
        filter(e => e.key === 'Escape')
      ).subscribe(() => overlayRef.detach());
  }
}
