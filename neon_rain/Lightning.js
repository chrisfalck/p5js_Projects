function LightningTree_V2() {

    // Track our lightning sub trees.
    var trees = []

    // Start the tree in a position 200px away from wither screen edge.
    var rootX = getRand(200, p5Width - 200);

    // Start with 4 parent sub trees.
    for (let i = 0; i < 3; ++i) {
        trees.push(new LightningSubTree(getRand(30, 75), rootX, -5));
    }

    // Recursively draw all trees.
    this.draw = function () {
        trees.forEach(tree => {
            tree.draw();
        });
    }

    // Recursively dim all trees.
    this.dim = function () {
        trees.forEach(tree => {
            tree.dim();
        });
    }

    // Get the brightness of the first tree which represents the brightness of all trees.
    this.getBrightness = function () {
        return trees[0].getBrightness();
    }
}

function LightningSubTree(size, rootX, rootY) {
    this.root = new LightningNode(null, rootX, rootY);

    /// Add 'size' number of children lightning nodes. 
    for (let i = 0; i < size; ++i) {
        this.root.addChild();
    }

    // Kick off recursive drawing.
    this.draw = function () {
        this.root.draw();
    }

    // Kick off recursive dimming.
    this.dim = function () {
        this.root.dim();
    }

    // Get the tree's current brightness.
    this.getBrightness = function () {
        return this.root.brightness;
    }
}

function LightningNode(parent, x, y) {

    // The x and y posiitons of this lightning node. 
    this.xPos = x;
    this.yPos = y;

    // Start at max brightness.
    this.brightness = 255;

    // Keep track of the parent and children so we can add children and draw a line back to 
    // this node's parent in order to display the lightning visually.
    this.parent = parent;

    // this.children[0] will always be a single node.
    // this.children[1] might be the root of a new lightning node chain.
    this.children = [null, null];

    // Add a child, potentially spawning a new lightning chain the the child's second children index.
    this.addChild = function () {
        var expandLightning = (random(0, 10) > 9.5);
        var childOffsetX = getRand(-30, 30);
        var childOffsetY = 15;

        if (this.children[0] === null) {
            this.children[0] = new LightningNode(this, this.xPos + childOffsetX, this.yPos + childOffsetY);

            // According to some probability, have this node sprout a new lightning node chain.
            if (expandLightning) {
                this.children[1] = new LightningNode(this, this.xPos + childOffsetX, this.yPos + childOffsetY);
            }

        } else {
            this.children[0].addChild();

            // According to some probability, add another node to a previously sprouted lightning node chain.
            if (this.children[1] !== null && expandLightning) {
                this.children[1].addChild();
            }

        }
    }

    this.draw = function () {
        if (this.parent) {

            // Draw a line between this node and its parent.
            stroke(this.brightness);
            strokeWeight(2);
            line(this.xPos, this.yPos, this.parent.xPos, this.parent.yPos);
        }

        // If this node has children, tell them to draw too.
        if (this.children[0] !== null) {
            this.children[0].draw();
        }
        if (this.children[1] !== null) {
            this.children[1].draw();
        }
    }

    this.dim = function () {

        // Dim this node.
        this.brightness -= 2;

        // If this node has children, tell them to dim too.
        if (this.children[0] !== null) {
            this.children[0].dim();
        }
        if (this.children[1] !== null) {
            this.children[1].dim();
        }
    }
}
