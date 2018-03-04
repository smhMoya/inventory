import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SteelPipe } from './steel-pipe.model';
import { SteelPipeService } from './steel-pipe.service';

@Component({
    selector: 'jhi-steel-pipe-detail',
    templateUrl: './steel-pipe-detail.component.html'
})
export class SteelPipeDetailComponent implements OnInit, OnDestroy {

    steelPipe: SteelPipe;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private steelPipeService: SteelPipeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSteelPipes();
    }

    load(id) {
        this.steelPipeService.find(id)
            .subscribe((steelPipeResponse: HttpResponse<SteelPipe>) => {
                this.steelPipe = steelPipeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSteelPipes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'steelPipeListModification',
            (response) => this.load(this.steelPipe.id)
        );
    }
}
