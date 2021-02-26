import galleryImages from './gallery-items.js';

const refs = {
    $gallery: document.querySelector('.gallery.js-gallery'),
    $lightbox: document.querySelector('.lightbox.js-lightbox'),
    $lightboxImg: document.querySelector('.lightbox__image'),
    $lightboxCloseBtn: document.querySelector('button[data-action="close-lightbox"]'),
};

const { $gallery, $lightbox, $lightboxImg, $lightboxCloseBtn } = refs;

$gallery.addEventListener('click', handleClickGallery);
$lightboxCloseBtn.addEventListener('click', handleClickCloseBtn);

let currentImgIdx = null;

function handleClickGallery(e) {
    e.preventDefault();
    
    const { dataset, alt, nodeName } = e.target;

    if (nodeName === 'IMG') {
        const { source, id } = dataset;
        handleOpenModal(source, alt, +id)
    };
};

function handleOpenModal(src, alt, id) {
    $lightbox.classList.add('is-open');
    $lightboxImg.src = src;
    $lightboxImg.alt = alt;
    currentImgIdx = id;
    window.addEventListener('keydown', handleKeypress);
};

function handleClickCloseBtn() {
    handleCloseModal()
};

function handleCloseModal() {
    $lightbox.classList.remove('is-open');
    $lightboxImg.src = '';
    $lightboxImg.alt = '';
    currentImgIdx = null;
    window.removeEventListener('keypress', handleKeypress);
};

function handleKeypress({ code }) {
    code === 'Escape' && handleCloseModal();
    code === 'ArrowRight' && handleNextImg();
    code === 'ArrowLeft' && handlePrevImg();
};

function handleNextImg() {
    currentImgIdx = galleryImages.length - 1 === currentImgIdx ? 0 : currentImgIdx + 1;
    const { original, description } = galleryImages[currentImgIdx];
    $lightboxImg.src = original;
    $lightboxImg.alt = description;
};

function handlePrevImg() {
    currentImgIdx = currentImgIdx === 0 ? galleryImages.length - 1 : currentImgIdx - 1;
    const { original, description } = galleryImages[currentImgIdx];
    $lightboxImg.src = original;
    $lightboxImg.alt = description;
};

function createGalleryElementMarkup({ preview, original, description }, i) {
    return `
    <li class="gallery__item">
      <a
        class="gallery__link"
        href="${original}">
        <img
          class="gallery__image"
          data-id="${i}"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>
    `
};

function createGalleryMarkup(items) {
    return items.map(createGalleryElementMarkup).join('')
};

function renderGallery(markup) {
    $gallery.insertAdjacentHTML('beforeend', markup)
};

renderGallery(createGalleryMarkup(galleryImages));

