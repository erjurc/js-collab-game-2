const pokoje = [
  { id: 1, nazwa: "Składzik"},
  { id: 2, nazwa: "Recepcja"},
  { id: 3, nazwa: "Magazyn"},
  { id: 4, nazwa: "Serwerownia"},
  { id: 5, nazwa: "Wyjście"}
];

function stanPoczatkowy(){
    let pokoj = 2;
    let energia = 10;
    let karta = false;
    let bezpiecznik = false;
    let zasilanie = false;
    let klucz = false;
    let koniec = false;
    let wygrana = false;
    return{
        pokoj, energia, karta, bezpiecznik, zasilanie, klucz, koniec, wygrana
    };
}