

class ImageEditor {

    constructor() {

        this.uploader = this.get("image-uploader");
        this.canvas = this.get("canvas");
        this.uploaderBtn = this.get("upload-btn");
        this.downloadBtn = this.get("downloadBtn");
        this.greyscaleBtn = this.get("greyscaleBtn");
        this.addTextBtn = this.get("addTextBtn");
        this.imagename = "";
        this.image = new Image();
        this.registerEvents();
        this.imageData = null;
    }

    registerEvents() {

        if (this.uploaderBtn) {

            this.uploaderBtn.addEventListener("click", (e) => {
                this.uploader.click();
            });

                this.image.crossOrigin = "anonymous";
            this.uploader.addEventListener("change", (e) => {
                this.imagename = this.uploader.files[0].name;
                this.ctx = this.canvas.getContext("2d");
                this.image.src = this.imagename;
            });

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
                console.log("hjer");
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

        for (let i = 0; i < this.imageData.data.length; i++) {
            let avg = parseInt((this.imageData.data[i] + this.imageData.data[i + 1] + this.imageData.data[i + 2]) / 3);
            this.imageData.data[i] = this.imageData.data[i+1] = this.imageData.data[i+2] = avg;
        }

        this.ctx.putImageData(this.imageData, 0, 0);
    }

    applyAddText() {
        
    }

    downloadImage() {
        const downloadLink = document.createElement("a");
        downloadLink.download = "image.png";
        downloadLink.href = this.canvas.toDataURL('image/png').replace("image/png", "image/octet-stream");
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
        downloadLink.click();
    }
}

document.addEventListener("DOMContentLoaded", () => main());

const main = () => {
    const Editor = new ImageEditor();
}
