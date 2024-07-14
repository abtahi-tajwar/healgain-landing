// Primary card style
document.querySelectorAll(".card-primary").forEach(card => {
    if (card.dataset?.bg) {
        card.style.backgroundColor = card.dataset.bg; 
    }
})

// Primary button style
document.querySelectorAll(".link-btn-primary").forEach(card => {
    if (card.dataset?.color) {
        card.style.backgroundColor = card.dataset.color; 
    }
})