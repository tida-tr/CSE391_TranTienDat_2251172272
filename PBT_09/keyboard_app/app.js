const images = Array.from({ length: 9 }, (_, i) => `https://placehold.co/600x400?text=Image+${i + 1}`);
let currentIndex = 0;
let slideInterval = null;
let isGalleryOpen = false;
let isCmdOpen = false;

const commands = [
    { id: 'dark', label: 'Toggle Dark Mode', action: () => document.body.classList.toggle('dark') },
    { id: 'gallery', label: 'Open Gallery', action: openGallery },
    { id: 'alert', label: 'Show Alert', action: () => alert('Hello from Command Palette!') }
];
let filteredCmds = [];
let cmdActiveIndex = 0;

const galleryModal = document.getElementById('gallery-modal');
const mainImg = document.getElementById('main-img');
const playStatus = document.getElementById('play-status');
const openGalleryBtn = document.getElementById('open-gallery-btn');
const closeGalleryBtn = document.getElementById('close-gallery-btn');

const cmdPalette = document.getElementById('cmd-palette');
const cmdInput = document.getElementById('cmd-input');
const cmdList = document.getElementById('cmd-list');

function renderImage() {
    mainImg.src = images[currentIndex];
    mainImg.alt = `Ảnh ${currentIndex + 1}`;
}

function openGallery() {
    isGalleryOpen = true;
    galleryModal.classList.remove('hidden');
    renderImage();
    closeGalleryBtn.focus();
}

function closeGallery() {
    isGalleryOpen = false;
    galleryModal.classList.add('hidden');
    stopSlideshow();
    openGalleryBtn.focus();
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    renderImage();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    renderImage();
}

function toggleSlideshow() {
    if (slideInterval) {
        stopSlideshow();
    } else {
        slideInterval = setInterval(nextImage, 1500);
        playStatus.textContent = '▶ Playing';
        playStatus.style.display = 'block';
    }
}

function stopSlideshow() {
    clearInterval(slideInterval);
    slideInterval = null;
    playStatus.textContent = '⏸ Paused';
    setTimeout(() => playStatus.style.display = 'none', 1000);
}

function openCmd() {
    isCmdOpen = true;
    cmdPalette.classList.remove('hidden');
    cmdInput.value = '';
    renderCmds();
    cmdInput.focus();
}

function closeCmd() {
    isCmdOpen = false;
    cmdPalette.classList.add('hidden');
    openGalleryBtn.focus();
}

function renderCmds() {
    const query = cmdInput.value.toLowerCase();
    filteredCmds = commands.filter(c => c.label.toLowerCase().includes(query));
    cmdActiveIndex = 0;

    cmdList.innerHTML = '';
    filteredCmds.forEach((cmd, index) => {
        const li = document.createElement('li');
        li.textContent = cmd.label;
        li.setAttribute('role', 'option');
        if (index === cmdActiveIndex) li.classList.add('active');

        li.addEventListener('click', () => {
            closeCmd();
            cmd.action();
        });
        cmdList.appendChild(li);
    });
}

openGalleryBtn.addEventListener('click', openGallery);
closeGalleryBtn.addEventListener('click', closeGallery);

cmdInput.addEventListener('input', renderCmds);

document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        isCmdOpen ? closeCmd() : openCmd();
        return;
    }

    if (e.key === 'Escape') {
        if (isCmdOpen) closeCmd();
        if (isGalleryOpen) closeGallery();
        return;
    }

    if (isCmdOpen) {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            cmdActiveIndex = Math.min(cmdActiveIndex + 1, filteredCmds.length - 1);
            updateCmdActiveState();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            cmdActiveIndex = Math.max(cmdActiveIndex - 1, 0);
            updateCmdActiveState();
        } else if (e.key === 'Enter' && filteredCmds[cmdActiveIndex]) {
            e.preventDefault();
            closeCmd();
            filteredCmds[cmdActiveIndex].action();
        }
    }

    if (isGalleryOpen && !isCmdOpen) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === ' ') {
            e.preventDefault();
            toggleSlideshow();
        }
        if (e.key >= '1' && e.key <= '9') {
            currentIndex = parseInt(e.key) - 1;
            renderImage();
        }
    }
});

function updateCmdActiveState() {
    const items = cmdList.querySelectorAll('li');
    items.forEach((item, i) => {
        item.classList.toggle('active', i === cmdActiveIndex);
    });
}