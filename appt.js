
let stan = stanPoczatkowy();

// Wykonywanie komendy
function wykonaj(komenda) {
    let wynik = przejscie(stan, komenda);

    stan = wynik.stan;

    console.log(wynik.komunikat);
}

// Poruszanie się
function idz(kierunek) {
    wykonaj(kierunek);
}

// Zbieranie karty
function wezKarte() {
    wykonaj("karta");
}

// Zbieranie bezpiecznika
function wezBezpiecznik() {
    wykonaj("bezpiecznik");
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
    console.log("Pokój:", stan.pokoj);
    console.log("Energia:", stan.energia);
    console.log("Karta:", stan.karta);
    console.log("Bezpiecznik:", stan.bezpiecznik);
    console.log("Zasilanie:", stan.zasilanie);
    console.log("Koniec gry:", stan.koniec);
    console.log("Wygrana:", stan.wygrana);
}

// Reset gry
function reset() {
    stan = stanPoczatkowy();
    console.log("Gra została zresetowana");
}

// Eksport gry
function eksportuj() {
    let pakiet = {
        wersja: 1,
        stan: stan
    };

    return JSON.stringify(pakiet);
}

// Import gry
function importuj(tekst) {

    if (typeof tekst !== "string" || tekst === "") {
        console.log("Niepoprawny tekst");
        return false;
    }

    try {
        let pakiet = JSON.parse(tekst);

        if (pakiet === null || typeof pakiet !== "object") {
            console.log("Niepoprawny zapis");
            return false;
        }

        if (pakiet.wersja !== 1 || !czyStan(pakiet.stan)) {
            console.log("Niepoprawny zapis");
            return false;
        }

        stan = {
            pokoj: pakiet.stan.pokoj,
            energia: pakiet.stan.energia,
            karta: pakiet.stan.karta,
            bezpiecznik: pakiet.stan.bezpiecznik,
            zasilanie: pakiet.stan.zasilanie,
            koniec: pakiet.stan.koniec,
            wygrana: pakiet.stan.wygrana
        };

        console.log("Wczytano zapis");
        return true;

    } catch (blad) {
        console.log("Błąd wczytywania zapisu");
        return false;
    }
}

// Wszystkie funkcje dostępne przez gra
window.gra = {
    idz,
    wezKarte,
    wezBezpiecznik,
    napraw,
    wyjdz,
    status,
    reset,
    eksportuj,
    importuj
};

console.log("Gra uruchomiona");
status();
