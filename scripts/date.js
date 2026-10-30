// Dynamic dates: current copyright year and document last modified
const currentYearSpan = document.querySelector('#currentyear');
if (currentYearSpan) {
  currentYearSpan.textContent = new Date().getFullYear();
}

const lastModifiedParagraph = document.querySelector('#lastModified');
if (lastModifiedParagraph) {
  lastModifiedParagraph.textContent = `Last Modification: ${document.lastModified}`;
}
