import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

export class GenreGuard implements CanActivate {

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): boolean {
    return confirm('Are you sure? ^-^');
  }
}