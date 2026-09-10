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

    const films = filmsData.films || [];
    const news = newsData.news || [];
    const gallery = galleryData.gallery || [];

    // Company information
    const heroCopy = document.querySelector(".hero-copy");
    if (heroCopy && company.about) {
      heroCopy.textContent = company.about;
    }

    const introKicker = document.querySelector(".intro .kicker");
    if (introKicker && company.tagline) {
      introKicker.textContent = company.tagline;
    }

    const introCopy = document.querySelector(".intro-copy p");
    if (introCopy && company.about) {
      introCopy.textContent = company.about;
    }

    // Contact information
    const contactDetails = document.querySelector(".contact-details");

    if (contactDetails) {
      contactDetails.innerHTML = `
        <a href="mailto:${company.email}">${company.email}</a>
        <a href="tel:${(company.phone || "").replace(/\s/g, "")}">${company.phone}</a>
        <p>${company.location}</p>
      `;
    }

    // Films
    const filmGrid = document.querySelector(".film-grid");

    if (filmGrid && films.length) {
      filmGrid.innerHTML = "";

      films.forEach((film, index) => {
        const card = document.createElement("article");

        let sizeClass = "";
        if (index === 0) sizeClass = "large";
        if (index === films.length - 1) sizeClass = "wide";

        card.className = `film-card ${sizeClass}`;

        const imageClass = `image-${index + 1}`;

        card.innerHTML = `
          <div class="film-image ${imageClass}">
            ${
              film.poster
                ? `<img src="${film.poster}" alt="${film.title} poster">`
                : ""
            }
            <span class="film-type">${film.type || "FILM"}</span>
          </div>

          <div class="film-meta">
            <h3>${film.title || ""}</h3>
            <p>${film.synopsis || ""}</p>
          </div>
        `;

        filmGrid.appendChild(card);
      });
    }

    // News
    const newsGrid = document.querySelector(".news-grid");

    if (newsGrid && news.length) {
      newsGrid.innerHTML = "";

      news.forEach(article => {
        const card = document.createElement("article");
        card.className = "news-card";

        card.innerHTML = `
          ${
            article.image
              ? `<img src="${article.image}" alt="${article.title || "News"}">`
              : ""
          }
          <div class="news-meta">
            <p class="news-date">${article.date || ""}</p>
            <h3>${article.title || ""}</h3>
            <p>${article.summary || ""}</p>
          </div>
        `;

        newsGrid.appendChild(card);
      });
    }

    // Gallery
    const galleryGrid = document.querySelector(".gallery-grid");

    if (galleryGrid && gallery.length) {
      galleryGrid.innerHTML = "";

      gallery.forEach(item => {
        const card = document.createElement("figure");
        card.className = "gallery-item";

        card.innerHTML = `
          ${
            item.image
              ? `<img src="${item.image}" alt="${item.title || "Gallery image"}">`
              : ""
          }
          ${
            item.caption
              ? `<figcaption>${item.caption}</figcaption>`
              : ""
          }
        `;

        galleryGrid.appendChild(card);
      });
    }

    console.log("CMS content loaded successfully.");
  } catch (error) {
    console.error("Could not load CMS content:", error);
  }
}

loadCMSContent();
