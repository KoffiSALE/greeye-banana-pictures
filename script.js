const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

toggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});

async function loadCMSContent() {
  try {
    const [companyRes, filmsRes, newsRes, galleryRes] = await Promise.all([
      fetch("content/company.json"),
      fetch("content/films.json"),
      fetch("content/news.json"),
      fetch("content/gallery.json")
    ]);

    const company = await companyRes.json();
    const filmsData = await filmsRes.json();
    const newsData = await newsRes.json();
    const galleryData = await galleryRes.json();

    console.log("CMS content loaded:", {
      company,
      films: filmsData.films,
      news: newsData.news,
      gallery: galleryData.gallery
    });

  } catch (error) {
    console.error("Could not load CMS content:", error);
  }
}

loadCMSContent();
