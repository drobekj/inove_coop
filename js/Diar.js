class Diar {

    constructor(jazyk = "cs-CZ") {

        const zaznamyZeStorage = localStorage.getItem("ukoly");
        this.zaznamy = zaznamyZeStorage ? JSON.parse(zaznamyZeStorage) : [];
        this.jazyk = jazyk;
        this.vypisElement = document.getElementById("seznam-ukolu");
    }
    
    ulozZaznamy() {
        localStorage.setItem("ukoly", JSON.stringify(this.zaznamy));
    }

    seradZaznamy() {
        this.zaznamy.sort(function (zaznam1, zaznam2) {
            return (new Date(zaznam1.datum) - new Date(zaznam2.datum));
        });
    }

    vypisZaznamy() {
        this.seradZaznamy();
        this.vypisElement.innerHTML = "<h1>Seznam úkolů</h1>";
        const tabulka = document.createElement("table");

        let posledniDatum = null;
        for (const zaznam of this.zaznamy) {
            let radek = document.createElement("tr");

            let mazatko = document.createElement("td");
            mazatko.insertAdjacentHTML("beforeend", `<img src="images/delete_icon.png" alt="Java" />`);
            mazatko.className = "smazat";
            mazatko.onclick = () => {
                if (confirm("Opravdu si přejete odstranit úkol?")) {
                    this.zaznamy = this.zaznamy.filter(z => z !== zaznam);
                    this.ulozZaznamy();
                    this.vypisZaznamy();
                }
            };
            radek.appendChild(mazatko);

            let den = document.createElement("td");
            den.className = "datum";
            let datum = new Date(zaznam.datum).toLocaleDateString(this.jazyk, {
                //weekday: "long",
                day: "numeric",
                month: "numeric",
                year: "numeric"
            });
            if (new Date(zaznam.datum).toLocaleDateString() !== posledniDatum) {
                den.insertAdjacentHTML("beforeend", `${datum}`);
            }
            den.onclick = () => {
                let noveDatum = prompt ("Datum zadání:",datum);
                let datumSlozky = noveDatum.split(".");
                if (noveDatum !== "") {
                    zaznam.datum = new Date(datumSlozky[2],parseInt(datumSlozky[1])-1,datumSlozky[0]);
                    this.ulozZaznamy();
                    this.vypisZaznamy();
                } else
                    alert("Vyplnit datum!");
            };

            radek.appendChild(den);
            posledniDatum = new Date(zaznam.datum).toLocaleDateString();

            let zadani = document.createElement("td");
            zadani.insertAdjacentHTML("beforeend", `${zaznam.zneni}`)
            zadani.onclick = () => {
                const zneni = prompt ("Znění úkolu:",zaznam.zneni);
                if (zneni.length !== 0) {
                    zaznam.zneni = zneni;
                    this.ulozZaznamy();
                    this.vypisZaznamy();
                } else
                    alert("Vyplnit znění!");
            };
            radek.appendChild(zadani);
            
            let plnitko = document.createElement("td");
            plnitko.insertAdjacentHTML("beforeend",`<img src="images/done_icon.png" alt="Java" />`);
            plnitko.className = (zaznam.splneno ? "splneno" : "nesplneno");
            plnitko.onclick = () => {
                zaznam.splneno = !zaznam.splneno;
                this.ulozZaznamy();
                this.vypisZaznamy();
            };
            radek.appendChild(plnitko);
            tabulka.appendChild(radek);
        }

        let radek = document.createElement("tr");

        let mazatko = document.createElement("td");
        mazatko.insertAdjacentHTML("beforeend", `<img src="images/delete_icon.png" alt="Java" />`);
        mazatko.className = "smazat";
        mazatko.className = "nesplneno";
        radek.appendChild(mazatko);

        let den = document.createElement("td");
        den.className = "datum";
        let datum = new Date().toLocaleDateString(this.jazyk, {
            //weekday: "long",
            day: "numeric",
            month: "numeric",
            year: "numeric"
        });
        den.insertAdjacentHTML("beforeend", `${datum}`);
        let vlozDatum = new Date();
        den.onclick = () => {
            let noveDatum = prompt ("Datum zadání:",datum);
            let datumSlozky = noveDatum.split(".");
            if (noveDatum !== "") {
                den.innerHTML =`${noveDatum}`;
                vlozDatum = new Date(datumSlozky[2],parseInt(datumSlozky[1])-1,datumSlozky[0]);
            }
        };
        radek.appendChild(den);

        let noveZadani = document.createElement("td");
        noveZadani.className = "nove-zadani";
        noveZadani.insertAdjacentHTML("beforeend", "Nový úkol")
        noveZadani.onclick = () => {
            const zneni = prompt ("Znění úkolu:");
            if (zneni.length !== 0) {
                const zaznam = new Zaznam(zneni, vlozDatum);
                this.zaznamy.push(zaznam);
                this.ulozZaznamy();
                this.vypisZaznamy();
            } else
                alert("Vyplnit znění!");
        };
        radek.appendChild(noveZadani);

        let plnitko = document.createElement("td");
        plnitko.insertAdjacentHTML("beforeend",`<img src="images/done_icon.png" alt="Java" />`);
        plnitko.className = "nesplneno";
        radek.appendChild(plnitko);

        tabulka.appendChild(radek);
        this.vypisElement.appendChild(tabulka);
    }
}