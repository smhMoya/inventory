import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { SteelPipeComponent } from './steel-pipe.component';
import { SteelPipeDetailComponent } from './steel-pipe-detail.component';
import { SteelPipePopupComponent } from './steel-pipe-dialog.component';
import { SteelPipeDeletePopupComponent } from './steel-pipe-delete-dialog.component';

@Injectable()
export class SteelPipeResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const steelPipeRoute: Routes = [
    {
        path: 'steel-pipe',
        component: SteelPipeComponent,
        resolve: {
            'pagingParams': SteelPipeResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'inventoryApp.steelPipe.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'steel-pipe/:id',
        component: SteelPipeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'inventoryApp.steelPipe.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const steelPipePopupRoute: Routes = [
    {
        path: 'steel-pipe-new',
        component: SteelPipePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'inventoryApp.steelPipe.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'steel-pipe/:id/edit',
        component: SteelPipePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'inventoryApp.steelPipe.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'steel-pipe/:id/delete',
        component: SteelPipeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'inventoryApp.steelPipe.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
