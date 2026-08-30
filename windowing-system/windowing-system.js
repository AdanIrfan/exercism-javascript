// @ts-check

/**
 * Implement the classes etc. that are needed to solve the
 * exercise in this file. Do not forget to export the entities
 * you defined so they are available for the tests.
 */

export function Size(width = 80, height = 60){
    this.width = width,
    this.height = height
}

Size.prototype.resize = function(newWidth, newHeight){
    this.width = newWidth;
    this.height = newHeight;
}

export function Position(x = 0, y = 0){
    this.x = x;
    this.y = y
}

Position.prototype.move = function(newX, newY){
    this.x = newX;
    this.y = newY;
}

export class ProgramWindow {
   constructor(){
    this.screenSize = new Size(800, 600);
    this.size = new Size();
    this.position = new Position();
    }

    resize(Size){
        let availableWidth = this.screenSize.width - this.position.x;
        let availableHeight = this.screenSize.height - this.position.y;
        Size.width = Size.width < 1? 1: Size.width;
        Size.height = Size.height <1? 1: Size.height;
        if((Size.width >= 1 && Size.height >= 1) && (Size.width <= availableWidth && Size.height <= availableHeight)){
            return this.size = Size;
        }
        else if(Size.width > availableWidth && Size.height <= availableHeight){
            this.size.width = availableWidth;
            this.size.height = Size.height;
        }
        else if(Size.height > availableHeight && Size.width <= availableWidth){
            this.size.width = Size.width;
            this.size.height = availableHeight;
        }
        else{
            this.size.width = availableWidth;
            this.size.height = availableHeight;
        }
    }

    move(Position){
        Position.x = Position.x < 0? 0: Position.x;
        Position.y = Position.y <0? 0: Position.y;
        let availableWidthSpace = this.screenSize.width - this.size.width;
        let availableHeightSpace = this.screenSize.height - this.size.height;
        if((Position.x <= availableWidthSpace) && (Position.y <= availableHeightSpace)){
            this.position = Position
        }
        else if ((Position.x > availableWidthSpace) && (Position.y <= availableHeightSpace)){
            this.position.x = availableWidthSpace;
            this.position.y = Position.y;
        }
        else if ((Position.y > availableHeightSpace) && (Position.x <= availableWidthSpace)){
            this.position.x = Position.x;
            this.position.y = availableHeightSpace;
        }
        else{
            this.position.x = availableWidthSpace;
            this.position.y = availableHeightSpace;
        }
    }
}

export function changeWindow(programWindow){
    programWindow.size = new Size(400, 300);
    programWindow.position = new Position(100,150);

    return programWindow;
}