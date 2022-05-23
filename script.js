let tabulka;
let tlacitko;
let vyzva;

window.onload = function () {
   vytvorVychoziTabulku();
   vytvorTlacitkoPridej();
}

function vytvorVychoziTabulku() {
   tabulka = document.createElement("table");
   document.body.appendChild(tabulka);
}
   
function vytvorTlacitkoPridej() {
   tlacitko = document.createElement("button");
   tlacitko.textContent = "Přidej úkol";
   document.body.appendChild(tlacitko);
   $(tlacitko).on("click",pridejUkol);
}

function pridejUkol() {
   vyzva = "Zadej";
   let radek = document.createElement("tr");
   tabulka.appendChild(radek);
   for (let i = 0; i < vytvoreni.length; i++) {
      radek.appendChild(document.createElement("td"));
      $(radek.childNodes[i]).html(vytvoreni[i]);
      $(radek.childNodes[i]).on("click",zmena[i]);
   }
}

let vytvoreni = [kriz,zneni,plnitko];
let zmena = [vymaz,uprav,splneni];

function kriz(){
   return '<img src="delete_icon.png" alt="Java" />';
 }
 
function zneni(){
   return prompt(vyzva + " znění:",$(this).text());
}

function plnitko(){
   $(this).addClass('nesplneno');
   return '<img src="done_icon.png" alt="Java" />';
 }
 
function vymaz(){
   $(this).parent().remove();
}

function uprav(){
   vyzva = "Uprav";
   $(this).text(zneni);
}

function splneni(){
   $(this).toggleClass('splneno');
}