// 1. ALL SELECTORS
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.close-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const filterBtns = document.querySelectorAll('.filter-btn');

const endModal = document.getElementById('endModal');
const restartBtn = document.getElementById('restartBtn');
const closeModalBtn = document.getElementById('closeModalBtn');

let visibleItems = []; 
let currentIndex = 0;

function updateVisibleItems() {
    visibleItems = Array.from(galleryItems).filter(item => !item.classList.contains('hide'));
}

// 2. OPEN LIGHTBOX FUNCTION

galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
        updateVisibleItems();
        currentIndex = visibleItems.indexOf(item);
        showImage(currentIndex);
        lightbox.classList.add('active');
    });
});

function showImage(index) {
    if (visibleItems.length === 0) return;
    const imgTag = visibleItems[index].querySelector('img');
    lightboxImg.src = imgTag.src;
}

// 3. CLOSE LIGHTBOX & MODAL
function closeEverything() {
    lightbox.classList.remove('active');
    endModal.classList.remove('active');
}

closeBtn.addEventListener('click', closeEverything);
closeModalBtn.addEventListener('click', closeEverything);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeEverything();
    }
});

// 4. NEXT & PREVIOUS LOGIC (END OF ALBUM ALERT)

nextBtn.addEventListener('click', () => {
    updateVisibleItems();
    if (currentIndex >= visibleItems.length - 1) {
        endModal.classList.add('active');
    } else {
        currentIndex++;
        showImage(currentIndex);
    }
});

prevBtn.addEventListener('click', () => {
    updateVisibleItems();
    if (currentIndex <= 0) {
        endModal.classList.add('active');
    } else {
        currentIndex--;
        showImage(currentIndex);
    }
});

restartBtn.addEventListener('click', () => {
    endModal.classList.remove('active');
    currentIndex = 0;
    showImage(currentIndex);
});

// 5. CATEGORY FILTER LOGIC
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (filterValue === 'all' || filterValue === itemCategory) {
                item.classList.remove('hide');
            } else {
                item.classList.add('hide');
            }
        });
    });
});