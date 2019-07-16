import { TestBed, inject } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";
import {HttpClientTestingModule,HttpTestingController} from '@angular/common/http/testing'

describe('HeroService',()=> {

    let mockMessageService;
    let httpTestingController : HttpTestingController;
    let service;

    beforeEach(()=>{
        mockMessageService = jasmine.createSpyObj(['add']);

        TestBed.configureTestingModule({
            imports :[HttpClientTestingModule],
            providers : [
                HeroService,
                {provide : MessageService , useValue : mockMessageService}
            ]
        })

       service = TestBed.get(HeroService)
       httpTestingController = TestBed.get(HttpTestingController)
       // let msgSvc = TestBed.get(MessageService)

    })

    describe('getHero',()=>{
        it('Should call get with correct URL',()=>{

                    service.getHero(4).subscribe();
                 //  service.getHero(3).subscribe();

                    const req = httpTestingController.expectOne('api/heroes/4');

                    req.flush({id:4,name:'Super Dude',strength : 100});

                    httpTestingController.verify();
        });
    })


})