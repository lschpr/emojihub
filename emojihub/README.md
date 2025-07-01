Wat is dit?

Dit is een EmojiHub waar je elke emoji kan vinden, zoeken + sorteren. Je kan ook een emoji toevoegen aan je favorieten  die laat hij dan zien aan de bovenkant. Als je op de emoji klikt zie je een detailpagina en de Naam, Categorie, Unicode, HTML-code en je kan de Emoji kopieren van de emoji.

Hoe werkt het?

Gebruik de zoekbalk of filter op categorieën om snel een emoji te vinden.
Klik op een emoji voor de detailpagina met uitgebreide informatie.
Voeg emoji’s toe aan je favorieten (deze verschijnen bovenaan de lijst).
Emoji’s worden automatisch opgeslagen in je browser (localStorage).
Ondersteunt zowel desktop als mobiel, met een lichte en donkere modus.

Features

- Op de home pagina worden alle emojis getoond en als je naar beneden scrollt zie je de emoji categorieen
- Vue met vite project.
- roept alles netjes aan van de API EmojiHub door Axios
- Favorieten systeem + wordt opgeslagen in local storage.
- Detail pagina voor elke emoji.
- Zoekbalk.
- Categorieen.
- Emoji kan worden gekopieerd.
- Emoji kan worden toegevoegd aan/uit favorieten.
- Emoji kan worden gezocht.
- Emoji wordt getoond op categorieen.
- Donker/ Licht modus
- Support zowel desktop als mobiel
- Categorieen pagina
- Willekeurige Emoji
- Emoji Detail pagina met Naam, Categorie, , Groep, Unicode, HTML-code en kopieer functie

Packages/Plugins

Vue 	        3.5.17
Vite	        7.0.0
TypeScript	    5.8.3
Vue Router	    4.5.1
Axios	        1.10.0
Tailwind CSS	3.4.1
vue-tsc	        2.2.10

API

De emoji’s worden opgehaald via de EmojiHub API, inclusief:
GET /all
GET /random

GET /all/category/{category-name}
GET /all/group/{group-name}
worden client side opgeroepen
