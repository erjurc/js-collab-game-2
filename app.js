const MAKS_ENERGIA = 10;
let pokoj = 2; // Start w Recepcji (pokój 2)
let energia = MAKS_ENERGIA;
let karta = false;
let bezpiecznik = false;
let zasilanie = false;
let klucz = false;
let koniec = false;
let wygrana = false;

function start() {
  pokoj = 2;
  energia = MAKS_ENERGIA;
  karta = false;
  bezpiecznik = false;
  zasilanie = false;
  klucz = false;
  koniec = false;
  wygrana = false;
  console.log("UCIECZKA Z SERWEROWNI. Zasilanie awaryjne wystarczy na 10 tur.");
  pomoc();
  rozejrzyj();
}

function zakonczTure() {
  energia = energia - 1;
  console.log("Pozostala energia: " + energia);
  if (wygrana) {
    console.log("WYGRANA! Drzwi otwarte. Mozesz wrocic do domu.");
  } else if (energia === 0) {
    koniec = true;
    console.log("PRZEGRANA. Zasilanie awaryjne padlo. Wpisz start().");
  }
}

// SEKCJA A — INFORMACJE I MAPA
function nazwaPokoju(numer) {
  switch (numer) {
    case 1:
      return "Składzik";
    case 2:
      return "Recepcja";
    case 3:
      return "Magazyn";
    case 4:
      return "Serwerownia";
    case 5:
      return "Wyjście";
    default:
      return "Nieznane pomieszczenie";
  }
}

function pomoc() {
  console.log(" POMOC DOSTĘPNE KOMENDY ");
  console.log("start() - Rozpoczyna nową grę od początku.");
  console.log("pomoc() - Wyświetla tę listę komend.");
  console.log("status() - Pokazuje stan energii, przedmioty i postępy.");
  console.log("mapa() - Pokazuje listę pomieszczeń i Twoją lokalizację.");
  console.log("rozejrzyj() - Opisuje pokój, w którym się znajdujesz.");
  console.log("idz('prawo') / idz('lewo') - Przemieszczanie się między pokojami.");
  console.log("akcja('klucz') - Podnoszenie klucza (w Składziku).");
  console.log("akcja('karta') - Podnoszenie karty (w Recepcji).");
  console.log("akcja('bezpiecznik') - Podnoszenie bezpiecznika (w Magazynie).");
  console.log("akcja('napraw') - Montowanie bezpiecznika i włączenie zasilania (w Serwerowni).");
  console.log("akcja('wyjdz') - Próba ucieczki przez drzwi (przy Wyjściu).");
  console.log("---");
  console.log("ZASADA KOSZTU: Każda wykonana akcja zużywa 1 punkt energii.");
  console.log("Masz do dyspozycji 10 tur, zanim zasilanie awaryjne padnie!");
  console.log("-----------------------------------------------------------------");
}

function status() {
  console.log(" STATUS GRY ");
  console.log("Aktualny pokój: " + pokoj + " (" + nazwaPokoju(pokoj) + ")");
  console.log("Energia: " + energia);
  console.log("Klucz: " + (klucz ? "tak" : "nie"));
  console.log("Karta: " + (karta ? "tak" : "nie"));
  console.log("Bezpiecznik: " + (bezpiecznik ? "tak" : "nie"));
  console.log("Zasilanie: " + (zasilanie ? "włączone" : "wyłączone"));
  console.log("--------------------------------------------------");
}

function mapa() {
  for (let numer = 1; numer <= 5; numer = numer + 1) {
    let opis = numer + ". " + nazwaPokoju(numer);
    
    if (numer === pokoj) {
      opis = opis + " <-- jestes tutaj";
    }
    console.log(opis);
  }
}

function rozejrzyj() {
  switch (pokoj) {
    case 1: // Składzik
      console.log("Znajdujesz się w małym składziku.");
      if (!klucz) {
        console.log("Na półce leży klucz do magazynu.");
      } else {
        console.log("Półka jest pusta.");
      }
      break;

    case 2: // Recepcja
      console.log("Znajdujesz się w recepcji");
      if (!karta) {
        console.log("Na biurku leży karta dostępu");
      } else {
        console.log("Biurko jest puste.");
      }
      break;

    case 3: // Magazyn
      console.log("Jesteś w magazynie pełnym starych regałów");
      if (!bezpiecznik && !zasilanie) {
        console.log("Na jednej z półek leży zapasowy bezpiecznik.");
      } else {
        console.log("Półka z częściami jest pusta.");
      }
      break;

    case 4: // Serwerownia
      console.log("Wchodzisz do chłodnej serwerowni.");
      if (zasilanie) {
        console.log("Główne serwery buczą i chuczą, a zasilanie działa w najlepsze.(Jest zasilanie)");
      } else {
        console.log("Wszystko jest wyłączone. Wokół panuje ciemność (Nie ma zasilania).");
      }
      break;

    case 5: // Wyjście
      console.log("Stoisz przed drzwiami wyjściowymi.");
      console.log("Wymagania do ucieczki: musisz posiadać kartę oraz włączone zasilanie!");
      break;

    default:
      console.log("Nie wiesz, gdzie jesteś, zgubiłeś się ");
  }
}

// SEKCJA B — RUCH
function idz(kierunek) {
	if(koniec == true){
		console.log("Koniec gry.");
		return;
	}
	
	let nastepnypokoj = pokoj;
	switch (kierunek){
		case "prawo":
			nastepnypokoj = nastepnypokoj + 1;
			break;
		case "lewo":
			nastepnypokoj = nastepnypokoj - 1;
			break;
		default:
			console.log("Wskazówka: wybierz kierunek 'prawo' lub 'lewo'.");
			return;
	}

  // Blokada wejścia do magazynu (pokój 3) bez klucza
  if (nastepnypokoj === 3 && !klucz) {
    console.log("Magazyn jest zamknięty! Potrzebujesz klucza ze składziku.");
    return;
  }

	if (nastepnypokoj < 1 || nastepnypokoj > 5) {
    console.log("Nie ma przejścia");
    return;
	}

	pokoj = nastepnypokoj;
	rozejrzyj();
	zakonczTure();
}

// SEKCJA C — PRZEDMIOTY I WYGRANA
function akcja(co){
  if(koniec == true){
      console.log("Koniec gry");
      return;
  }
  switch(co){
      case "klucz":
          if(klucz == false){
              if(pokoj == 1){
                  klucz = true;
                  console.log("Zebrano klucz do magazynu.");
                  break;
              }
              else{
                  console.log("Zły pokój");
                  return;
              }
          }
          else{
              console.log("Masz już klucz");
              return;
          }
      case "karta":
          if(karta == false){
              if(pokoj == 2){
                  karta = true;
                  console.log("Zebrano kartę");
                  break;
              }
              else{
                  console.log("Zły pokój");
                  return;
              }
          }
          else{
              console.log("Masz już kartę");
              return;
          }
      case "bezpiecznik":
          if(bezpiecznik == false){
              if(zasilanie == false){
                  if(pokoj == 3){
                      bezpiecznik = true;
                      console.log("Podniesiono bezpiecznik.");
                      break;
                  }
                  else{
                      console.log("Zły pokój");
                      return;
                  }
              }
              else{
                  console.log("Zasilanie jest już włączone");
                  return;
              }
          }
          else{
              console.log("Masz już bezpiecznik");
              return;
          }
      case "napraw":
          if(bezpiecznik == true){
              if(zasilanie == false){
                  if(pokoj == 4){
                      zasilanie = true;
                      bezpiecznik = false;
                      console.log("Naprawiono zasilanie.");
                      break;
                  }
                  else{
                      console.log("Zły pokój");
                      return;
                  }
              }
              else{
                  console.log("Zasilanie jest już włączone");
                  return;
              }
          }
          else{
              console.log("Brak bezpiecznika");
              return;
          }
      case "wyjdz":
          if(pokoj == 5){
              if(karta == true){
                  if(zasilanie == true){
                      wygrana = true;
                      koniec = true;
                      console.log("Udało się uciec!");
                      break;
                  }
                  else{
                      console.log("Brak zasilania");
                      return;
                  }
              }
              else{
                  console.log("Brak karty");
                  return;
              }
          }
          else{
              console.log("Zły pokój");
              return;
          }
      default:
          console.log("Błędna komenda");
          return;
  }
  zakonczTure();
}

start();