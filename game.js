
function getRange(end) {

    const range = [];

    for (var i = 0; i <= end; i++) {

        if (i % 30 == 0) {
            range.push(i);
        }

    }

    return range;

}

const button = document.querySelector("button");
const score_par = document.querySelector("#score");
const snake_head = document.querySelector("#head");
const game_container = document.querySelector("#game-container");

const Range = getRange(450);

class Game {

    body = [];
    direction = "down";
    direction_cooldown = false;

    score = 0;
    game = false;
    move_speed = 1000;

    food;

    checkDead() {

        var snake_head_left = parseInt(getComputedStyle(snake_head).getPropertyValue("left"));
        var snake_head_top = parseInt(getComputedStyle(snake_head).getPropertyValue("top"));

        if (snake_head_left > 450 || snake_head_left < 0 || snake_head_top > 450 || snake_head_top < 0) {

            this.gameOver();

        }

        for (var i = 0; i < this.body.length; i++) {

            snake_head_left = parseInt(getComputedStyle(snake_head).getPropertyValue("left"));
            snake_head_top = parseInt(getComputedStyle(snake_head).getPropertyValue("top"));

            const body_left = parseInt(getComputedStyle(this.body[i]).getPropertyValue("left"));
            const body_top = parseInt(getComputedStyle(this.body[i]).getPropertyValue("top"));

            if (snake_head_left === body_left && snake_head_top === body_top) {

                this.gameOver();

            }

        }

    }

    eatFood() {

        const snake_head_left = parseInt(getComputedStyle(snake_head).getPropertyValue("left"));
        const snake_head_top = parseInt(getComputedStyle(snake_head).getPropertyValue("top"));

        var food_left = parseInt(getComputedStyle(this.food).getPropertyValue("left"));
        var food_top = parseInt(getComputedStyle(this.food).getPropertyValue("top"));

        if (snake_head_left == food_left && snake_head_top == food_top) {

            this.addBody()
            this.updateScore()

            this.food.style.left = Range[Math.floor(Math.random() * Range.length)] + "px";
            this.food.style.top = Range[Math.floor(Math.random() * Range.length)] + "px";

        }

    }

    gameOver() {

        for (var i = 0; i < this.body.length; i++) {

            this.body[i].remove();

        }

        this.body = [];
        this.direction = "down";

        this.score = 0;

        snake_head.style.left = "240px";
        snake_head.style.top = "240px";

        button.innerText = "Start game";
        button.onclick = () => this.start();

        this.food.remove();
        this.food = undefined;

        this.game = false;

        alert("Game over! Your score is: " + this.score);

    }

    start() {

        button.innerText = "Stop";
        button.onclick = () => this.gameOver();

        score_par.innerText = "Score: " + this.score;

        this.food = document.createElement("div");
        this.food.classList.add("food");

        game_container.appendChild(this.food);

        this.food.style.left = Range[Math.floor(Math.random() * Range.length)] + "px";
        this.food.style.top = Range[Math.floor(Math.random() * Range.length)] + "px";

        this.game = true;

        this.move();

    }

    updateScore() {

        this.score += 1;
        score_par.innerText = "Score: " + this.score;

    }

    changeDirection(direction) {

        if (this.direction == "down" && direction != "up" || this.direction == "up" && direction != "down" || this.direction == "left" && direction != "right" || this.direction == "right" && direction != "left") {

            if (this.direction_cooldown == false) {
                
                this.direction = direction;

                this.direction_cooldown = true;

            }
                


        }

    }

    move() {

        this.direction_cooldown = false;
        
        var snake_head_left = parseInt(getComputedStyle(snake_head).getPropertyValue("left"));
        var snake_head_top = parseInt(getComputedStyle(snake_head).getPropertyValue("top"));

        if (this.direction == "down") {

            snake_head.style.left = snake_head_left + "px";
            snake_head.style.top = snake_head_top + 30 + "px";

            snake_head_left = parseInt(getComputedStyle(snake_head).getPropertyValue("left"));
            snake_head_top = parseInt(getComputedStyle(snake_head).getPropertyValue("top"));
    
            for (var i = this.body.length - 1; i >= 0; i--) {

                if (i == 0) {

                    this.body[i].direction = this.direction;

                }

                else {

                    const prev_body_direction = this.body[i - 1].direction;
                    this.body[i].direction = prev_body_direction;

                }

            }

            for (var i = 0; i < this.body.length; i++) {

                if (i == 0) {

                    this.body[i].style.left = snake_head_left + "px";
                    this.body[i].style.top = snake_head_top - 30 + "px";

                }

                else {

                    const prev_body_left = parseInt(getComputedStyle(this.body[i - 1]).getPropertyValue("left"));
                    const prev_body_top = parseInt(getComputedStyle(this.body[i - 1]).getPropertyValue("top"));
                    

                    if (this.body[i].direction == "down") {

                        this.body[i].style.left = prev_body_left + "px";
                        this.body[i].style.top = prev_body_top - 30 + "px";

                    }

                    else if (this.body[i].direction == "up") {

                        this.body[i].style.left = prev_body_left + "px";
                        this.body[i].style.top = prev_body_top + 30 + "px";

                    }

                    else if (this.body[i].direction == "left") {

                        this.body[i].style.left = prev_body_left + 30 + "px";
                        this.body[i].style.top = prev_body_top + "px";

                    }

                    else if (this.body[i].direction== "right") {

                        this.body[i].style.left = prev_body_left - 30 + "px";
                        this.body[i].style.top = prev_body_top + "px";

                    }

                }

            }

        }

        else if (this.direction == "up") {

            snake_head.style.left = snake_head_left + "px";
            snake_head.style.top = snake_head_top - 30 + "px";

            snake_head_left = parseInt(getComputedStyle(snake_head).getPropertyValue("left"));
            snake_head_top = parseInt(getComputedStyle(snake_head).getPropertyValue("top"));
    
            for (var i = this.body.length - 1; i >= 0; i--) {

                if (i == 0) {

                    this.body[i].direction = this.direction;

                }

                else {

                    const prev_body_direction = this.body[i - 1].direction;
                    this.body[i].direction = prev_body_direction;

                }

            }

            for (var i = 0; i < this.body.length; i++) {

                if (i == 0) {

                    this.body[i].style.left = snake_head_left + "px";
                    this.body[i].style.top = snake_head_top + 30 + "px";

                }

                else {

                    const prev_body_left = parseInt(getComputedStyle(this.body[i - 1]).getPropertyValue("left"));
                    const prev_body_top = parseInt(getComputedStyle(this.body[i - 1]).getPropertyValue("top"));
                    

                    if (this.body[i].direction == "down") {

                        this.body[i].style.left = prev_body_left + "px";
                        this.body[i].style.top = prev_body_top - 30 + "px";

                    }

                    else if (this.body[i].direction == "up") {

                        this.body[i].style.left = prev_body_left + "px";
                        this.body[i].style.top = prev_body_top + 30 + "px";

                    }

                    else if (this.body[i].direction == "left") {

                        this.body[i].style.left = prev_body_left + 30 + "px";
                        this.body[i].style.top = prev_body_top + "px";

                    }

                    else if (this.body[i].direction== "right") {

                        this.body[i].style.left = prev_body_left - 30 + "px";
                        this.body[i].style.top = prev_body_top + "px";

                    }

                }

            }

        }

        else if (this.direction == "left") {

            snake_head.style.left = snake_head_left - 30 + "px";
            snake_head.style.top = snake_head_top + "px";

            snake_head_left = parseInt(getComputedStyle(snake_head).getPropertyValue("left"));
            snake_head_top = parseInt(getComputedStyle(snake_head).getPropertyValue("top"));
    
            for (var i = this.body.length - 1; i >= 0; i--) {

                if (i == 0) {

                    this.body[i].direction = this.direction;

                }

                else {

                    const prev_body_direction = this.body[i - 1].direction;
                    this.body[i].direction = prev_body_direction;

                }

            }

            for (var i = 0; i < this.body.length; i++) {

                if (i == 0) {

                    this.body[i].style.left = snake_head_left + 30 + "px";
                    this.body[i].style.top = snake_head_top + "px";

                }

                else {

                    const prev_body_left = parseInt(getComputedStyle(this.body[i - 1]).getPropertyValue("left"));
                    const prev_body_top = parseInt(getComputedStyle(this.body[i - 1]).getPropertyValue("top"));
                    

                    if (this.body[i].direction == "down") {

                        this.body[i].style.left = prev_body_left + "px";
                        this.body[i].style.top = prev_body_top - 30 + "px";

                    }

                    else if (this.body[i].direction == "up") {

                        this.body[i].style.left = prev_body_left + "px";
                        this.body[i].style.top = prev_body_top + 30 + "px";

                    }

                    else if (this.body[i].direction == "left") {

                        this.body[i].style.left = prev_body_left + 30 + "px";
                        this.body[i].style.top = prev_body_top + "px";

                    }

                    else if (this.body[i].direction== "right") {

                        this.body[i].style.left = prev_body_left - 30 + "px";
                        this.body[i].style.top = prev_body_top + "px";

                    }

                }

            }

        }

        else if (this.direction == "right") {

            snake_head.style.left = snake_head_left + 30 + "px";
            snake_head.style.top = snake_head_top + "px";

            snake_head_left = parseInt(getComputedStyle(snake_head).getPropertyValue("left"));
            snake_head_top = parseInt(getComputedStyle(snake_head).getPropertyValue("top"));
    
            for (var i = this.body.length - 1; i >= 0; i--) {

                if (i == 0) {

                    this.body[i].direction = this.direction;

                }

                else {

                    const prev_body_direction = this.body[i - 1].direction;
                    this.body[i].direction = prev_body_direction;

                }

            }

            for (var i = 0; i < this.body.length; i++) {

                if (i == 0) {

                    this.body[i].style.left = snake_head_left - 30 + "px";
                    this.body[i].style.top = snake_head_top + "px";

                }

                else {

                    const prev_body_left = parseInt(getComputedStyle(this.body[i - 1]).getPropertyValue("left"));
                    const prev_body_top = parseInt(getComputedStyle(this.body[i - 1]).getPropertyValue("top"));
                    

                    if (this.body[i].direction == "down") {

                        this.body[i].style.left = prev_body_left + "px";
                        this.body[i].style.top = prev_body_top - 30 + "px";

                    }

                    else if (this.body[i].direction == "up") {

                        this.body[i].style.left = prev_body_left + "px";
                        this.body[i].style.top = prev_body_top + 30 + "px";

                    }

                    else if (this.body[i].direction == "left") {

                        this.body[i].style.left = prev_body_left + 30 + "px";
                        this.body[i].style.top = prev_body_top + "px";

                    }

                    else if (this.body[i].direction== "right") {

                        this.body[i].style.left = prev_body_left - 30 + "px";
                        this.body[i].style.top = prev_body_top + "px";

                    }

                }

            }

        }

        this.checkDead();
        this.eatFood();

        if (this.game == true) {

            setTimeout(() => {
                this.move();
            }, this.move_speed);

        }

    }

    addBody() {

        const new_body_part = document.createElement("div");
        new_body_part.classList.add("snake-body");
        game_container.appendChild(new_body_part);
        this.body.push(new_body_part);

        if (this.body.length == 1) {

            const snake_head_left = parseInt(getComputedStyle(snake_head).getPropertyValue("left"));
            const snake_head_top = parseInt(getComputedStyle(snake_head).getPropertyValue("top"));
            
            new_body_part.direction = this.direction;

            if (this.direction == "down") {

                new_body_part.style.top = snake_head_top - 30 + "px";
                new_body_part.style.left = snake_head_left + "px";

            }

            else if (this.direction == "up") {

                new_body_part.style.top = snake_head_top + 30 + "px";
                new_body_part.style.left = snake_head_left + "px";

            }

            else if (this.direction == "left") {

                new_body_part.style.top = snake_head_top + "px";
                new_body_part.style.left = snake_head_left + 30 + "px";

            }

            else if (this.direction == "right") {

                new_body_part.style.top = snake_head_top + "px";
                new_body_part.style.left = snake_head_left - 30 + "px";

            }

        }
        
        else {

            const last_body_part = this.body[this.body.length - 2];
            const last_body_part_left = parseInt(getComputedStyle(last_body_part).getPropertyValue("left"));
            const last_body_part_top = parseInt(getComputedStyle(last_body_part).getPropertyValue("top"));
            
            new_body_part.direction = last_body_part.direction;

            if (last_body_part.direction == "down") {

                new_body_part.style.top = last_body_part_top - 30 + "px";
                new_body_part.style.left = last_body_part_left + "px";

            }
            
            else if (last_body_part.direction == "up") {

                new_body_part.style.top = last_body_part_top + 30 + "px";
                new_body_part.style.left = last_body_part_left + "px";

            }

            else if (last_body_part.direction == "left") {

                new_body_part.style.top = last_body_part_top + "px";
                new_body_part.style.left = last_body_part_left + 30 + "px";

            }

            else if (last_body_part.direction == "right") {

                new_body_part.style.top = last_body_part_top + "px";
                new_body_part.style.left = last_body_part_left - 30 + "px";

            }

        }

    }

}

const Snake = new Game();

button.onclick = () => Snake.start();