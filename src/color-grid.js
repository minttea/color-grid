(function () {
  "use strict";

  var currentBodyColor,
    body,
    bodyX;

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
    return 360 * mouseX / width;
  }

  function getBodyWidth() {
    return window.innerWidth;
  }

  function resize() {
    bodyX = getBodyWidth();
  }

  function addMouseOverFunc() {
    document.addEventListener("mousemove", function (e) {

      var mouseX = e.screenX,
        scaledX = getScaledX(mouseX, bodyX),
        color = new Hsl(scaledX, 100, 50);

      if (!color.isEqual(currentBodyColor)) {
        body.style.background = color.toString();
        currentBodyColor = color;
      }
    });
  }

  currentBodyColor = new Hsl();

  document.addEventListener('DOMContentLoaded', function () {
    body = document.getElementsByTagName('body')[0];
    bodyX = getBodyWidth();
    addMouseOverFunc();
  });

  window.onresize = resize;

  /* test-code */
  var exports = module.exports = {
    Hsl: Hsl,
    getScaledX: getScaledX
  };
  /* end-test-code */

}());
