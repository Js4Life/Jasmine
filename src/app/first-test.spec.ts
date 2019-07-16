describe('my first test',() =>{  // describe = jasmine functn
    let sut;

    beforeEach(()=>{
        sut={}; // setup and less action
    });

    it('should be true if true',()=> {  // critical setup here

        // arrange
        sut.a = false;

        // act 
        sut.a = true;

        // assert
        expect(sut.a).toBe(true);
        
    })
})

