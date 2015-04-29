var jsdom = require("jsdom"),
expect = require("chai").expect;

document = jsdom.jsdom("<!doctype html><html><body></body></html>");
window   = document.defaultView;

var color_grid = require("../src/color-grid.js");

describe("Rgb", function() {
  describe("constructor", function() {
    it("should return an Rgb object with the submitted RGB values, rounded down to 0 decimal places", function () {
        var rgb1 = new color_grid.Rgb(1,2.14,3.99);
        expect(rgb1 instanceof color_grid.Rgb);
        expect(rgb1.r).to.equal(1);
        expect(rgb1.g).to.equal(2);
        expect(rgb1.b).to.equal(3);
    });
    it("should return an object with r, g, and b equal to 255, when called with null or weird values", function () {
      var rgb1 = new color_grid.Rgb(),
      rgb2 = new color_grid.Rgb("g", -10, 1700);
      expect(rgb1.r).to.equal(255);
      expect(rgb1.g).to.equal(255);
      expect(rgb1.b).to.equal(255);
      expect(rgb2.r).to.equal(255);
      expect(rgb2.g).to.equal(255);
      expect(rgb2.b).to.equal(255);
    });
    it("should return an object with the correct values when the inputs are strings containing numbers", function() {
      var rgb5 = new color_grid.Rgb("10", "55", "260");
      expect(rgb5.r).to.equal(10);
      expect(rgb5.g).to.equal(55);
      expect(rgb5.b).to.equal(255);
    });
  });
  describe("toString", function() {
    it("should return a valid CSS rgb string", function() {
      var rgb = new color_grid.Rgb(1,2,3);
      var rgb_string = rgb.toString();
      expect(rgb_string).to.equal("rgb(1,2,3)");
    });
  });
  describe("isEqual", function() {
    it("should return true when two different Rgb objects have the same r, g, b values", function() {
      var rgb1 = new color_grid.Rgb(1,2,3),
        rgb2 = new color_grid.Rgb(1,2,3);
      var areEqual = rgb1.isEqual(rgb2);
      expect(areEqual).to.equal(true);
    });
    it("should return false when two different Rgb objects have different r, g, b values", function() {
      var rgb1 = new color_grid.Rgb(1,2,3),
        rgb2 = new color_grid.Rgb(1,0,3);
      var areEqual = rgb1.isEqual(rgb2);
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
    expect(scaled_mouse_position).to.equal(360);
  });
  it("should return 0 when non numeric values are used", function() {
    expect(color_grid.getScaledX(null, 1000)).to.equal(360);
    expect(color_grid.getScaledX(undefined, 1000)).to.equal(360);
    expect(color_grid.getScaledX(NaN, 1000)).to.equal(360);
    expect(color_grid.getScaledX(true, 1000)).to.equal(360);
    expect(color_grid.getScaledX(false, 1000)).to.equal(360);
    expect(color_grid.getScaledX("string", 1000)).to.equal(360);

    expect(color_grid.getScaledX(10, null)).to.equal(360);
    expect(color_grid.getScaledX(10, undefined)).to.equal(360);
    expect(color_grid.getScaledX(10, NaN)).to.equal(360);
    expect(color_grid.getScaledX(10, true)).to.equal(360);
    expect(color_grid.getScaledX(10, false)).to.equal(360);
    expect(color_grid.getScaledX(10, "string")).to.equal(360);
  });
});
describe("getIntensityfromScaledX", function() {
  describe("for the input color r", function() {
    it("should return the correct values for numbers between 0 and 360, based on the color wheel", function() {
      expect(color_grid.getIntensityfromScaledX(0, "r")).to.equal(255);
      expect(color_grid.getIntensityfromScaledX(30, "r")).to.equal(255);
      expect(color_grid.getIntensityfromScaledX(60, "r")).to.equal(255);
      expect(color_grid.getIntensityfromScaledX(90, "r")).to.equal(127.5);
      expect(color_grid.getIntensityfromScaledX(120, "r")).to.equal(0);
      expect(color_grid.getIntensityfromScaledX(150, "r")).to.equal(0);
      expect(color_grid.getIntensityfromScaledX(180, "r")).to.equal(0);
      expect(color_grid.getIntensityfromScaledX(210, "r")).to.equal(0);
      expect(color_grid.getIntensityfromScaledX(240, "r")).to.equal(0);
      expect(color_grid.getIntensityfromScaledX(270, "r")).to.equal(127.5);
      expect(color_grid.getIntensityfromScaledX(300, "r")).to.equal(255);
      expect(color_grid.getIntensityfromScaledX(330, "r")).to.equal(255);
      expect(color_grid.getIntensityfromScaledX(360, "r")).to.equal(255);
    });
  });
  describe("for the input color g", function() {
    it("should return the correct values for numbers between 0 and 360, based on the color wheel", function() {
      expect(color_grid.getIntensityfromScaledX(0, "g")).to.equal(0);
      expect(color_grid.getIntensityfromScaledX(30, "g")).to.equal(127.5);
      expect(color_grid.getIntensityfromScaledX(60, "g")).to.equal(255);
      expect(color_grid.getIntensityfromScaledX(90, "g")).to.equal(255);
      expect(color_grid.getIntensityfromScaledX(120, "g")).to.equal(255);
      expect(color_grid.getIntensityfromScaledX(150, "g")).to.equal(255);
      expect(color_grid.getIntensityfromScaledX(180, "g")).to.equal(255);
      expect(color_grid.getIntensityfromScaledX(210, "g")).to.equal(127.5);
      expect(color_grid.getIntensityfromScaledX(240, "g")).to.equal(0);
      expect(color_grid.getIntensityfromScaledX(270, "g")).to.equal(0);
      expect(color_grid.getIntensityfromScaledX(300, "g")).to.equal(0);
      expect(color_grid.getIntensityfromScaledX(330, "g")).to.equal(0);
      expect(color_grid.getIntensityfromScaledX(360, "g")).to.equal(0);
    });
  });
  describe("for the input color b", function() {
    it("should return the correct values for numbers between 0 and 360, based on the color wheel", function() {
      expect(color_grid.getIntensityfromScaledX(0, "b")).to.equal(0);
      expect(color_grid.getIntensityfromScaledX(30, "b")).to.equal(0);
      expect(color_grid.getIntensityfromScaledX(60, "b")).to.equal(0);
      expect(color_grid.getIntensityfromScaledX(90, "b")).to.equal(0);
      expect(color_grid.getIntensityfromScaledX(120, "b")).to.equal(0);
      expect(color_grid.getIntensityfromScaledX(150, "b")).to.equal(127.5);
      expect(color_grid.getIntensityfromScaledX(180, "b")).to.equal(255);
      expect(color_grid.getIntensityfromScaledX(210, "b")).to.equal(255);
      expect(color_grid.getIntensityfromScaledX(240, "b")).to.equal(255);
      expect(color_grid.getIntensityfromScaledX(270, "b")).to.equal(255);
      expect(color_grid.getIntensityfromScaledX(300, "b")).to.equal(255);
      expect(color_grid.getIntensityfromScaledX(330, "b")).to.equal(127.5);
      expect(color_grid.getIntensityfromScaledX(360, "b")).to.equal(0);
    });
  });
  describe("when no color is given", function() {
    it("should return the values for the color r", function() {
      expect(color_grid.getIntensityfromScaledX(0)).to.equal(255);
      expect(color_grid.getIntensityfromScaledX(30)).to.equal(255);
      expect(color_grid.getIntensityfromScaledX(60)).to.equal(255);
      expect(color_grid.getIntensityfromScaledX(90)).to.equal(127.5);
      expect(color_grid.getIntensityfromScaledX(120)).to.equal(0);
      expect(color_grid.getIntensityfromScaledX(150)).to.equal(0);
      expect(color_grid.getIntensityfromScaledX(180)).to.equal(0);
      expect(color_grid.getIntensityfromScaledX(210)).to.equal(0);
      expect(color_grid.getIntensityfromScaledX(240)).to.equal(0);
      expect(color_grid.getIntensityfromScaledX(270)).to.equal(127.5);
      expect(color_grid.getIntensityfromScaledX(300)).to.equal(255);
      expect(color_grid.getIntensityfromScaledX(330)).to.equal(255);
      expect(color_grid.getIntensityfromScaledX(360)).to.equal(255);
    });
  });
  describe("for color values below 0", function() {
    it("should return the value as if 0 were the input", function() {
      expect(color_grid.getIntensityfromScaledX(-10, "r")).to.equal(255);
      expect(color_grid.getIntensityfromScaledX(-10, "g")).to.equal(0);
      expect(color_grid.getIntensityfromScaledX(-10, "b")).to.equal(0);
    });
  });
  describe("for values greater than 360", function() {
    it("should return the value as if 0 were the input", function() {
      expect(color_grid.getIntensityfromScaledX(1000, "r")).to.equal(255);
      expect(color_grid.getIntensityfromScaledX(1000, "g")).to.equal(0);
      expect(color_grid.getIntensityfromScaledX(1000, "b")).to.equal(0);
    });
  });
  describe("for non number color values", function() {
    it("should return the value as if 0 were the input", function() {
      expect(color_grid.getIntensityfromScaledX("string", "r")).to.equal(255);
      expect(color_grid.getIntensityfromScaledX("string", "g")).to.equal(0);
      expect(color_grid.getIntensityfromScaledX("string", "b")).to.equal(0);

      expect(color_grid.getIntensityfromScaledX(undefined, "r")).to.equal(255);
      expect(color_grid.getIntensityfromScaledX(undefined, "g")).to.equal(0);
      expect(color_grid.getIntensityfromScaledX(undefined, "b")).to.equal(0);

      expect(color_grid.getIntensityfromScaledX(null, "r")).to.equal(255);
      expect(color_grid.getIntensityfromScaledX(null, "g")).to.equal(0);
      expect(color_grid.getIntensityfromScaledX(null, "b")).to.equal(0);

      expect(color_grid.getIntensityfromScaledX(NaN, "r")).to.equal(255);
      expect(color_grid.getIntensityfromScaledX(NaN, "g")).to.equal(0);
      expect(color_grid.getIntensityfromScaledX(NaN, "b")).to.equal(0);

      expect(color_grid.getIntensityfromScaledX(true, "r")).to.equal(255);
      expect(color_grid.getIntensityfromScaledX(true, "g")).to.equal(0);
      expect(color_grid.getIntensityfromScaledX(true, "b")).to.equal(0);

      expect(color_grid.getIntensityfromScaledX(false, "r")).to.equal(255);
      expect(color_grid.getIntensityfromScaledX(false, "g")).to.equal(0);
      expect(color_grid.getIntensityfromScaledX(false, "b")).to.equal(0);
    });
  });
});
describe("getRgbFromScaledX", function() {
  it("should return an Rgb object", function() {
    var rgb = color_grid.getRgbFromScaledX(10);
    expect(rgb instanceof color_grid.Rgb).to.equal(true);
  });
  it("should return an Rgb object with correct r, g, b values for the scaled mouse position given", function() {
    expect(color_grid.getRgbFromScaledX(0).isEqual(new color_grid.Rgb(255,0,0))).to.equal(true);
    expect(color_grid.getRgbFromScaledX(10).isEqual(new color_grid.Rgb(255,42,0))).to.equal(true);
    expect(color_grid.getRgbFromScaledX(20).isEqual(new color_grid.Rgb(255,85,0))).to.equal(true);
    expect(color_grid.getRgbFromScaledX(30).isEqual(new color_grid.Rgb(255,127,0))).to.equal(true);
    expect(color_grid.getRgbFromScaledX(40).isEqual(new color_grid.Rgb(255,170,0))).to.equal(true);
    expect(color_grid.getRgbFromScaledX(50).isEqual(new color_grid.Rgb(255,212,0))).to.equal(true);
    expect(color_grid.getRgbFromScaledX(60).isEqual(new color_grid.Rgb(255,255,0))).to.equal(true);
    expect(color_grid.getRgbFromScaledX(70).isEqual(new color_grid.Rgb(212,255,0))).to.equal(true);
    expect(color_grid.getRgbFromScaledX(80).isEqual(new color_grid.Rgb(170,255,0))).to.equal(true);
    expect(color_grid.getRgbFromScaledX(90).isEqual(new color_grid.Rgb(127,255,0))).to.equal(true);
    expect(color_grid.getRgbFromScaledX(100).isEqual(new color_grid.Rgb(85,255,0))).to.equal(true);
    expect(color_grid.getRgbFromScaledX(110).isEqual(new color_grid.Rgb(42,255,0))).to.equal(true);
    expect(color_grid.getRgbFromScaledX(120).isEqual(new color_grid.Rgb(0,255,0))).to.equal(true);
    expect(color_grid.getRgbFromScaledX(130).isEqual(new color_grid.Rgb(0,255,42))).to.equal(true);
    expect(color_grid.getRgbFromScaledX(140).isEqual(new color_grid.Rgb(0,255,85))).to.equal(true);
    expect(color_grid.getRgbFromScaledX(150).isEqual(new color_grid.Rgb(0,255,127))).to.equal(true);
    expect(color_grid.getRgbFromScaledX(160).isEqual(new color_grid.Rgb(0,255,170))).to.equal(true);
    expect(color_grid.getRgbFromScaledX(170).isEqual(new color_grid.Rgb(0,255,212))).to.equal(true);
    expect(color_grid.getRgbFromScaledX(180).isEqual(new color_grid.Rgb(0,255,255))).to.equal(true);
    expect(color_grid.getRgbFromScaledX(190).isEqual(new color_grid.Rgb(0,212,255))).to.equal(true);
    expect(color_grid.getRgbFromScaledX(200).isEqual(new color_grid.Rgb(0,170,255))).to.equal(true);
    expect(color_grid.getRgbFromScaledX(210).isEqual(new color_grid.Rgb(0,127,255))).to.equal(true);
    expect(color_grid.getRgbFromScaledX(220).isEqual(new color_grid.Rgb(0,85,255))).to.equal(true);
    expect(color_grid.getRgbFromScaledX(230).isEqual(new color_grid.Rgb(0,42,255))).to.equal(true);
    expect(color_grid.getRgbFromScaledX(240).isEqual(new color_grid.Rgb(0,0,255))).to.equal(true);
    expect(color_grid.getRgbFromScaledX(250).isEqual(new color_grid.Rgb(42,0,255))).to.equal(true);
    expect(color_grid.getRgbFromScaledX(260).isEqual(new color_grid.Rgb(85,0,255))).to.equal(true);
    expect(color_grid.getRgbFromScaledX(270).isEqual(new color_grid.Rgb(127,0,255))).to.equal(true);
    expect(color_grid.getRgbFromScaledX(280).isEqual(new color_grid.Rgb(170,0,255))).to.equal(true);
    expect(color_grid.getRgbFromScaledX(290).isEqual(new color_grid.Rgb(212,0,255))).to.equal(true);
    expect(color_grid.getRgbFromScaledX(300).isEqual(new color_grid.Rgb(255,0,255))).to.equal(true);
    expect(color_grid.getRgbFromScaledX(310).isEqual(new color_grid.Rgb(255,0,212))).to.equal(true);
    expect(color_grid.getRgbFromScaledX(320).isEqual(new color_grid.Rgb(255,0,170))).to.equal(true);
    expect(color_grid.getRgbFromScaledX(330).isEqual(new color_grid.Rgb(255,0,127))).to.equal(true);
    expect(color_grid.getRgbFromScaledX(340).isEqual(new color_grid.Rgb(255,0,85))).to.equal(true);
    expect(color_grid.getRgbFromScaledX(350).isEqual(new color_grid.Rgb(255,0,42))).to.equal(true);
    expect(color_grid.getRgbFromScaledX(360).isEqual(new color_grid.Rgb(255,0,0))).to.equal(true);
  });
  describe("for input values less than 0", function() {
    it("should return the Rgb object as if 0 were the input", function() {
      expect(color_grid.getRgbFromScaledX(-10).isEqual(new color_grid.Rgb(255,0,0))).to.equal(true);
    });
  });
  describe("for input values greater than 360", function() {
    it("should return the Rgb object as if 0 were the input", function() {
      expect(color_grid.getRgbFromScaledX(1000).isEqual(new color_grid.Rgb(255,0,0))).to.equal(true);
    });
  });
  describe("for non-numeric input values", function() {
    it("should return the Rgb object as if 0 were the input", function() {
      expect(color_grid.getRgbFromScaledX("string").isEqual(new color_grid.Rgb(255,0,0))).to.equal(true);
      expect(color_grid.getRgbFromScaledX(undefined).isEqual(new color_grid.Rgb(255,0,0))).to.equal(true);
      expect(color_grid.getRgbFromScaledX(null).isEqual(new color_grid.Rgb(255,0,0))).to.equal(true);
      expect(color_grid.getRgbFromScaledX(NaN).isEqual(new color_grid.Rgb(255,0,0))).to.equal(true);
      expect(color_grid.getRgbFromScaledX(true).isEqual(new color_grid.Rgb(255,0,0))).to.equal(true);
      expect(color_grid.getRgbFromScaledX(false).isEqual(new color_grid.Rgb(255,0,0))).to.equal(true);
    });
  });
});
