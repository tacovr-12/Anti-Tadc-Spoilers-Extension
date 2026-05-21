const spoilerWords = [
    "tadc",
    "the amazing digital circus",
    "digital circus",
    "glitch",
    "glitch productions",
    "ep9",
    "episode 9",
    "ep 9",
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

function createOverlay(target) {
    if (target.dataset.spoilerBlocked === "true") return;

    target.dataset.spoilerBlocked = "true";

    const style = window.getComputedStyle(target);

    if (style.position === "static") {
        target.style.position = "relative";
    }

    const overlay = document.createElement("div");
    overlay.className = "spoiler-overlay";
    overlay.textContent = "POTENTIAL SPOILER";

    overlay.addEventListener("click", (e) => {
        e.stopPropagation();
        overlay.remove();
    });

    target.appendChild(overlay);
}

function isReasonablePost(el) {
    const text = el.innerText;

    if (!text) return false;

    if (text.length > 5000) return false;

    if (text.length < 20) return false;

    const tag = el.tagName.toLowerCase();

    if (tag === "body" || tag === "html") {
        return false;
    }

    const rect = el.getBoundingClientRect();

    if (
        rect.width > window.innerWidth * 0.95 &&
        rect.height > window.innerHeight * 0.95
    ) {
        return false;
    }

    return true;
}

function scanPage() {
    const elements = document.querySelectorAll(
        "article, div, section"
    );

    elements.forEach(el => {
        if (
            isReasonablePost(el) &&
            containsSpoiler(el.innerText)
        ) {
            createOverlay(el);
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