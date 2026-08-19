/* =========================================
   ССЫЛКИ НА СТРАНИЦЫ КНИГ
========================================= */

const BOOK_LINKS = {
  "Перемены на лету": "changes-on-the-fly.html",
  "Холодная малышка": "cold-baby.html",
  "Огонь и лёд": "fire-and-ice.html",
  "Скажи, что я ошибаюсь": "say-im-wrong.html",
  "Холодный как лёд": "cold-as-ice.html"
};


/* =========================================
   ПОИСК КНИГ НА ГЛАВНОЙ
========================================= */

function makeBooksClickable(){

  const possibleTitles = document.querySelectorAll(
    ".series-book-name, .book-title, .featured-title, .new-book-title, h2, h3"
  );

  possibleTitles.forEach(titleElement => {

    const title =
      titleElement.textContent
      .trim()
      .replace(/\s+/g, " ");

    const page =
      BOOK_LINKS[title];

    if(!page){
      return;
    }


    /* Ищем ближайшую карточку книги */

    const card =
      titleElement.closest(
        ".series-book, .book-card, .featured-book, .new-book-card, .reading-card"
      );


    if(!card){
      return;
    }


    /* Чтобы не назначать обработчик дважды */

    if(card.dataset.bookLinkReady === "yes"){
      return;
    }


    card.dataset.bookLinkReady =
      "yes";


    card.style.cursor =
      "pointer";


    card.addEventListener(
      "click",
      function(event){

        /* Если внутри уже нажали на настоящую ссылку или кнопку —
           не мешаем ей работать */

        if(
          event.target.closest(
            "a, button"
          )
        ){
          return;
        }


        window.location.href =
          page;

      }
    );

  });

}


document.addEventListener(
  "DOMContentLoaded",
  makeBooksClickable
);


window.addEventListener(
  "pageshow",
  makeBooksClickable
);
