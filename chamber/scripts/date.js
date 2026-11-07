// Dynamic copyright year and last modified date
const currentYearSpan = document.querySelector('#currentyear');
if (currentYearSpan) {
  currentYearSpan.textContent = new Date().getFullYear();
}

const lastModifiedParagraph = document.querySelector('#lastModified');
if (lastModifiedParagraph) {
  lastModifiedParagraph.textContent = `Last Modification: ${document.lastModified}`;
}

