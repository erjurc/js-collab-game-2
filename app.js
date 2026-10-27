// WSPOLNY KONTRAKT: nazwy zmiennych i funkcji uzgadnia caly zespol.
const MAKS_ENERGIA = 10;
let pokoj = 1;
let energia = MAKS_ENERGIA;
let karta = true;
let bezpiecznik = false;
let zasilanie = false;
let koniec = false;
let wygrana = false;

// SEKCJA 0 — GOTOWY SILNIK NAUCZYCIELA
function start() {
  pokoj = 1;
  energia = MAKS_ENERGIA;
  karta = false;
  bezpiecznik = false;
  zasilanie = false;
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
      return "Recepcja";
    case 2:
      return "Magazyn";
    case 3:
      return "Serwerownia";
    case 4:
      return "Wyjscie"
    default:
      return "Nieznane pomieszczenie";
  }
}

function pomoc() {
  console.log("67 POMOC DOSTĘPNE KOMENDY 67");
  console.log("start() - Rozpoczyna nową grę od początku.");
  console.log("pomoc() - Wyświetla tę listę komend.");
  console.log("status() - Pokazuje stan energii, przedmioty i postępy.");
  console.log("mapa() - Pokazuje listę pomieszczeń i Twoją lokalizację.");
  console.log("rozejrzyj() - Opisuje pokój, w którym się znajdujesz.");
  console.log("idz('prawo') / idz('lewo') - Przemieszczanie się między pokojami.");
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
  console.log("67 STATUS GRY 67");
  console.log("Aktualny pokój: " + pokoj + " (" + nazwaPokoju(pokoj) + ")");
  console.log("Energia: " + energia);
  console.log("Karta: " + (karta ? "tak" : "nie"));
  console.log("Bezpiecznik: " + (bezpiecznik ? "tak" : "nie"));
  console.log("Zasilanie: " + (zasilanie ? "włączone" : "wyłączone"));
  console.log("--------------------------------------------------")
  console.log("We are Charlie Kirk, we carry the flame.");
  console.log("We'll fight for the Gospel, we'll honor his name.");
  console.log("We are Charlie Kirk, his courage our own.");
  console.log("Together unbroken, we'll make Heaven known");
}
function mapa() {
  for (let numer = 1; numer <= 4; numer = numer + 1) {
  let opis = numer + ". " + nazwaPokoju(numer);
    
    if (numer === pokoj) {
      opis = opis + " <-- jestes tutaj";
    }
    console.log(opis);
}
}
function rozejrzyj() {
  switch (pokoj) {
    case 1: //Recepcja
      console.log("Znajdujesz się w recepcji (Macha do ciebie ładna pani recepcjonistka).");
      if (!karta) {
        console.log("Na biurku leży karta dostępu, i karteczka z numerem do recepcjoniskti.");
      } else {
        console.log("Biurko jest puste.");
      }
      break;

    case 2: //Magazyn
      console.log("Jesteś w magazynie pełnym starych regałów ze starymi pornosami.");
      if (!bezpiecznik && !zasilanie) {
        console.log("Na jednej z półek leży zapasowy bezpiecznik.");
      } else {
        console.log("Półka z częściami jest pusta.(Prawie(są tylko pudełka z pornosami))");
      }
      break;

    case 3: // Serwerownia
      console.log("Wchodzisz do chłodnej serwerowni.");
      if (zasilanie) {
        console.log("Główne serwery buczą i chuczą, a zasilanie działa w najlepsze.(Jest zasilanie)");
      } else {
        console.log("Wszystko jest wyłączone. Wokół panuje ciemność (Nie ma zasilania).");
      }
      break;

    case 4: // Wyjscie
      console.log("Stoisz przed drzwiami wyjściowymi.(Smutna recepjonistka macha do ciebie żebyś wrócił)");
      console.log("Wymagania do ucieczki: musisz posiadać kartę oraz włączone zasilanie!");
      break;

    default:
      console.log("Nie wiesz, gdzie jesteś, zgubiłeś się ciołku");
  }
}

// SEKCJA B — RUCH
function idz(kierunek) {
	// TODO B1: zablokuj ruch po koncu gry. git
	if(koniec == true){
		console.log("koniec?");
		return;
	}
  // TODO B2: switch kierunku; oblicz kandydat na nowy pokoj.
	let nastepnypokoj = pokoj;
	switch (kierunek){
		case "prawo":
			nastepnypokoj=nastepnypokoj+1;
			break;
		case "lewo":
			nastepnypokoj=nastepnypokoj-1;
			break;
		default:
			console.log("Wskazówka: wybierz kierunek 'prawo' lub 'lewo'.");
			return;
	}
  // TODO B3: odrzuc pokoj poza 1..4 i nieznany kierunek bez kosztu.
	if (nastepnypokoj < 1 || nastepnypokoj > 4) {
    console.log("Nie ma przejścia");
    return;
	}
	if(nastepnypokoj < 1){
		nastepnypokoj=1;
	}
	if(nastepnypokoj > 4){
		nastepnypokoj=4;
	}
  // TODO B4: zapisz poprawny pokoj, rozejrzyj(), zakonczTure().
	pokoj = nastepnypokoj;
	rozejrzyj();
	zakonczTure();
}

// SEKCJA C — PRZEDMIOTY I WYGRANA
function akcja(co){
  if(koniec==true){
      console.log("Koniec gry");
      return;
  }
  switch(co){
      case "karta":
          if(karta == false){
              if(pokoj==1){
                  karta=true;
                  console.log("Zebrano kartę")
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
          if(bezpiecznik==false){
              if(zasilanie==false){
                  if(pokoj==2){
                      bezpiecznik=true;
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
          if(bezpiecznik==true){
              if(zasilanie==false){
                  if(pokoj==3){
                      zasilanie=true;
                      bezpiecznik=false;
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
          if(pokoj==4){
              if(karta==true){
                  if(zasilanie==true){
                      wygrana=true;
                      koniec=true;
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
  console.log("Akcje do uzupelnienia");


start();