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

function getCandidates() {
    return document.querySelectorAll([
        "ytd-video-renderer",
        "ytd-rich-item-renderer",
        "article"
    ].join(","));
}

function isValidPost(el) {
    if (!el || !el.innerText) return false;

    const text = el.innerText.trim();

    if (text.length < 40 || text.length > 5000) return false;

    if (el.closest("header, nav, form, ytd-masthead")) return false;

    const rect = el.getBoundingClientRect();

    if (rect.width > window.innerWidth * 0.95 &&
        rect.height > window.innerHeight * 0.9) return false;

    return true;
}

function block(el) {
    if (el.dataset.spoilerBlocked) return;

    el.dataset.spoilerBlocked = "true";

    if (getComputedStyle(el).position === "static") {
        el.style.position = "relative";
    }

    const overlay = document.createElement("div");
    overlay.className = "spoiler-overlay";
    overlay.textContent = "POTENTIAL SPOILER\n(click to reveal)";

    overlay.addEventListener("click", (e) => {
        e.stopPropagation();
        overlay.remove();
    });

    el.appendChild(overlay);
}

function scan() {
    getCandidates().forEach(el => {
        if (isValidPost(el) && containsSpoiler(el.innerText)) {
            block(el);
        }
    });
}

scan();

new MutationObserver(() => {
    scan();
}).observe(document.body, {
    childList: true,
    subtree: true
});