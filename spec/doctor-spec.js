import { Doctor } from './../src/doctor.js';


  describe ('Doctor', function() {
  it('should check basics', function() {
    var newThing = new Doctor("Chris");
    expect(newThing.name).toEqual("Chris");
  })
})
