const spoilerWords = [
    "tadc",
    "the amazing digital circus",
    "digital circus",
    "glitch",
    "glitch productions",
    "pomni",
    "jax",
    "caine",
    "zooble",
    "ragatha",
    "kinger",
    "gangle",
    "leak",
    "leaked"
];

function containsSpoiler(text) {
    const lower = text.toLowerCase();

    return spoilerWords.some(word => lower.includes(word));
}

function blockElement(element) {
    if (element.dataset.spoilerBlocked) return;

    element.dataset.spoilerBlocked = "true";

    const overlay = document.createElement("div");
    overlay.className = "spoiler-overlay";
    overlay.innerText = "POTENTIAL SPOILER\n(click to reveal)";

    overlay.addEventListener("click", () => {
        overlay.remove();
    });

    element.style.position = "relative";
    element.appendChild(overlay);
}

function scanPage() {
    const elements = document.querySelectorAll("div, article, section");

    elements.forEach(el => {
        if (el.innerText && containsSpoiler(el.innerText)) {
            blockElement(el);
        }
    });
}

scanPage();

const observer = new MutationObserver(() => {
    scanPage();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});