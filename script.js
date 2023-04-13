const main = document.querySelector(".main");
const output = document.querySelector(".output");

function dropDownChanged(element) {
    main.innerHTML = "";
    switch (element.value.toUpperCase()) {
        case "ADD": new Add(); break;
        case "SUBTRACT": new Subtract(); break;
        case "MULTIPLY": new Multiply(); break;
    }
}

new Add();