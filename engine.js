
const pokoje = [
    { id: 1, nazwa: "Recepcja" },
    { id: 2, nazwa: "Magazyn" },
    { id: 3, nazwa: "Serwerownia" },
    { id: 4, nazwa: "Wyjście" }
];

// Stan początkowy gry
function stanPoczatkowy() {
    return {
        pokoj: 1,
        energia: 10,
        karta: false,
        bezpiecznik: false,
        zasilanie: false,
        koniec: false,
        wygrana: false
    };
}

// Sprawdzanie poprawności stanu
function czyStan(stan) {
    if (stan === null || typeof stan !== "object" || Array.isArray(stan)) {
        return false;
    }

    if (!Number.isInteger(stan.pokoj) || stan.pokoj < 1 || stan.pokoj > 4) {
        return false;
    }

    if (!Number.isInteger(stan.energia) || stan.energia < 0 || stan.energia > 10) {
        return false;
    }

    if (typeof stan.karta !== "boolean") return false;
    if (typeof stan.bezpiecznik !== "boolean") return false;
    if (typeof stan.zasilanie !== "boolean") return false;
    if (typeof stan.koniec !== "boolean") return false;
    if (typeof stan.wygrana !== "boolean") return false;

    if (stan.wygrana && !stan.koniec) return false;

    return true;
}

// Główna funkcja zasad gry
function przejscie(stanPrzed, komenda) {

    if (!czyStan(stanPrzed)) {
        return { stan: stanPrzed, komunikat: "Niepoprawny stan gry" };
    }

    if (stanPrzed.koniec) {
        return { stan: stanPrzed, komunikat: "Gra jest zakończona" };
    }

    let nowy = { ...stanPrzed };
    let komunikat = "";

    // Poruszanie się
    if (komenda === "prawo" || komenda === "lewo") {

        let cel = nowy.pokoj;

        if (komenda === "prawo") cel++;
        if (komenda === "lewo") cel--;

        if (cel < 1 || cel > 4) {
            return { stan: stanPrzed, komunikat: "Nie ma przejścia" };
        }

        nowy.pokoj = cel;
        komunikat = "Przeszedłeś do: " + pokoje[cel - 1].nazwa;
    }

    // Pobieranie karty
    else if (komenda === "karta") {

        if (nowy.pokoj !== 1 || nowy.karta) {
            return { stan: stanPrzed, komunikat: "Nie możesz pobrać karty" };
        }

        nowy.karta = true;
        komunikat = "Zebrano kartę";
    }

    // Pobieranie bezpiecznika
    else if (komenda === "bezpiecznik") {

        if (nowy.pokoj !== 2 || nowy.bezpiecznik || nowy.zasilanie) {
            return { stan: stanPrzed, komunikat: "Nie ma bezpiecznika" };
        }

        nowy.bezpiecznik = true;
        komunikat = "Zebrano bezpiecznik";
    }

    // Naprawa zasilania
    else if (komenda === "napraw") {

        if (nowy.pokoj !== 3 || !nowy.bezpiecznik) {
            return { stan: stanPrzed, komunikat: "Nie możesz naprawić zasilania" };
        }

        nowy.bezpiecznik = false;
        nowy.zasilanie = true;
        komunikat = "Naprawiono zasilanie";
    }

    // Wyjście
    else if (komenda === "wyjdz") {

        if (nowy.pokoj !== 4 || !nowy.karta || !nowy.zasilanie) {
            return { stan: stanPrzed, komunikat: "Nie możesz wyjść" };
        }

        nowy.wygrana = true;
        nowy.koniec = true;
        komunikat = "Wygrałeś!";
    }

    else {
        return { stan: stanPrzed, komunikat: "Nieznana komenda" };
    }

    // Każda udana akcja kosztuje 1 energię
    nowy.energia--;

    if (nowy.energia <= 0 && !nowy.wygrana) {
        nowy.koniec = true;
        komunikat += " Koniec energii. Przegrana!";
    }

    return { stan: nowy, komunikat: komunikat };
}
