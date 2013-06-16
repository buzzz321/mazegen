
function MouseControl(canvas_element) {   
	this.canvas_element = canvas_element;
    this.mouse_down = false;
    this.old_x = 0;
    this.old_y = 0;
    this.dx = 0;
    this.dy = 0;
    this.lat = 0; //degrees
    this.longitude = 0;//degrees
}

MouseControl.prototype.init = function() {

    var self = this;
    
    $(this.canvas_element).mousemove(function(event) {
        var msg = "M ";

        msg += event.pageX + ", " + event.pageY;
        msg += " ox " + self.old_x + ", " + self.old_y;
        $("#mouse").html(msg);

        if ( self.mouse_down === true ) {
            self.dx = event.pageX - self.old_x;
            if (Math.abs(self.dx) > 100) {
                self.dx = 0;
            }
            if (self.old_x !== event.pageX) {
                self.longitude += self.dx / 2;

                if (self.longitude > 180) {
                    self.longitude = 180;
                }
                if (self.longitude < -180) {
                    self.longitude = -180;
                }
            }
            msg = "dx " + self.dx + " longitudeitude " + self.longitude;

            $("#slask").html(msg);
            self.old_x = event.pageX;
        }
});

    $(this.canvas_element).mousedown(function(event) {
        self.mouse_down = true;
    });
    
    $(this.canvas_element).mouseup(function(event) {
        self.mouse_down = false;
    });

}
