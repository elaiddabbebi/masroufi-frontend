import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, tap} from "rxjs";
import {TranslatePipe} from "../shared/pipes/translate.pipe";
import {AppSecurityContext} from "./app-security/app-security-context";
import {AccountDetails} from "./app-security/types/account-details";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [TranslatePipe]
})
export class MainComponent implements OnInit {

  breadcrumbItems: MenuItem[] = [];
  appSecurityContextIsReady: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslatePipe,
    public appSecurityContext: AppSecurityContext,
  ) {
    this.router.events
      .pipe(
        filter((event): boolean => {
          return event instanceof NavigationEnd;
        }),
        tap(() => {
          this.initBreadCrumbs();
        })
      ).subscribe();
    this.initBreadCrumbs();
  }

  ngOnInit(): void {
    this.appSecurityContext.initContext()
      .subscribe((response: AccountDetails): void => {
        this.appSecurityContextIsReady = true;
    });
  }

  initBreadCrumbs(): void {
    this.resetBreadCrumbs();
    let currentRoute: any = this.route.root;
    let url = '';
    let lastBreadcrumb: string = '';
    do {
      const childrenRoutes = currentRoute.children;
      currentRoute = null;
      let tempBreadcrumb: string;

      childrenRoutes.forEach((routes: any) => {
        if (routes.outlet === 'primary') {
          const routeSnapshot = routes.snapshot;
          if (routeSnapshot?.url?.length > 0) {
            url += '/' + routeSnapshot.url.join('/');
          }
          if (routes.snapshot?.data['breadcrumb'] !== undefined) {

            if (tempBreadcrumb !== routes.snapshot.data.breadcrumb && routes.snapshot.data.breadcrumb !== lastBreadcrumb) {
              if (
                url
                  .split('/')
                  [url.split('/').length - 1].match(
                  this.router.url.split('/')[this.router.url.split('/').length - 1].split(';')[0]
                )
              ) {
                this.breadcrumbItems.push({
                  label: this.translate.transform(routes.snapshot.data.breadcrumb),
                  routerLink: url,
                });
              } else {
                this.breadcrumbItems.push({
                  label: this.translate.transform(routes.snapshot.data.breadcrumb),
                  routerLink: url,
                });
              }
              lastBreadcrumb = routes.snapshot.data.breadcrumb;
            }
            tempBreadcrumb = routes.snapshot.data.breadcrumb;
          }
          currentRoute = routes;
        }
      });
    } while (currentRoute);

    if (this.breadcrumbItems.length > 0) {
      this.breadcrumbItems[this.breadcrumbItems.length - 1].routerLink = undefined;
    }
  }

  resetBreadCrumbs(): void {
    this.breadcrumbItems = [];
  }
}
