import { TestBed, ComponentFixture, fakeAsync,tick, flush } from "@angular/core/testing";
import { HeroDetailComponent } from "./hero-detail.component";
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../hero.service";
import { Location } from '@angular/common';
import { of } from "rxjs";
import { FormsModule } from "@angular/forms";
;

describe('HeroDetailComponent',()=> {

    let fixture : ComponentFixture<HeroDetailComponent>;
    let mockActivatedRoute , mockHeroService , mockLocation;

    beforeEach(()=> {

        mockActivatedRoute = {
            snapshot : { paramMap : { get : () => { return '3';}}}
        }

        mockHeroService = jasmine.createSpyObj(['getHero','updateHero']);

        mockLocation = jasmine.createSpyObj(['back'])



        TestBed.configureTestingModule({
            imports:[FormsModule],
            declarations: [HeroDetailComponent],
            providers:[
                {provide : ActivatedRoute , useValue : mockActivatedRoute},

                {provide : HeroService , useValue : mockHeroService},

                {provide : Location , useValue : mockLocation},


            ]
        });

        fixture = TestBed.createComponent(HeroDetailComponent)

        mockHeroService.getHero.and.returnValue(of({id :3,name:'SuperDude',strength:100}))

    });

    it('it should render hero name name in a h2 tag', ()=>{
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERDUDE')
    })

it('should call updateHero when save',fakeAsync(()=>{
    mockHeroService.updateHero.and.returnValue(of({}))
    fixture.detectChanges()

    fixture.componentInstance.save();
    flush();
    // tick(250);

    expect(mockHeroService.updateHero).toHaveBeenCalled();

    // setTimeout(()=>{
    //     expect(mockHeroService.updateHero).toHaveBeenCalled();
        
    
    // },250);

}))

})