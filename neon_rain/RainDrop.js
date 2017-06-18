function RainDrop() {

    // Drop dimensions.
    this.dropW = 4;
    this.dropH = 50;

    // Initial position.
    this.x = getRand(0, width);
    this.y = getRand(this.dropH * -3, this.dropH * -2);

    // Speed.
    this.dropS = getRand(3, 12);

    this.color = color(`hsb(${getRand(160, 340)}, ${getRand(99, 100)}%, ${getRand(10, 100)}%)`);

    this.draw = function () {

        // Draw the drop.
        noStroke();
        fill(this.color);
        rect(this.x, this.y, this.dropW, this.dropH);

        // Move the drop.
        this.y += this.dropS;
    }
}