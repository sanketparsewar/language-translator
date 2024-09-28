const fromText = document.querySelector(".from-text");
toText = document.querySelector(".to-text");
selectTag = document.querySelectorAll("select");
exchangeIcon = document.querySelector(".exchange");
translateBtn = document.querySelector(".btn");
icons = document.querySelectorAll(".row i");

selectTag.forEach((tag, id) => {
  for (const country_code in countries) {
    // selecting English by default as from language and hindi as to language
    let selected;
    if (id == 0 && country_code == "en-GB") {
      selected = "selected";
    } else if (id == 1 && country_code == "hi-IN") {
      selected = "selected";
    }
    let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
    // console.log(option);
    tag.insertAdjacentHTML("beforeend", option); //addingoption tag inside select tag
  }
});

exchangeIcon.addEventListener("click", () => {
  //exchnage textarea and select tag values
  let tempText = fromText.value,
    tempLang = selectTag[0].value;
  fromText.value = toText.value;
  selectTag[0].value = selectTag[1].value;
  toText.value = tempText;
  selectTag[1].value = tempLang;
});

translateBtn.addEventListener("click", () => {
  let text = fromText.value,
    translateFrom = selectTag[0].value; //getting from select tag value
  translateTo = selectTag[1].value; //getting to select tag value
  if (!text) return;
toText.setAttribute("placehonder","Translating...")
let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
//fetching api response and returning it with parsing into js obj
// and in another method receiving that obj
// console.log(text, translateFrom, translateTo);
fetch(apiUrl)
.then((res) => res.json())
.then((data) => {
    toText.value = data.responseData.translatedText;
    toText.setAttribute("placehonder","Translation ")
    });
});

icons.forEach((icon) => {
  icon.addEventListener("click", ({ target }) => {
    // if clicked icon had from id,copy fromTextare value else copy from the toTextarea value
    if (target.classList.contains("fa-copy")) {
      if (target.id == "from") {
        navigator.clipboard.writeText(fromText.value);
      } else {
        navigator.clipboard.writeText(toText.value);
      }
    } else {
      let utterance;
      if (target.id == "from") {
        utterance = new SpeechSynthesisUtterance(fromText.value);
        utterance.lang = selectTag[0].value; //setting utterace language to fromselect tag value
      } else {
        utterance = new SpeechSynthesisUtterance(toText.value);
        utterance.lang = selectTag[1].value; //setting utterace language to fromselect tag value
      }
      speechSynthesis.speak(utterance);
    }
  });
});
