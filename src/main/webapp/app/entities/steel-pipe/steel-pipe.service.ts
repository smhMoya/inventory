import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SteelPipe } from './steel-pipe.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SteelPipe>;

@Injectable()
export class SteelPipeService {

    private resourceUrl =  SERVER_API_URL + 'api/steel-pipes';

    constructor(private http: HttpClient) { }

    create(steelPipe: SteelPipe): Observable<EntityResponseType> {
        const copy = this.convert(steelPipe);
        return this.http.post<SteelPipe>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(steelPipe: SteelPipe): Observable<EntityResponseType> {
        const copy = this.convert(steelPipe);
        return this.http.put<SteelPipe>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SteelPipe>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SteelPipe[]>> {
        const options = createRequestOption(req);
        return this.http.get<SteelPipe[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SteelPipe[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SteelPipe = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SteelPipe[]>): HttpResponse<SteelPipe[]> {
        const jsonResponse: SteelPipe[] = res.body;
        const body: SteelPipe[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SteelPipe.
     */
    private convertItemFromServer(steelPipe: SteelPipe): SteelPipe {
        const copy: SteelPipe = Object.assign({}, steelPipe);
        return copy;
    }

    /**
     * Convert a SteelPipe to a JSON which can be sent to the server.
     */
    private convert(steelPipe: SteelPipe): SteelPipe {
        const copy: SteelPipe = Object.assign({}, steelPipe);
        return copy;
    }
}
