import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, tap} from "rxjs";
import {TranslatePipe} from "../shared/pipes/translate.pipe";
import {MainService} from "./services/main.service";
import {AccountDetails} from "./types/account-details";
import {ProfileService} from "./settings/profile/services/profile.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [TranslatePipe, MainService, ProfileService]
})
export class MainComponent implements OnInit {

  items: MenuItem[] = [];
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
  fullName: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslatePipe,
    private service: MainService,
    private profileService: ProfileService
  ) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        tap(() => {
          this.initBreadCrumbs();
        })
      )
      .subscribe();
    this.initBreadCrumbs();
  }

  ngOnInit(): void {
    this.getAccountInfo();
  }

  getAccountInfo(): void {
    this.profileService.getAccountInfo().pipe(
      tap((response: AccountDetails) => {
        this.fullName = response.fullName ? response.fullName : 'Unknown User';
      },
      (error) => {
        this.logout();
      })
    ).subscribe();
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
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
                this.items.push({
                  label: this.translate.transform(routes.snapshot.data.breadcrumb),
                  routerLink: url,
                });
              } else {
                this.items.push({
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

    if (this.items.length > 0) {
      this.items[this.items.length - 1].routerLink = undefined;
    }
  }

  resetBreadCrumbs(): void {
    this.items = [];
  }
}
