const muzykaMJ = new Audio("./MJ.mp3");
let stan = stanPoczatkowy();

// Wykonywanie komendy
function wykonaj(komenda) {
    let wynik = przejscie(stan, komenda);

    stan = wynik.stan;

    console.log(wynik.komunikat);
}

// Poruszanie się
function idz(kierunek) {
    let poprzedniPokoj = stan.pokoj;

    wykonaj(kierunek);

    if (stan.pokoj !== poprzedniPokoj) {
        rozejrzyj();
    }
}

// Zbieranie klucza
function wezKlucz() {
    wykonaj("klucz");
}

// Zbieranie karty
function wezKarte() {
    wykonaj("karta");
}

// Odblokowanie magazynu
function odblokujMagazyn() {
    wykonaj("odblokuj");
}

// Zbieranie bezpiecznika
function wezBezpiecznik() {
    wykonaj("bezpiecznik");
}

// Zbieranie kaucji
function wezKaucje() {
    wykonaj("kaucja");
    muzykaMJ.currentTime = 0;
    muzykaMJ.play();
}

// Naprawa zasilania
function napraw() {
    wykonaj("napraw");
}

// Wyjście
function wyjdz() {
    wykonaj("wyjdz");
}

// Wyświetlanie stanu gry
function status() {
    console.log("===== STATUS GRY =====");
    console.log("Pokój:", stan.pokoj, pokoje[stan.pokoj - 1].nazwa);
    console.log("Energia:", stan.energia);
    console.log("Klucz:", stan.klucz ? "tak" : "nie");
    console.log("Karta:", stan.karta ? "tak" : "nie");
    console.log("Magazyn odblokowany:", stan.magazynOdblokowany ? "tak" : "nie");
    console.log("Bezpiecznik:", stan.bezpiecznik ? "tak" : "nie");
    console.log("Kaucja:", stan.kaucja ? "zabrana" : "niezabrana");
    console.log("Zasilanie:", stan.zasilanie ? "włączone" : "wyłączone");
    console.log("Koniec gry:", stan.koniec);
    console.log("Wygrana:", stan.wygrana);
}

// Mapa
function mapa() {
    for (let i = 0; i < pokoje.length; i++) {
        let opis = pokoje[i].id + ". " + pokoje[i].nazwa;

        if (pokoje[i].id === stan.pokoj) {
            opis += " <-- jesteś tutaj";
        }

        console.log(opis);
    }
}

// Rozejrzenie się
function rozejrzyj() {
    console.log("Znajdujesz się w:", pokoje[stan.pokoj - 1].nazwa);

    if (stan.pokoj === 1) {
        console.log("SKŁADZIK");

        if (!stan.klucz) {
            console.log("Na półce leży klucz do magazynu.");
        } else {
            console.log("Półka jest pusta.");
        }
    }

    if (stan.pokoj === 2) {
        console.log("RECEPCJA");

        if (!stan.karta) {
            console.log("Na biurku leży karta dostępu.");
        }

        if (stan.klucz && !stan.magazynOdblokowany) {
            console.log("Masz klucz. Możesz odblokować magazyn.");
        }

        if (!stan.magazynOdblokowany) {
            console.log("MAGAZYN: ZAMKNIĘTE.");
        } else {
            console.log("MAGAZYN: ODBLOKOWANY.");
        }
    }

    if (stan.pokoj === 3) {
        console.log("MAGAZYN");

        if (!stan.magazynOdblokowany) {
            console.log("ZAMKNIĘTE!");
        } else {
            console.log("Pod ścianą widzisz dwa worki z kaucją.");

            if (!stan.kaucja) {
                console.log("Możesz je zabrać komendą gra.wezKaucje().");
            } else {
                console.log("Worki z kaucją zostały już zabrane.");
            }

            if (!stan.bezpiecznik && !stan.zasilanie) {
                console.log("Na półce leży zapasowy bezpiecznik.");
            } else {
                console.log("Półka z częściami jest pusta.");
            }
        }
    }

    if (stan.pokoj === 4) {
        console.log("SERWEROWNIA");

        if (!stan.zasilanie) {
            console.log("Zasilanie jest wyłączone.");

            if (stan.bezpiecznik) {
                console.log("Możesz naprawić zasilanie komendą gra.napraw().");
            } else {
                console.log("Najpierw znajdź bezpiecznik w magazynie.");
            }
        } else {
            console.log("Zasilanie działa!");
        }
    }

    if (stan.pokoj === 5) {
        console.log("WYJŚCIE");

        if (stan.karta && stan.zasilanie) {
            console.log("Możesz opuścić budynek komendą gra.wyjdz().");
        } else {
            console.log("Potrzebujesz karty i włączonego zasilania.");
        }
    }
}

// Pomoc
function pomoc() {
    console.log("===== DOSTĘPNE KOMENDY =====");
    console.log("gra.idz('prawo') - idź w prawo");
    console.log("gra.idz('lewo') - idź w lewo");
    console.log("gra.wezKlucz() - zbierz klucz");
    console.log("gra.wezKarte() - zbierz kartę");
    console.log("gra.odblokujMagazyn() - użyj klucza w recepcji");
    console.log("gra.wezBezpiecznik() - zbierz bezpiecznik");
    console.log("gra.wezKaucje() - zabierz dwa worki z kaucją");
    console.log("gra.napraw() - napraw zasilanie");
    console.log("gra.wyjdz() - spróbuj uciec");
    console.log("gra.status() - pokaż status");
    console.log("gra.mapa() - pokaż mapę");
    console.log("gra.rozejrzyj() - rozejrzyj się");
    console.log("gra.reset() - rozpocznij od nowa");
    console.log("gra.eksportuj() - zapisz grę");
    console.log("gra.importuj(tekst) - wczytaj grę");
}

// Reset
function reset() {
    stan = stanPoczatkowy();

    console.log("Gra została zresetowana.");

    status();
    rozejrzyj();
}

// Eksport
function eksportuj() {
    let pakiet = {
        wersja: 3,
        stan: stan
    };

    return JSON.stringify(pakiet);
}

// Import
function importuj(tekst) {
    if (typeof tekst !== "string" || tekst === "") {
        console.log("Niepoprawny tekst.");
        return false;
    }

    try {
        let pakiet = JSON.parse(tekst);

        if (
            pakiet === null ||
            typeof pakiet !== "object" ||
            pakiet.wersja !== 3 ||
            !czyStan(pakiet.stan)
        ) {
            console.log("Niepoprawny zapis.");
            return false;
        }

        stan = { ...pakiet.stan };

        console.log("Wczytano zapis.");
        status();
        rozejrzyj();

        return true;

    } catch (blad) {
        console.log("Błąd wczytywania zapisu.");
        return false;
    }
}

// Wszystkie funkcje dostępne przez gra
window.gra = {
    idz,
    wezKlucz,
    wezKarte,
    odblokujMagazyn,
    wezBezpiecznik,
    wezKaucje,
    napraw,
    wyjdz,
    status,
    mapa,
    pomoc,
    reset,
    eksportuj,
    importuj,
    rozejrzyj
};

console.log("Gra uruchomiona!");
pomoc();
status();
rozejrzyj();
