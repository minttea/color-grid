(function () {
  "use strict";

  var currentBodyColor,
    body,
    bodyX,
    bodyY;

  function Hsl(h, s, l) {
    h = parseInt(h, 10);
    s = parseInt(s, 10);
    l = parseInt(l, 10);

    if (h !== h || h > 360 || h < 0) {
      h = 0;
    }

    if (s !== s || s > 100 || s < 0) {
      s = 100;
    }

    if (l !== l || l > 100 || l < 0) {
      l = 50;
    }

    this.h = h;
    this.s = s;
    this.l = l;
  }

  Hsl.prototype.toString = function () {
    return "hsl(" + this.h + ", " + this.s + "%, " + this.l + "%)";
  };

  Hsl.prototype.isEqual = function (other) {
    if (this.h === other.h &&
        this.s === other.s &&
        this.l === other.l) {
      return true;
    }
    return false;
  };

  function getScaledX(mouseX, width) {
    if (typeof(mouseX) !== "number" ||
      typeof(width) !== "number" ||
      mouseX < 0 ||
      mouseX !== mouseX ||
      width !== width) {
      return 0;
    }
    if (mouseX > width) {
      return 360;
    }
    return parseInt(360 * mouseX / width, 10);
  }

  // return a scaled y value on a scale from 15 to 85, inclusive
  function getScaledY(mouseX, width) {
    if (typeof(mouseX) !== "number" ||
      typeof(width) !== "number" ||
      mouseX < 0 ||
      mouseX !== mouseX ||
      width !== width) {
      return 15;
    }
    if (mouseX > width) {
      return 85;
    }
    // the total range is 70: 85 - 15
    return parseInt(70 * mouseX / width + 15, 10);
  }

  function setWidthAndHeight() {
    bodyX = window.innerWidth;
    bodyY = window.innerHeight;
  }

  currentBodyColor = new Hsl();

  document.addEventListener('DOMContentLoaded', function () {
    body = document.getElementsByTagName('body')[0];
    setWidthAndHeight();

    document.addEventListener("mousemove", function (e) {
      var mouseX = e.clientX,
        mouseY = e.clientY,
        scaledX = getScaledX(mouseX, bodyX),
        scaledY = getScaledY(mouseY, bodyY),
        color = new Hsl(scaledX, 100, scaledY);

      if (!color.isEqual(currentBodyColor)) {
        body.style.background = color.toString();
        currentBodyColor = color;
      }
    });
  });

  window.onresize = setWidthAndHeight;

  /* test-code */
  var exports = module.exports = {
    Hsl: Hsl,
    getScaledX: getScaledX,
    getScaledY: getScaledY
  };
  /* end-test-code */

}());
