import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { InventoryReport } from './inventory-report.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<InventoryReport>;

@Injectable()
export class InventoryReportService {

    private resourceUrl =  SERVER_API_URL + 'api/inventory-reports';

    constructor(private http: HttpClient) { }

    create(inventoryReport: InventoryReport): Observable<EntityResponseType> {
        const copy = this.convert(inventoryReport);
        return this.http.post<InventoryReport>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(inventoryReport: InventoryReport): Observable<EntityResponseType> {
        const copy = this.convert(inventoryReport);
        return this.http.put<InventoryReport>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<InventoryReport>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<InventoryReport[]>> {
        const options = createRequestOption(req);
        return this.http.get<InventoryReport[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<InventoryReport[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: InventoryReport = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<InventoryReport[]>): HttpResponse<InventoryReport[]> {
        const jsonResponse: InventoryReport[] = res.body;
        const body: InventoryReport[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to InventoryReport.
     */
    private convertItemFromServer(inventoryReport: InventoryReport): InventoryReport {
        const copy: InventoryReport = Object.assign({}, inventoryReport);
        return copy;
    }

    /**
     * Convert a InventoryReport to a JSON which can be sent to the server.
     */
    private convert(inventoryReport: InventoryReport): InventoryReport {
        const copy: InventoryReport = Object.assign({}, inventoryReport);
        return copy;
    }
}
