function CameraRotate() {
}

MouseControl.prototype.rotate = function(vector) {
    var theta = 0;
    var phi = 0;
    
    x: p.x + 100 * sin(phi) * cos(theta);
    y: p.y + 100 * cos(phi);
    z: p.z + 100 * sin(phi) * sin(theta);
}
