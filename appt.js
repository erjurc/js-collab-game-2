let stan = stanPoczatkowy()
function idz(kierunek) {
	if(koniec == true){
		console.log("koniec?");
		return;
	}
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
	pokoj = nastepnypokoj;
	rozejrzyj();
	zakonczTure();