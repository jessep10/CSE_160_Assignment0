// DrawRectangle.js
function main() {
    // Retrieve the <canvas> element
    var canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element ');
        return false;
    }
    // Get the rendering context for 2DCG
    var ctx = canvas.getContext('2d');

    // Draw a blue rectangle
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set a blue color
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill a rectangle with the color

}

//Function to draw a vector on the canvas
function drawVector(v, color){
    var canvas = document.getElementById('example');
    var ctx = canvas.getContext('2d');
    var scaledX = v.elements[0] * 20;
    var scaledY = v.elements[1] * 20;

    // Translate the origin to the center of the canvas
    ctx.translate(canvas.width / 2, canvas.height / 2);

    // Draw the vector
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(scaledX, -scaledY);
    ctx.strokeStyle = color;
    ctx.stroke();

    // Reset the transformation matrix to the identity matrix
    ctx.setTransform(1, 0, 0, 1, 0, 0);
} 

//Draw vectors based on v1 and v2 inputs
function handleDrawEvent(){
    // Clear the canvas before drawing the new vector
    var canvas = document.getElementById('example');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas

    // Redraw the black rectangle (background)
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);  // Fill with black

    // Get the vector components from input fields
    var v1x = parseFloat(document.getElementById("v1-x").value); // v1 inputs
    var v1y = parseFloat(document.getElementById("v1-y").value);

    var v2x = parseFloat(document.getElementById("v2-x").value); // v2 inputs
    var v2y = parseFloat(document.getElementById("v2-y").value);

    // Ensure valid input
    if (isNaN(v1x) || isNaN(v1y) || isNaN(v2x) || isNaN(v2y) ) {
        alert("Please enter valid numerical values for V1.");
        return;
    }

    // Create vectors using the Vector3 class
    var v1 = new Vector3([v1x, v1y, 0]);  // Set Z-component to 0 for 2D
    var v2 = new Vector3([v2x, v2y, 0]); 

    // Draw the vector v1 in red and v2 in blue
    drawVector(v1, "red");
    drawVector(v2, "blue");

}

// Handle the "Draw Operation" button click event
function handleDrawOperationEvent() {
    var canvas = document.getElementById('example');
    var ctx = canvas.getContext('2d');

    // Clear the canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Get input values for vectors and scalar
    var v1x = parseFloat(document.getElementById("v1-x").value);
    var v1y = parseFloat(document.getElementById("v1-y").value);
    var v2x = parseFloat(document.getElementById("v2-x").value);
    var v2y = parseFloat(document.getElementById("v2-y").value);
    var scalar = parseFloat(document.getElementById("scalar").value);
    var operation = document.getElementById("operation-select").value;

    // Ensure valid input for vectors
    if (isNaN(v1x) || isNaN(v1y) || isNaN(v2x) || isNaN(v2y)) {
        alert("Please enter valid numerical values for vectors.");
        return;
    }

    // Create vectors v1 and v2
    var v1 = new Vector3([v1x, v1y, 0]);
    var v2 = new Vector3([v2x, v2y, 0]);

    // Draw v1 and v2
    drawVector(v1, "red");
    drawVector(v2, "blue");

    // Select and perform operation through given library
    if (operation === "magnitude") {
        var magV1 = v1.magnitude();
        var magV2 = v2.magnitude();
        console.log("Magnitude of v1: " + magV1);
        console.log("Magnitude of v2: " + magV2);
    }
    else if (operation === "normalize") {
        v1.normalize();
        v2.normalize();
        drawVector(v1, "green");
        drawVector(v2, "green");
    }
    else if (operation === "angle") {
        var angle = angleBetween(v1, v2);
        console.log("Angle: " + angle + " degrees");
    }
    else if (operation === "area") {
        var area = areaTriangle(v1, v2);
        console.log("Area of the triangle: " + area);
    }
    else if (operation === "add") {
        v1.add(v2);
        drawVector(v1, "green");
    }
    else if (operation === "sub") {
        v1.sub(v2);
        drawVector(v1, "green");
    }
    else if (operation === "mul") {
        var scalar = parseFloat(document.getElementById("scalar").value);
        v1.mul(scalar);
        v2.mul(scalar);
        drawVector(v1, "green");
        drawVector(v2, "green");
    }
    else if (operation === "div") {
        var scalar = parseFloat(document.getElementById("scalar").value);
        v1.div(scalar);
        v2.div(scalar);
        drawVector(v1, "green");
        drawVector(v2, "green");
    }
}

// Function to calculate the area of the triangle formed by v1 and v2
function areaTriangle(v1, v2) {
    var crossProduct = Vector3.cross(v1, v2);
    var area = crossProduct.magnitude() / 2;
    return area;
}

// Function to calculate the angle between v1 and v2 (in degrees)
function angleBetween(v1, v2) {
    var dotProduct = Vector3.dot(v1, v2);
    var magnitudeV1 = v1.magnitude();
    var magnitudeV2 = v2.magnitude();
    var cosAlpha = dotProduct / (magnitudeV1 * magnitudeV2);
    var angle = Math.acos(cosAlpha) * (180 / Math.PI); // Convert to degrees
    return angle;
}