import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { NO_ERRORS_SCHEMA, Input, Component, Directive } from "@angular/core";
import { HeroService } from "../hero.service";
import { of } from "rxjs";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";


@Directive({
    selector:'[routerLink]',
    host : {'(click)':'onClick()'}
})

export class RouterLinkDirectiveSub {
    navigatedTo:any = null;
    @Input('routerLink') linkParams: any;

    
    onClick() {
        this.navigatedTo = this.linkParams;
    }
}

describe('HeroesComponent (Deep testing)',()=>{
    let fixture:ComponentFixture<HeroesComponent>;
    let mockHeroService ;
    let HEROES;

// remove fake component v/s shallow


    beforeEach(()=>{
        HEROES = [
            { id: 1, name: 'Tony', strength: 8 },
            { id: 2, name: 'Wonderful Woman', strength: 24 },
            { id: 3, name: 'SuperDude', strength: 55 }
        ]


        mockHeroService = jasmine.createSpyObj(['getHeroes','addHero','deleteHero']);

        TestBed.configureTestingModule({
            declarations:[
                HeroesComponent,
                HeroComponent,
                RouterLinkDirectiveSub
                
            ],
            providers : [
                {provide :HeroService, useValue : mockHeroService}
            ],
     
         //   schemas : [NO_ERRORS_SCHEMA]
        })
        fixture = TestBed.createComponent(HeroesComponent)
        mockHeroService.getHeroes.and.returnValue(of(HEROES))

        fixture.detectChanges();
    });

    it('should be true',()=> {
        expect(true).toBe(true);
    })
    
    it('should render each hero as Hero Component',() => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES))

        // run ngOnInit
        fixture.detectChanges();

       // fixture.debugElement.queryAll(By.directive(HeroComponent))

        const heroCompDEs = fixture.debugElement.queryAll(By.directive(HeroComponent))
       // expect(heroCompDEs.length).toEqual(3);
       for(let i = 0; i < heroCompDEs.length;i++) {
        expect(heroCompDEs[i].componentInstance.hero).toEqual(HEROES[i])
       }
       
    })


    // it('should set heroes correctly from service ',()=>{
    //     mockHeroService.getHeroes.and.returnValue(of(HEROES))
    //     fixture.detectChanges();

    //     expect(fixture.componentInstance.heroes.length).toBe(3);
    // })

    // it('should create one li for each hero',() => {
    //     mockHeroService.getHeroes.and.returnValue(of(HEROES));
    //     fixture.detectChanges();

    //     expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
    // })

    it(`should call heroService delete hero when Hero Component's delete button is clicked`,()=>{

        spyOn(fixture.componentInstance , 'delete'); 

        mockHeroService.getHeroes.and.returnValue(of(HEROES))

        fixture.detectChanges();

        const heroCompoents = fixture.debugElement.queryAll(By.directive(HeroComponent));
        // heroCompoents[0]
        // .query(By.css('button'))
        // .triggerEventHandler('click',{ stopPropagation : () => {} });

        //(<HeroComponent>heroCompoents[0].componentInstance).delete.emit(undefined);

        heroCompoents[0].triggerEventHandler('delete',null);

            expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
    })

    it('should add a new Hero to the hero list when the add button is clicked',()=>{
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        fixture.detectChanges();

        const name = "Mr Ice";

        mockHeroService.addHero.and.returnValue(of({id : 5 , name : name , strength : 4}))

        const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;

        const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

        inputElement.value = name;

        addButton.triggerEventHandler('click',null)

        fixture.detectChanges();

        const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;

        expect(heroText).toContain(name);


    })

    it('it should have correct route for first hero',()=>{

        mockHeroService.getHeroes.and.returnValue(of(HEROES))
        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent))

        fixture.detectChanges();

        let routerLink = heroComponents[0]
        .query(By.directive(RouterLinkDirectiveSub))
        .injector.get(RouterLinkDirectiveSub);

        heroComponents[0].query(By.css('a')).triggerEventHandler('click',null)
        expect(routerLink.navigatedTo).toBe('/detail/1')

    })

})