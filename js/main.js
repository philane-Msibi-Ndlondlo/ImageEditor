

class ImageEditor {

    constructor() {

        this.uploader = this.get("image-uploader");
        this.canvas = this.get("canvas");
        this.uploaderBtn = this.get("upload-btn");
        this.downloadBtn = this.get("downloadBtn");
        this.greyscaleBtn = this.get("greyscaleBtn");
        this.addTextBtn = this.get("addTextBtn");
        this.text = this.get("text");
        this.text_size = this.get("text_size");
        this.text_color = this.get("text_color");
        this.text_font = this.get("text_font");
        this.text_boldness = this.get("text_boldness");
        this.addTextBtn = this.get("addTextBtn");
        this.imagePreviews = document.querySelectorAll('.image-preview');
        this.imagename = "";
        this.image = new Image();
        this.registerEvents();
        this.imageData = null;
        this.ctx = null;
        this.textX = 0;
        this.textY = 0;
    }

    registerEvents() {

        if (this.uploaderBtn) {

            this.uploaderBtn.addEventListener("click", (e) => {
                this.uploader.click();
            });

                this.image.crossOrigin = "anonymous";
            this.uploader.addEventListener("change", (e) => {
                this.loadImageToCanvas(this.uploader.files[0].name);
            });

            this.imagePreviews.forEach(img => {
                img.addEventListener('click', e => {
                    this.loadImageToCanvas(e.target.src);
                })
            })

            this.image.addEventListener("load", () => {
                console.log(this);
                this.ctx.drawImage(this.image, 0,0, this.canvas.width, this.canvas.height);
                this.imageData = this.ctx.getImageData(0,0, this.canvas.width, this.canvas.height);
            });
        }

        if (this.downloadBtn) {
            this.downloadBtn.addEventListener("click", () => {
                this.downloadImage();
            });
        }

        if (this.addTextBtn) {
            this.addTextBtn.addEventListener("click", () => {
                this.applyAddText();
            });
        }

        if (this.greyscaleBtn) {
            this.greyscaleBtn.addEventListener("click", () => {
                this.applyGreyScale();
            });
        }
    }

    get(id) { return document.getElementById(id); }

    applyGreyScale() {

        if (!this.ctx) return;
        for (let i = 0; i < this.imageData.data.length; i+=4) {
            let avg = parseInt((this.imageData.data[i] + this.imageData.data[i + 1] + this.imageData.data[i + 2]) / 3);
            this.imageData.data[i] = this.imageData.data[i+1] = this.imageData.data[i+2] = avg;
        }

        this.ctx.putImageData(this.imageData, 0, 0);
    }

    applyAddText() {
        if (!this.ctx) return;
        this.ctx.fillStyle = this.text_color.value;
        this.ctx.font = `${this.text_boldness.checked ? 'bold': ''} ${this.text_size.value*8}px ${this.text_font.value}`;
        this.textY = (this.canvas.height/2);
        this.ctx.fillText(this.text.value, this.textX, this.textY);
        this.canvas.onmousedown = this.dragText;
    }

    dragText(textElem) {
        this.textX = textElem.pageX;
        this.textY = textElem.pageY;
    }

    downloadImage() {

        if (!this.ctx) return;
        const downloadLink = document.createElement("a");
        downloadLink.download = "image.png";
        downloadLink.href = this.canvas.toDataURL('image/png').replace("image/png", "image/octet-stream");
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
        downloadLink.click();
   }

   loadImageToCanvas(imgFile) {
        this.imagename = imgFile;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;
        this.image.src = this.imagename;
        this.canvas.width = this.image.width;
        this.canvas.height = this.image.height;
   }
}

document.addEventListener("DOMContentLoaded", () => main());

const main = () => {
    const Editor = new ImageEditor();
}
