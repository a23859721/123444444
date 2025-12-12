let currentIndex = 0; 
const boxes = document.querySelectorAll(".box");

function updateSelection() {
    boxes.forEach(box => box.classList.remove("selected"));
    boxes[currentIndex].classList.add("selected");
}

updateSelection();

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
        currentIndex++;
        if (currentIndex >= boxes.length) currentIndex = boxes.length - 1;
        updateSelection();
    }

    if (e.key === "ArrowUp") {
        currentIndex--;
        if (currentIndex < 0) currentIndex = 0;
        updateSelection();
    }
});
