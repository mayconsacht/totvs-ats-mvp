import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from '../../environments/environment';
import { UserPermissionService } from '../core/user-permission/user-permission.service';
import { AuthServiceMock } from '../util-test/mock/auth/auth-service.mock';
import { getUserExpiredMock, getUserMock } from '../util-test/mock/auth/user.mock';
import { UserPermissionServiceMock } from '../util-test/mock/user-permission/user-permission-service.mock';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';


describe('AuthGuard', () => {
  let service: AuthGuard;
  let authService: AuthService;
  let userPermissionService: UserPermissionService;
  let activatedRouteSnapshot: ActivatedRouteSnapshot;
  let routerStateSnapshot: RouterStateSnapshot;
  const mockSnapshot = jasmine.createSpyObj('RouterStateSnapshot', ['toString']);

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      { provide: AuthService, useClass: AuthServiceMock },
      { provide: UserPermissionService, useClass: UserPermissionServiceMock },
      { provide: RouterStateSnapshot, useValue: mockSnapshot },
      {
        provide: ActivatedRouteSnapshot,
        useValue: { routeConfig: { path: 'profile' } }
      }
    ]
  }));

  beforeEach(() => {
    service = TestBed.inject<any>(AuthGuard);
    authService = TestBed.inject<any>(AuthService);
    userPermissionService = TestBed.inject<any>(UserPermissionService);
    routerStateSnapshot = TestBed.inject<any>(RouterStateSnapshot);
    activatedRouteSnapshot = TestBed.inject<any>(ActivatedRouteSnapshot);
  });

  it('should be created', () => {
    void expect(service).toBeTruthy();
  });

  describe('canActivate', () => {
    it('deve chamar chamar o logout e retornar false se a sessão do usuário estiver expirada', async () => {
      environment.production = true;
      spyOn(authService, 'getUserManager').and.callFake(() => Promise.resolve(getUserExpiredMock()));
      spyOn(authService, 'logout').and.callFake(() => Promise.resolve());
      const result = await service.canActivate(activatedRouteSnapshot, routerStateSnapshot);
      environment.production = false;
      void expect(authService.getUserManager).toHaveBeenCalledTimes(1);
      void expect(authService.logout).toHaveBeenCalledTimes(1);
      void expect(result).toBeFalsy();
    });

    it('deve retornar true se usuário está valido', async () => {
      environment.production = true;
      spyOn(userPermissionService, 'hasUserPermission').and.callFake(() => Promise.resolve(true));
      spyOn(authService, 'getUserManager').and.callFake(() => Promise.resolve(getUserMock()));
      const result = await service.canActivate(activatedRouteSnapshot, routerStateSnapshot);
      environment.production = false;
      void expect(authService.getUserManager).toHaveBeenCalledTimes(1);
      void expect(userPermissionService.hasUserPermission).toHaveBeenCalledTimes(1);
      void expect(result).toBeTruthy();
    });

    it('deve chamar o loginRedirect e retornar false se não existir sessão para o usuário', async () => {
      environment.production = true;
      spyOn(authService, 'getUserManager').and.callFake(() => Promise.resolve(undefined));
      spyOn(authService, 'loginRedirect').and.callFake(() => Promise.resolve());
      const result = await service.canActivate(activatedRouteSnapshot, routerStateSnapshot);
      environment.production = false;
      void expect(authService.getUserManager).toHaveBeenCalledTimes(1);
      void expect(authService.loginRedirect).toHaveBeenCalledTimes(1);
      void expect(result).toBeFalsy();
    });

    it('deve sempre retornar true em ambiente de desenvolvimento', async () => {
      environment.production = false;
      environment.useAuthorityEndPoint = false;
      const result = await service.canActivate(activatedRouteSnapshot, routerStateSnapshot);
      void expect(result).toBeTruthy();
      environment.useAuthorityEndPoint = true;
    });
  });

  it('formatRouteNameToPermissionKey deve converter a rota passada para key de permissão', () => {
    void expect(service['formatRouteNameToPermissionKey']('loanRequest')).toEqual('PayrollLoan.LoanRequest');
  });
});
