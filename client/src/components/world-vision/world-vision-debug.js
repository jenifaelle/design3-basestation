import {
    inject
} from 'aurelia-framework';

import {
    Vision
} from '../../services/vision';

@inject(Vision)
export class WorldVisionDebug {

    constructor(vision) {
        this.vision = vision;

        this.canvasId = "monCanvas";

        this.visionProperties = {};
        this.visionProperties.imagePath = "./src/components/world-vision/image14.jpg";

        this.x_position = 0;
        this.y_position = 0;

        this.chosen_x_position = 0;
        this.chosen_y_position = 0;
    }

    attached() {
        var canvas = document.getElementById(this.canvasId);
        var context = canvas.getContext('2d');

        var self = this;

        canvas.addEventListener('mousemove', function(evt) {
            var mousePos = self.getMousePos(canvas, evt);
            self.x_position = Math.floor(mousePos.x);
            self.y_position = Math.floor(mousePos.y);
        }, false);

        canvas.addEventListener('click', function(evt) {
            self.chosen_x_position = self.x_position;
            self.chosen_y_position = self.y_position;
        }, false);

        this.vision.registerImageView(this.visionProperties);
    }

    getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
}
