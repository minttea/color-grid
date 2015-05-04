var jsdom = require("jsdom"),
expect = require("chai").expect;

/*jshint -W020 */
document = jsdom.jsdom("<!doctype html><html><body></body></html>");
window   = document.defaultView;
/*jshint +W020 */

var color_grid = require("../src/color-grid.js");

describe("Hsl", function() {
  describe("constructor", function() {
    it("should return an Hsl object with the submitted h, s, l values, rounded down to 0 decimal places", function () {
        var hsl = new color_grid.Hsl(160.3,87.3,3.99);
        expect(hsl instanceof color_grid.Hsl);
        expect(hsl.h).to.equal(160);
        expect(hsl.s).to.equal(87);
        expect(hsl.l).to.equal(3);
    });
    it("should return an object with h, s, l equal to 0, 100, 50 respectively when called with non number or weird values", function() {
      var hsl1 = new color_grid.Hsl(),
      hsl2 = new color_grid.Hsl("g", -10, 1700);
      hsl3 = new color_grid.Hsl(1700, "g", -10);
      hsl4 = new color_grid.Hsl(-10, 1700, "g");
      expect(hsl1.h).to.equal(0);
      expect(hsl1.s).to.equal(100);
      expect(hsl1.l).to.equal(50);
      expect(hsl2.h).to.equal(0);
      expect(hsl2.s).to.equal(100);
      expect(hsl2.l).to.equal(50);
      expect(hsl3.h).to.equal(0);
      expect(hsl3.s).to.equal(100);
      expect(hsl3.l).to.equal(50);
      expect(hsl4.h).to.equal(0);
      expect(hsl4.s).to.equal(100);
      expect(hsl4.l).to.equal(50);
    });
    it("should return an object with the correct values when the inputs are strings containing numbers", function() {
      var hsl = new color_grid.Hsl("10", "55", "99");
      expect(hsl.h).to.equal(10);
      expect(hsl.s).to.equal(55);
      expect(hsl.l).to.equal(99);
    });
  });
  describe("toString", function() {
    it("should return a valid CSS hsl string", function() {
      var hsl = new color_grid.Hsl(0,100,50);
      var hsl_string = hsl.toString();
      expect(hsl_string).to.equal("hsl(0, 100%, 50%)");
    });
  });
  describe("isEqual", function() {
    it("should return true when two different Hsl objects have the same h, s, l values", function() {
      var hsl1 = new color_grid.Hsl(1,2,3),
        hsl2 = new color_grid.Hsl(1,2,3);
      var areEqual = hsl1.isEqual(hsl2);
      expect(areEqual).to.equal(true);
    });
    it("should return false when two different Hsl objects have different h, s, l values", function() {
      var hsl1 = new color_grid.Hsl(1,2,3),
      hsl2 = new color_grid.Hsl(1,0,3);
      var areEqual = hsl1.isEqual(hsl2);
      expect(areEqual).to.equal(false);
    });
  });
});
describe("getScaledX", function() {
  it("should return the mouse position's value out of 360, given the mouse position and screen width", function() {
    var screen_width = 1000,
      mouse_position = 40,
      scaled_mouse_position = color_grid.getScaledX(mouse_position, screen_width);
    expect(scaled_mouse_position).to.equal(14.4);
  });
  it("should return 360 when the mouse position is greather than the width of the screen", function() {
    var screen_width = 1000,
      mouse_position = 2000,
      scaled_mouse_position = color_grid.getScaledX(mouse_position, screen_width);
    expect(scaled_mouse_position).to.equal(360);
  });
  it("should return 0 when the mouse position is less than 0", function() {
    var screen_width = 1000,
      mouse_position = -10,
      scaled_mouse_position = color_grid.getScaledX(mouse_position, screen_width);
    expect(scaled_mouse_position).to.equal(0);
  });
  it("should return 0 when non numeric values are used", function() {
    expect(color_grid.getScaledX(null, 1000)).to.equal(0);
    expect(color_grid.getScaledX(undefined, 1000)).to.equal(0);
    expect(color_grid.getScaledX(NaN, 1000)).to.equal(0);
    expect(color_grid.getScaledX(true, 1000)).to.equal(0);
    expect(color_grid.getScaledX(false, 1000)).to.equal(0);
    expect(color_grid.getScaledX("string", 1000)).to.equal(0);

    expect(color_grid.getScaledX(10, null)).to.equal(0);
    expect(color_grid.getScaledX(10, undefined)).to.equal(0);
    expect(color_grid.getScaledX(10, NaN)).to.equal(0);
    expect(color_grid.getScaledX(10, true)).to.equal(0);
    expect(color_grid.getScaledX(10, false)).to.equal(0);
    expect(color_grid.getScaledX(10, "string")).to.equal(0);
  });
});
