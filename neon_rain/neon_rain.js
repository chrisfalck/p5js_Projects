var rainDrops;
var lightning;

function setup() {
    createCanvas(p5Width, p5Height);
    background(0);
    frameRate(60);

    lightning = null;
    rainDrops = [];
    for (let i = 0; i < 650; ++i) {
        rainDrops.push(new RainDrop());
    }
}

var iterations = 0;

function draw() {

    if (mouseIsPressed) {
        setup();
        return;
    }

    background(0);

    // Lightning.
    if (lightning === null) {
        lightning = new LightningTree_V2();
    }

    // Have new lightning strike at most every 6 seconds.
    if (iterations++ === 60 * 6) {
        if (lightning.getBrightness() <= 0) {
            lightning = new LightningTree_V2();
        }
        iterations = 0;
    }

    if (lightning !== null) {
        lightning.draw();
        lightning.dim();
    }

    // Rain.
    for (let i = rainDrops.length - 1; i > -1; --i) {

        // Replace the drop with a new drop starting at the top of the screen if it's out of bounds.
        if (rainDrops[i].y > height) {
            rainDrops.splice(i, 1);
            rainDrops.push(new RainDrop());
        } else {
            rainDrops[i].draw();
        }
    }
}