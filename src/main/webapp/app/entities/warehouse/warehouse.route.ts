import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { WarehouseComponent } from './warehouse.component';
import { WarehouseDetailComponent } from './warehouse-detail.component';
import { WarehousePopupComponent } from './warehouse-dialog.component';
import { WarehouseDeletePopupComponent } from './warehouse-delete-dialog.component';

@Injectable()
export class WarehouseResolvePagingParams implements Resolve<any> {

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

export const warehouseRoute: Routes = [
    {
        path: 'warehouse',
        component: WarehouseComponent,
        resolve: {
            'pagingParams': WarehouseResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'inventoryApp.warehouse.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'warehouse/:id',
        component: WarehouseDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'inventoryApp.warehouse.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const warehousePopupRoute: Routes = [
    {
        path: 'warehouse-new',
        component: WarehousePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'inventoryApp.warehouse.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'warehouse/:id/edit',
        component: WarehousePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'inventoryApp.warehouse.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'warehouse/:id/delete',
        component: WarehouseDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'inventoryApp.warehouse.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
