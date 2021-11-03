export default class ContentVidget {
    constructor(vidget) {
        this.vidget = vidget
        console.log(this.vidget)
        this.toggleBTN = document.getElementById('toggle-btn')
        this.toggleBTN.addEventListener('click', this.toggleText)
    }

    toggleText() {
        let dots = document.getElementById("dots");
        let moreText = document.querySelector(".vidget-segment");
        let contentBlock = document.querySelector('.vidget-content')
        console.log(dots, moreText)
        if (dots.style.display === "none") {
            contentBlock.classList.remove("expand")
            dots.style.display = "inline";
            moreText.style.opacity = "0";
            moreText.style.visibility = "hidden";
        } else {
            contentBlock.classList.add("expand")
            dots.style.display = "none";
            moreText.style.opacity = "1";
            moreText.style.visibility = "visible";
        }
    }

    getHTML() {
        return `<div class="vidget-img">
        <img src="${this.vidget.img}" alt="">
    </div>
    <div class="vidget-content">
        <div class="vidget-title">
            ${this.vidget.title}
        </div>
        <div class="vidget-text">
            <p>${this.vidget.description}<span id="dots">...</span></br><span
                    class="vidget-segment">${this.vidget.note}</span></p>
        </div>

    </div>`
    }
}