/* ========================================
   NOCTURNE BOOKS — СИСТЕМА ТЕМ
======================================== */

const NOCTURNE_THEME_KEY =
  "nocturne-theme";


const NOCTURNE_THEMES = [
  "light",
  "night",
  "pink",
  "twilight",
  "midnight"
];


/* ========================================
   ПОЛУЧИТЬ СОХРАНЁННУЮ ТЕМУ
======================================== */

function getNocturneTheme(){

  const savedTheme =
    localStorage.getItem(
      NOCTURNE_THEME_KEY
    );


  if(
    NOCTURNE_THEMES.includes(
      savedTheme
    )
  ){
    return savedTheme;
  }


  /*
  Подхватываем старую настройку
  из профиля, если она уже была.
  */

  const oldTheme =
    localStorage.getItem(
      "nocturne-profile-theme"
    );


  if(oldTheme === "dark"){
    return "night";
  }


  return "light";
}


/* ========================================
   ПРИМЕНИТЬ ТЕМУ
======================================== */

function applyNocturneTheme(theme){

  if(
    !NOCTURNE_THEMES.includes(
      theme
    )
  ){
    theme = "light";
  }


  document.documentElement.setAttribute(
    "data-theme",
    theme
  );


  localStorage.setItem(
    NOCTURNE_THEME_KEY,
    theme
  );


  /*
  Для совместимости со старым
  кодом профиля.
  */

  document.body.classList.toggle(
    "dark",
    theme === "night" ||
    theme === "midnight"
  );
}


/* ========================================
   СМЕНИТЬ ТЕМУ
======================================== */

function setNocturneTheme(theme){

  applyNocturneTheme(
    theme
  );


  window.dispatchEvent(
    new CustomEvent(
      "nocturne-theme-change",
      {
        detail:{
          theme:theme
        }
      }
    )
  );

}


/* ========================================
   НАЗВАНИЯ ТЕМ
======================================== */

function getNocturneThemeName(theme){

  const names = {

    light:
      "Светлая",

    night:
      "Ночная",

    pink:
      "Розовая",

    twilight:
      "Сумерки",

    midnight:
      "Полночь"

  };


  return names[theme] ||
    "Светлая";
}


/* ========================================
   ЗАПУСК
======================================== */

applyNocturneTheme(
  getNocturneTheme()
);


/* ========================================
   ОБНОВЛЕНИЕ ПРИ ВОЗВРАЩЕНИИ
======================================== */

window.addEventListener(
  "pageshow",
  ()=>{

    applyNocturneTheme(
      getNocturneTheme()
    );

  }
);
