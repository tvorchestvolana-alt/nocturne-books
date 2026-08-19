/* =========================================
   NOCTURNE BOOKS — КНИГИ НА ГЛАВНОЙ
========================================= */

const HOME_API_URL =
  "https://nocturne-books-api.tvorchestvolana.workers.dev";


async function loadHomeBooks() {

  const container =
    document.getElementById("homeBooks");

  if (!container) {
    return;
  }

  try {

    const response =
      await fetch(
        HOME_API_URL + "/books"
      );

    if (!response.ok) {
      throw new Error(
        "Не удалось загрузить книги"
      );
    }

    const books =
      await response.json();

    const homeBooks =
      books.filter(
        book =>
          Number(book.show_home) === 1
      );

    if (!homeBooks.length) {
      return;
    }

    homeBooks.forEach(book => {

      const card =
        document.createElement("div");

      card.className =
        "book-card dynamic-home-book";


      const cover =
        document.createElement("div");

      cover.className =
        "book-cover";


      const img =
        document.createElement("img");

      img.src =
        book.cover_url || "";

      img.alt =
        book.title || "Обложка книги";

      cover.appendChild(img);


      const info =
        document.createElement("div");

      info.className =
        "book-info";


      const title =
        document.createElement("div");

      title.className =
        "book-title";

      title.textContent =
        book.title || "";


      const author =
        document.createElement("div");

      author.className =
        "book-author";

      author.textContent =
        book.author || "";

      info.appendChild(title);
      info.appendChild(author);


      if (book.series_name) {

        const series =
          document.createElement("div");

        series.className =
          "book-series";

        series.textContent =
          book.series_name +
          (
            book.series_number
              ? " · #" + book.series_number
              : ""
          );

        info.appendChild(series);
      }


      card.appendChild(cover);
      card.appendChild(info);

      container.appendChild(card);

    });

  } catch (error) {

    console.error(
      "Ошибка загрузки книг на главную:",
      error
    );

  }

}


document.addEventListener(
  "DOMContentLoaded",
  loadHomeBooks
);
