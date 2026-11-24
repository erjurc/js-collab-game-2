# Próby odbioru

| Wymaganie | Stan początkowy | Działanie | Wynik oczekiwany | Wynik faktyczny | Kto sprawdził |
|---|---|---|---|---|---|
| Zwykła ścieżka (wygrana) | Start gry (Pokój 2, Energia 12) | `idz('lewo')` -> `wezKlucz()` -> `idz('prawo')` -> `wezKarte()` -> `odblokujMagazyn()` -> `idz('prawo')` -> `wezBezpiecznik()` -> `idz('prawo')` -> `napraw()` -> `idz('prawo')` -> `wyjdz()` | Wygrana po 11 akcjach, pozostała 1 energia, `wygrana: true`, `koniec: true` | Wygrana po 11 akcjach, pozostała 1 energia, `wygrana: true`, `koniec: true` | Miłosz Jastrzębski |
| Granica (brak energii) | Start gry (Energia 12) | Wykonywanie 12 poprawnych ruchów tam i z powrotem (`idz('lewo')`, `idz('prawo')`) | Po 12. ruchu energia spada do 0, komunikat o przegranej, `koniec: true`, blokada dalszych ruchów | Po 12. ruchu energia spadła do 0, komunikat o przegranej, `koniec: true`, blokada dalszych ruchów | Miłosz Jastrzębski |
| Błędne wejście (ściana i brak klucza) | Start gry (Pokój 2, Energia 12) | 1. `gra.idz('prawo')` (próba wejścia do zamkniętego magazynu)<br>2. `gra.idz('nieznany')` | Odmowa wejścia, komunikat o zamkniętych drzwiach / błędnej komendzie, energia nadal wynosi 12 | Odmowa wejścia, komunikat o zamkniętych drzwiach / błędnej komendzie, energia nadal wynosi 12 | Miłosz Jastrzębski |
| Zachowanie po błędzie (błędny import) | Dowolny stan w trakcie gry (np. Pokój 1, Energia 10, `klucz: true`) | 1. `gra.status()`<br>2. `gra.importuj("{urwany_json")` oraz `gra.importuj(null)`<br>3. `gra.status()` | Komunikat o błędzie wczytywania, zwraca `false`. Stan gry po próbie identyczny jak przed próbą | Komunikat o błędzie wczytywania, zwróciło `false`. Stan gry po próbie identyczny jak przed próbą | Miłosz Jastrzębski |
| Walidacja wersji i stanu | Start gry | `gra.importuj('{"wersja":99,"stan":{"pokoj":2,"energia":12}}')` oraz próba z `energia: "duzo"` | Odmowa (`Niepoprawny zapis.`), zwraca `false`, brak nadpisania aktualnego stanu | Odmowa (`Niepoprawny zapis.`), zwróciło `false`, brak nadpisania aktualnego stanu | Miłosz Jastrzębski |
| Regresja (oddzielne instancje stanu) | Świeżo otwarta strona | W konsoli: `const a = stanPoczatkowy(); const b = stanPoczatkowy(); a.energia = 5; console.log(b.energia);` | Wynik w konsoli to `12` (zmiana jednego obiektu nie modyfikuje drugiego) | Wynik w konsoli to `12` (zmiana jednego obiektu nie modyfikuje drugiego) | Miłosz Jastrzębski |
| Rozszerzenie (kaucja) | Gracz w Magazynie (Pokój 3, magazyn odblokowany) | `gra.wezKaucje()` a następnie wygrana gry | Odtwarza się dźwięk `MJ.mp3`, `kaucja: true`, na końcu gry dodatkowy komunikat dla "Kaucjusza" | Odtworzył się dźwięk `MJ.mp3`, `kaucja: true`, na końcu gry dodatkowy komunikat dla "Kaucjusza" | Miłosz Jastrzębski |

## Odtworzenie

* **Wersja Node:** Nie dotyczy (uruchamiane bezpośrednio w przeglądarce)
* **Wersje pakietów / lockfile:** Brak (czysty JavaScript / Vanilla JS)
* **Komendy:** Brak komend budujących; otwarcie pliku `index.html` dwuklikiem i interakcja przez konsolę deweloperską (F12)
* **System i przeglądarka:** Windows 10/11, Google Chrome / Microsoft Edge

## Błąd do poprawy

Brak błędów. Wszystkie testy zakończyły się wynikiem pozytywnym.