// Initialize cLib (circleLibrary) with 100 circles
var cLib = new Circles(100);

// Draw 100 circles on #canvas
cLib.draw_circles("canvas");

// Define the Circles constructor function
function Circles(numCircles) {
    // Assign the number of circles to the object's numCircles property
    this.numCircles = numCircles;

    // Define the draw_circles method
    this.draw_circles = function(canvasId) {
        // Get the canvas element by its ID
        var canvas = document.getElementById(canvasId);

        // Check if canvas exists and has a 2d context
        if (!canvas || !canvas.getContext) {
            console.error("Canvas element not found or unsupported");
            return;
        }

        // Get the 2d rendering context
        var ctx = canvas.getContext("2d");

        // Array to store circle objects
        var circles = [];

        // Function to generate a new circle
        function generateCircle() {
            var radius = Math.floor(Math.random() * 0.1) + 10;
            var x = Math.random() * (canvas.width - radius * 2) + radius;
            var y = Math.random() * (canvas.height - radius * 2) + radius;
            var dx = (Math.random() - 0.5) * 2;
            var dy = (Math.random() - 0.5) * 2;
            var color = '#' + Math.floor(Math.random() * 16777215).toString(16);

            return {
                x: x,
                y: y,
                radius: radius,
                dx: dx,
                dy: dy,
                color: color
            };
        }

        // Generate initial circles
        for (var i = 0; i < this.numCircles; i++) {
            circles.push(generateCircle());
        }

        /* // Generate random circles
        for (var i = 0; i < this.numCircles; i++) {
            // Generate random values for circle properties
            var radius = Math.floor(Math.random() * 0.1) + 1;
            var x = Math.random() * (canvas.width - radius * 2) + radius;
            var y = Math.random() * (canvas.height - radius * 2) + radius;
            var dx = (Math.random() - 0.5) * 2;
            var dy = (Math.random() - 0.5) * 2;
            var color = '#' + Math.floor(Math.random() * 16777215).toString(16);

            // Create a circle object and push it into the circles array
            circles.push({
                x: x,
                y: y,
                radius: radius,
                dx: dx,
                dy: dy,
                color: color
            });
        } */

        // Animation loop
        function animate() {
            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Iterate over each circle in the circles array
            circles.forEach(function(circle) {
                // Update circle position
                /* circle.x += circle.dx;
                circle.y += circle.dy; */

                // Draw circle
                ctx.beginPath();
                ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
                ctx.fillStyle = circle.color;
                ctx.fill(); 
                ctx.closePath();

                // Increase circle size
                circle.radius += 0.1;

                // Remove circle if it reaches certain size
                if (circle.radius > 30) {
                    // Replace removed circle with a new one
                    circles[circles.indexOf(circle)] = generateCircle();

                    /* var index = circles.indexOf(circle);
                    circles.splice(index, 1); */
                }
            });

            // Request next animation frame
            requestAnimationFrame(animate);
        }

        // Start animation loop
        animate();
    };
}
