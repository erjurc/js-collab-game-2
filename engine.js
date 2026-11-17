
// Lista pomieszczeń
const pokoje = [
    { id: 1, nazwa: "Składzik" },
    { id: 2, nazwa: "Recepcja" },
    { id: 3, nazwa: "Magazyn" },
    { id: 4, nazwa: "Serwerownia" },
    { id: 5, nazwa: "Wyjście" }
];

// Maksymalna energia
const MAKS_ENERGIA = 12;

// Stan początkowy gry
function stanPoczatkowy() {
    return {
        pokoj: 2,
        energia: MAKS_ENERGIA,
        klucz: false,
        karta: false,
        magazynOdblokowany: false,
        bezpiecznik: false,
        kaucja: false,
        zasilanie: false,
        koniec: false,
        wygrana: false
    };
}

// Sprawdzanie poprawności stanu
function czyStan(stan) {
    if (
        stan === null ||
        typeof stan !== "object" ||
        Array.isArray(stan)
    ) {
        return false;
    }

    if (!Number.isInteger(stan.pokoj) || stan.pokoj < 1 || stan.pokoj > 5) return false;
    if (!Number.isInteger(stan.energia) || stan.energia < 0 || stan.energia > MAKS_ENERGIA) return false;

    if (typeof stan.klucz !== "boolean") return false;
    if (typeof stan.karta !== "boolean") return false;
    if (typeof stan.magazynOdblokowany !== "boolean") return false;
    if (typeof stan.bezpiecznik !== "boolean") return false;
    if (typeof stan.kaucja !== "boolean") return false;
    if (typeof stan.zasilanie !== "boolean") return false;
    if (typeof stan.koniec !== "boolean") return false;
    if (typeof stan.wygrana !== "boolean") return false;

    if (stan.wygrana && !stan.koniec) return false;
    if (stan.magazynOdblokowany && stan.klucz) return false;

    return true;
}

// Główna funkcja zasad gry
function przejscie(stanPrzed, komenda) {

    if (!czyStan(stanPrzed)) {
        return {
            stan: stanPrzed,
            komunikat: "Niepoprawny stan gry."
        };
    }

    if (stanPrzed.koniec) {
        return {
            stan: stanPrzed,
            komunikat: "Gra jest zakończona."
        };
    }

    let nowy = { ...stanPrzed };
    let komunikat = "";

    // Poruszanie się
    if (komenda === "prawo" || komenda === "lewo") {

        let cel = nowy.pokoj;

        if (komenda === "prawo") cel++;
        if (komenda === "lewo") cel--;

        if (cel < 1 || cel > 5) {
            return {
                stan: stanPrzed,
                komunikat: "Nie ma przejścia."
            };
        }

        // Blokada magazynu
        if (cel === 3 && !nowy.magazynOdblokowany) {
            return {
                stan: stanPrzed,
                komunikat: "ZAMKNIĘTE! Musisz użyć klucza w recepcji."
            };
        }

        nowy.pokoj = cel;
        komunikat = "Przeszedłeś do: " + pokoje[cel - 1].nazwa;
    }

    // Pobieranie klucza
    else if (komenda === "klucz") {

        if (nowy.pokoj !== 1 || nowy.klucz) {
            return {
                stan: stanPrzed,
                komunikat: "Nie możesz pobrać klucza."
            };
        }

        nowy.klucz = true;
        komunikat = "Zebrano klucz do magazynu.";
    }

    // Pobieranie karty
    else if (komenda === "karta") {

        if (nowy.pokoj !== 2 || nowy.karta) {
            return {
                stan: stanPrzed,
                komunikat: "Nie możesz pobrać karty."
            };
        }

        nowy.karta = true;
        komunikat = "Zebrano kartę dostępu.";
    }

    // Odblokowanie magazynu
    else if (komenda === "odblokuj") {

        if (
            nowy.pokoj !== 2 ||
            !nowy.klucz ||
            nowy.magazynOdblokowany
        ) {
            return {
                stan: stanPrzed,
                komunikat: "Nie możesz odblokować magazynu. Potrzebujesz klucza i musisz znajdować się w recepcji."
            };
        }

        nowy.magazynOdblokowany = true;
        nowy.klucz = false;

        komunikat = "Użyto klucza! MAGAZYN ZOSTAŁ ODBLOKOWANY.";
    }

    // Pobieranie bezpiecznika
    else if (komenda === "bezpiecznik") {

        if (
            nowy.pokoj !== 3 ||
            !nowy.magazynOdblokowany ||
            nowy.bezpiecznik ||
            nowy.zasilanie
        ) {
            return {
                stan: stanPrzed,
                komunikat: "Nie możesz pobrać bezpiecznika."
            };
        }

        nowy.bezpiecznik = true;
        komunikat = "Zebrano bezpiecznik.";
    }

    // Pobieranie kaucji
    else if (komenda === "kaucja") {

        if (
            nowy.pokoj !== 3 ||
            !nowy.magazynOdblokowany ||
            nowy.kaucja
        ) {
            return {
                stan: stanPrzed,
                komunikat: "Nie możesz zabrać kaucji."
            };
        }

        nowy.kaucja = true;

        komunikat = "Zabrałeś dwa worki z kaucją! Na telefon przychodzi wiadomość od MJ: Właśnie odkryłeś sposób na zostanie Kaucjuszem.";
    }

    // Naprawa zasilania
    else if (komenda === "napraw") {

        if (nowy.pokoj !== 4 || !nowy.bezpiecznik) {
            return {
                stan: stanPrzed,
                komunikat: "Nie możesz naprawić zasilania. Potrzebujesz bezpiecznika."
            };
        }

        nowy.bezpiecznik = false;
        nowy.zasilanie = true;

        komunikat = "Naprawiono zasilanie!";
    }

    // Wyjście
    else if (komenda === "wyjdz") {

        if (
            nowy.pokoj !== 5 ||
            !nowy.karta ||
            !nowy.zasilanie
        ) {
            return {
                stan: stanPrzed,
                komunikat: "Nie możesz wyjść. Potrzebujesz karty i włączonego zasilania."
            };
        }

        nowy.wygrana = true;
        nowy.koniec = true;

        komunikat = "WYGRAŁEŚ! Udało Ci się uciec!";

        if (nowy.kaucja) {
            komunikat += " Jesteś bogatszy o wartość kaucji, Kaucjuszu!";
        }
    }

    else {
        return {
            stan: stanPrzed,
            komunikat: "Nieznana komenda."
        };
    }

    // Każda udana akcja kosztuje 1 energię
    nowy.energia--;

    if (nowy.energia <= 0 && !nowy.wygrana) {
        nowy.koniec = true;
        komunikat += " Koniec energii. PRZEGRANA!";
    }

    return {
        stan: nowy,
        komunikat: komunikat
    };
}
