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
  it("should return the mouse position's value out of 360 as an whole number, given the mouse position and screen width", function() {
    var scaled1 = color_grid.getScaledX(40,1000),
      scaled2 = color_grid.getScaledX(11,1000);
      scaled3 = color_grid.getScaledX(10,360);
      scaled4 = color_grid.getScaledX(100.5,360);
      scaled5 = color_grid.getScaledX(100.1,360);
      scaled6 = color_grid.getScaledX(100.9,360);
      expect(scaled1).to.equal(14);
      expect(scaled2).to.equal(3);
      expect(scaled3).to.equal(10);
      expect(scaled4).to.equal(100);
      expect(scaled5).to.equal(100);
      expect(scaled6).to.equal(100);
  });
  it("should return 360 when the mouse position is greater than the width of the screen", function() {
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
describe("getScaledY", function() {
  it("should return correct scaled values between 15 and 85, inclusive", function() {
    var scaled1 = color_grid.getScaledY(50.1, 100),
      scaled2 = color_grid.getScaledY(50.5,100);
      scaled3 = color_grid.getScaledY(0,70);
      scaled4 = color_grid.getScaledY(1,70);
      scaled5 = color_grid.getScaledY(69,70);
      scaled6 = color_grid.getScaledY(70,70);
      scaled7 = color_grid.getScaledY(69.9, 70);
      scaled8 = color_grid.getScaledY(68.9, 70);
      expect(scaled1).to.equal(50);
      expect(scaled2).to.equal(50);
      expect(scaled3).to.equal(15);
      expect(scaled4).to.equal(16);
      expect(scaled5).to.equal(84);
      expect(scaled6).to.equal(85);
      expect(scaled7).to.equal(84);
      expect(scaled8).to.equal(83);
  });
  describe("for non numeric values", function() {
    it("should return 15", function() {
      var scaled1 = color_grid.getScaledY(true, 100),
        scaled2 = color_grid.getScaledY(false, 100),
        scaled3 = color_grid.getScaledY("string", 100),
        scaled4 = color_grid.getScaledY(null, 100),
        scaled5 = color_grid.getScaledY(),
        scaled6 = color_grid.getScaledY(undefined, 100),
        scaled7 = color_grid.getScaledY(NaN, 100),
        scaled8 = color_grid.getScaledY(100, true),
        scaled9 = color_grid.getScaledY(100, false),
        scaled10 = color_grid.getScaledY(100, "string"),
        scaled11 = color_grid.getScaledY(100, null),
        scaled12 = color_grid.getScaledY(100),
        scaled13 = color_grid.getScaledY(100, undefined),
        scaled14 = color_grid.getScaledY(100, NaN);

      expect(scaled1).to.equal(15);
      expect(scaled2).to.equal(15);
      expect(scaled3).to.equal(15);
      expect(scaled4).to.equal(15);
      expect(scaled5).to.equal(15);
      expect(scaled6).to.equal(15);
      expect(scaled7).to.equal(15);
      expect(scaled8).to.equal(15);
      expect(scaled9).to.equal(15);
      expect(scaled10).to.equal(15);
      expect(scaled11).to.equal(15);
      expect(scaled12).to.equal(15);
      expect(scaled13).to.equal(15);
      expect(scaled14).to.equal(15);
    });
  });
  describe("for mouse position less than 0", function() {
    it("should return 15", function() {
      var scaled = color_grid.getScaledY(-10, 100);
      expect(scaled).to.equal(15);
    });
  });
  describe("when the mouse position is greater than the height of the screen", function() {
    it("should return 85", function() {
      var scaled = color_grid.getScaledY(1000, 100);
      expect(scaled).to.equal(85);
    });
  });
});
