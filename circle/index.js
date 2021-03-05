var Circle = /** @class */ (function () {
    function Circle(radius, color) {
        this.radius = radius;
        this.color = color;
    }
    Circle.prototype.getRadius = function () {
        console.log("Radius : " + this.radius);
    };
    Circle.prototype.setRadius = function (radius) {
        this.radius = radius;
        console.log("Updated radius : " + this.radius);
    };
    Circle.prototype.getColor = function () {
        console.log("Color : " + this.color);
    };
    Circle.prototype.setColor = function (color) {
        this.color = color;
        console.log("Updated color : " + this.color);
    };
    Circle.prototype.getArea = function () {
        var area = Math.PI * this.radius * this.radius;
        console.log("Area : " + area);
    };
    Circle.prototype.getCircumference = function () {
        var circumference = 2 * Math.PI * this.radius;
        console.log("Circumference : " + circumference);
    };
    return Circle;
}());
var obj = new Circle(1.0, "Red");
obj.getArea();
obj.getRadius();
obj.setRadius(3.0);
obj.getColor();
obj.setColor("blue");
obj.getArea();
obj.getCircumference();
