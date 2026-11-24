# Ucieczka z serwerowni

Tekstowa gra przygodowa uruchamiana bezpośrednio w konsoli przeglądarki. Twoim celem jest wydostanie się z zamkniętego budynku, zanim wyczerpie się zasilanie awaryjne (masz na to maksymalnie **12 ruchów/akcji**).

---

## Jak uruchomić grę?


1. Pobierz wszystkie pliki projektu do jednego folderu (upewnij się, że `index.html`, `engine.js`, `appt.js` oraz plik dźwiękowy `MJ.mp3` znajdują się obok siebie).
2. Kliknij dwukrotnie plik **`index.html`**, aby otworzyć go w przeglądarce.
3. Otwórz narzędzia deweloperskie przeglądarki (wciśnij **`F12`** lub **`Ctrl + Shift + I`**) i przejdź do zakładki **Console (Konsola)**.
4. Gra uruchamia się automatycznie i wyświetla listę komend.

---

## Jak grać i dostępne komendy

Wszystkie polecenia wpisujesz w konsoli przeglądarki, korzystając z obiektu `gra`. Każda udana akcja lub zmiana pokoju zużywa **1 punkt energii**. Błędne komendy lub próba wejścia w ścianę nie zabierają energii.

### Poruszanie się i otoczenie
* `gra.idz('prawo')` – przejście do kolejnego pomieszczenia.
* `gra.idz('lewo')` – przejście do poprzedniego pomieszczenia.
* `gra.rozejrzyj()` – dokładny opis obecnego pokoju i dostępnych przedmiotów.
* `gra.mapa()` – wyświetla układ pomieszczeń i Twoją aktualną pozycję.
* `gra.status()` – pokazuje poziom energii, zebrane przedmioty oraz stan zasilania i drzwi.
* `gra.pomoc()` – wyświetla listę wszystkich komend.
* `gra.reset()` – zaczyna rozgrywkę od nowa (przywraca stan początkowy).

### Akcje i przedmioty
* `gra.wezKlucz()` – podnosi klucz do magazynu (dostępny w *Składziku*).
* `gra.wezKarte()` – podnosi kartę dostępu (dostępna w *Recepcji*).
* `gra.odblokujMagazyn()` – otwiera drzwi do magazynu za pomocą klucza (trzeba stać w *Recepcji*).
* `gra.wezBezpiecznik()` – zabiera zapasowy bezpiecznik (dostępny w otwartym *Magazynie*).
* `gra.wezKaucje()` – zabiera dwa tajemnicze worki z kaucją (opcjonalny sekret w *Magazynie*).
* `gra.napraw()` – montuje bezpiecznik i przywraca prąd (w *Serwerowni*).
* `gra.wyjdz()` – otwiera drzwi wyjściowe i kończy grę (wymaga karty i włączonego zasilania przy *Wyjściu*).

---

## Zapisywanie i wczytywanie postępu (Eksport / Import)

Gra nie zapisuje postępu automatycznie w pamięci przeglądarki (`localStorage`). Zapis odbywa się poprzez ręczne wygenerowanie i skopiowanie tekstu w formacie JSON.

### Jak zapisać grę (Eksport):
1. W trakcie rozgrywki wpisz w konsoli:
   ```javascript
   console.log(gra.eksportuj())
   ```
2. W konsoli pojawi się ciąg znaków zaczynający się od `{"wersja":3,"stan":{...}}`.
3. Zaznacz i skopiuj **sam tekst JSON** (bez ewentualnych dodatkowych znaków czy słowa `undefined` z konsoli).
4. Wklej skopiowany tekst do zwykłego edytora tekstu (np. Notatnika) i zapisz plik na dysku jako np. `postep.json`.

### Jak wczytać grę (Import):
1. Otwórz swój zapisany plik `postep.json` w edytorze tekstu i skopiuj całą jego zawartość (`Ctrl + A`, potem `Ctrl + C`).
2. Wróć do przeglądarki z uruchomioną grą i wpisz w konsoli:
   ```javascript
   gra.importuj(prompt("Wklej JSON z pliku postep.json"))
   ```
3. Na górze ekranu wyskoczy okienko przeglądarki. Wklej do niego skopiowany tekst JSON (bez dodawania własnych cudzysłowów na zewnątrz) i kliknij **OK**.
4. Jeśli zapis jest poprawny, konsola wyświetli komunikat `Wczytano zapis.` oraz aktualny status gry. W przypadku błędu lub kliknięcia *Anuluj*, gra odrzuci zapis i zachowa dotychczasowy stan.

---

## Architektura projektu
* `index.html` – szkielet strony ładujący skrypty w odpowiedniej kolejności.
* `engine.js` – czysta logika gry: definicja mapy, stan początkowy, walidator poprawności stanu (`czyStan`) oraz bezstanowa funkcja reguł (`przejscie`).
* `appt.js` – warstwa interfejsu konsolowego, obsługa dźwięku, API `window.gra` oraz funkcje `eksportuj` i `importuj`.