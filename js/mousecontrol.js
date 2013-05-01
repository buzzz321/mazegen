
function MouseControl(canvas_element) {   
	this.canvas_element = canvas_element;
    this.mouse_down = false;
}

MouseControl.prototype.init = function() {

    var self = this;
    
    $(this.canvas_element).mousemove(function(event) {
        var msg = "M ";
        msg += event.pageX + ", " + event.pageY;
        $("#mouse").html(msg);

        if ( this.mouse_down === true ) {
            
        }
});

    $(this.canvas_element).mousedown(function(event) {
        this.mouse_down = true;
    });
    
    $(this.canvas_element).mouseup(function(event) {
        this.mouse_down = false;
    });

}
