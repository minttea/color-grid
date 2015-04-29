(function () {
  "use strict";

  var currentBodyColor = new Rgb(),
    body,
    bodyX;

    function Rgb(r, g, b) {
        r = parseInt(r, 10);
        g = parseInt(g, 10);
        b = parseInt(b, 10);

        if ((typeof (r) !== "number" && !r) || (r > 255 || r < 0)) {
          r = 255;
        }

        if ((typeof (g) !== "number" && !g) || (g > 255 || g < 0)) {
          g = 255;
        }

        if ((typeof (b) !== "number" && !b) || (b > 255 || b < 0)) {
          b = 255;
        }

        this.r = r;
        this.g = g;
        this.b = b;
      }

  Rgb.prototype.toString = function () {
    return "RGB(" + this.r + "," + this.g + "," + this.b + ")";
  };

  Rgb.prototype.isEqual = function (other) {
    if (this.r === other.r &&
        this.b === other.b &&
        this.g === other.g) {
      return true;
    }
    return false;
  };

  function getScaledX(mouseX, width) {
    return 360 * mouseX / width;
  }

  function getIntensityfromScaledX(scaledX, color) {

    var start,
      finalValue;

    switch (color) {
    case "r":
      start = (scaledX + 240) % 360;
      break;
    case "g":
      start = (scaledX + 120) % 360;
      break;
    case "b":
      start = scaledX % 360;
      break;
    }

    function piecewiseUp(x) {
      return 4.25 * x - 510;
    }

    function piecewiseDown(x) {
      return 1530 - 4.25 * x;
    }

    if (start >= 0 && start < 120) {
      finalValue = 0;
    } else if (start >= 120 && start < 180) {
      finalValue = piecewiseUp(start);
    } else if (start >= 180 && start < 300) {
      finalValue = 255;
    } else if (start >= 300 && start < 360) {
      finalValue = piecewiseDown(start);
    }

    return finalValue;
  }

  function getRgbFromScaledX(scaledX) {
    var r, g, b;

    r = getIntensityfromScaledX(scaledX, "r");
    g = getIntensityfromScaledX(scaledX, "g");
    b = getIntensityfromScaledX(scaledX, "b");

    return new Rgb(r, g, b);
  }

  function getBodyWidth() {
    return window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
  }

  function resize() {
    bodyX = getBodyWidth();
  }

  function addMouseOverFunc() {
    document.addEventListener("mousemove", function (e) {

      var mouseX = e.screenX,
        scaledX = getScaledX(mouseX, bodyX),
        color = getRgbFromScaledX(scaledX);

      if (!color.isEqual(currentBodyColor)) {
        body.style.backgroundColor = color.toString();
        currentBodyColor = color;
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    body = document.getElementsByTagName('body')[0];
    bodyX = getBodyWidth();
    addMouseOverFunc();
  });

  window.onresize = resize;


}());
