
const html = document.querySelector("html");

html.onkeydown = (e) => {

    if (e.keyCode == 40) {

        Snake.changeDirection("down");
    }

    else if (e.keyCode == 38) {
        
        Snake.changeDirection("up");

    }

    else if (e.keyCode == 37) {
        
        Snake.changeDirection("left");
        
    }
    
    else if (e.keyCode == 39) {

        Snake.changeDirection("right");

    }

}