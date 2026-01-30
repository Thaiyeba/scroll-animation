const canvas = document.getElementById("hero");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const frameCount = 200;

// Image filename formatter
const currentFrame = index =>
  `ezgif-frame-${String(index).padStart(3, "0")}.jpg`;

const images = [];
const img = new Image();

// Preload images
for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
}

// Draw first frame
images[0].onload = () => {
    context.drawImage(images[0], 0, 0, canvas.width, canvas.height);
};

window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    const maxScrollTop =
        document.documentElement.scrollHeight - window.innerHeight;

    const scrollFraction = scrollTop / maxScrollTop;

    const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
    );

    requestAnimationFrame(() => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(
            images[frameIndex],
            0,
            0,
            canvas.width,
            canvas.height
        );
    });
});

