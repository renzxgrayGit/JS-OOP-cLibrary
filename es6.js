class Circles {
    constructor(numCircles) {
        // Assign the number of circles to the object's numCircles property
        this.numCircles = numCircles;
    }

    draw_circles(canvasId) {
        // Get the canvas element by its ID
        const canvas = document.getElementById(canvasId);

        // Check if canvas exists and has a 2d context
        if (!canvas || !canvas.getContext) {
            console.error("Canvas element not found or unsupported");
            return;
        }

        // Get the 2d rendering context
        const context = canvas.getContext("2d");

        // Array to store circle objects
        const circles = [];

        // Function to generate a new circle
        const generateCircle = () => {
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

        // Generate initial circles LOOPING
        for (var i = 0; i < 100; i++) {
            circles.push(generateCircle());
        }

        /* // Generate random circles
        for (let i = 0; i < this.numCircles; i++) {
            // Generate random values for circle properties
            const radius = Math.floor(Math.random() * 0.1) + 10;
            const x = Math.random() * (canvas.width - radius * 2) + radius;
            const y = Math.random() * (canvas.height - radius * 2) + radius;
            const dx = (Math.random() - 0.5) * 2;
            const dy = (Math.random() - 0.5) * 2;
            const color = '#' + Math.floor(Math.random() * 16777215).toString(16);

            // Create a circle object and push it into the circles array
            circles.push({
                x,
                y,
                radius,
                dx,
                dy,
                color
            });
        } */

        // Animation loop
        const animate = () => {
            // Clear the canvas
            context.clearRect(0, 0, canvas.width, canvas.height);

            // Iterate over each circle in the circles array
            circles.forEach(circle => {
                // Update circle position
                /* circle.x += circle.dx;
                circle.y += circle.dy; */

                // Draw circle
                context.beginPath();
                context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
                context.fillStyle = circle.color;
                context.fill();
                context.closePath();

                // Increase circle size
                circle.radius += 0.1;

                // Remove circle if it reaches certain size
                if (circle.radius > 200) {
                    // Replace removed circle with a new one
                    circles[circles.indexOf(circle)] = generateCircle();

                    /* const index = circles.indexOf(circle);
                    circles.splice(index, 1); */
                }
            });

            // Request next animation frame
            requestAnimationFrame(animate);
        };

        // Start animation loop
        animate();
    }
}
