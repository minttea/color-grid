var jsdom = require("jsdom"),
expect = require("chai").expect;

document = jsdom.jsdom("<!doctype html><html><body></body></html>");
window   = document.defaultView;

var color_grid = require("../src/color-grid.js");

describe("color grid", function() {
   describe("Rgb()", function() {
       it("should return an object with the submitted RGB values", function () {
           var rgb1 = new color_grid.Rgb(1,2,3);
            expect(rgb1.r).to.equal(1);
            expect(rgb1.g).to.equal(2);
            expect(rgb1.b).to.equal(3);
       });
       it("should return an object with r, g, and b equal to 255, when called with null or weird values", function () {
        var rgb2 = new color_grid.Rgb(),
        rgb3 = new color_grid.Rgb("g", -10, 1700);
        rgb4 = new color_grid.Rgb("g", -10, 14.99);
        expect(rgb2.r).to.equal(255);
        expect(rgb2.g).to.equal(255);
        expect(rgb2.b).to.equal(255);
        expect(rgb3.r).to.equal(255);
        expect(rgb3.g).to.equal(255);
        expect(rgb3.b).to.equal(255);
        expect(rgb4.b).to.equal(14);
       });
       it("should return an object with the correct values when the inputs are strings", function() {
        var rgb5 = new color_grid.Rgb("10", "55", "260");
        expect(rgb5.r).to.equal(10);
        expect(rgb5.g).to.equal(55);
        expect(rgb5.b).to.equal(255);
       })
   });
});