# bead dokumentáció

#####1. Követelményanalízis
######Funkcionális elvárások:
A program lehetővé teszi a vendégfelhasználónak:
- A főoldal megtekintését
- A leírás megtekintését
- A regisztrációt

Ezenfelül a regisztrált felhasználók számára még:
- Az új névjegyek létrehozását
- Létező névjegyek módosítását
- Létező névjegyek törlését
- Névjegyek listázását

######Nem funkcionális elvárások:
- Ergonomikus felület
- Biztonsági funkciók (jelszavak, hozzáférés)

######Használatieset-modell
Szerepkörök:
- Vendég: láthatja a kezdőoldalt, a leírást és regisztrálhat
- Felhasználó: Új névjegyeket tud hozzáadni, törölni és módosítani a létezőket.

Használatieset-diagram:
![alt text](https://scontent-vie1-1.xx.fbcdn.net/hphotos-xap1/v/t34.0-12/12283148_1166532240041165_846462079_n.jpg?oh=15c1e01badd06e1a7141bfec65b6e0df&oe=565792DA "Use cases")

Névjegy hozzáadásának folyamata:

![alt text](https://scontent-vie1-1.xx.fbcdn.net/hphotos-xat1/v/t34.0-12/12273102_1166534983374224_1802894504_n.jpg?oh=fa6cbb119f20e4e544b450a048917f51&oe=56567728 "UML diagram for creating new entry")

- Oldaltérkép
    
+ Publikus:

	- Főoldal
	- Listázás
	- Hozzáadás
	- Bejelentkezés

+ Felhasználó számára elérhető:

	- Főoldal
	- Hozzáadás
	- Bejelentkezés/Kijelentkezés
	- Névjegyek listája
		+ Névjegyek módosítása
		+ Névjegyek törlése

- Végpontok


		GET /: főoldal
		GET /about: leírás
		GET /login: bejelentkezés
		POST /login: bejelentkezési adatok küldése
		GET /login/signup: regisztáció
		POST /login/signup: regisztrációs adatok küldése
		GET /list: névjegyek listázása
		GET /add: új névjegy
		POST /add: új névjegy, adatok küldése
		GET /edit/:id : névjegy szerkesztése
		POST /edit/:id : megváltoztatott adatok küldése
		GET /delete/:id : névjegy törlése

2. Felhasználóifelület-modell
    - Oldalvázlat
    ![Névjegyek listázása](https://scontent-vie1-1.xx.fbcdn.net/hphotos-xtf1/v/t35.0-12/12298015_1166537733373949_373968193_o.jpg?oh=105a0036f5f2ae0b0f92f981775582dd&oe=5656568A)

3. Osztálymodell
    - Adatmodell
    
        ![Adatmodell](https://scontent-vie1-1.xx.fbcdn.net/hphotos-xlt1/v/t34.0-12/12308912_1166540563373666_210096047_n.jpg?oh=7868fd3a6a168938461c2a760f1d3264&oe=5656852A)

    - Adatbázisterv
    
        ![Adatbázisterv](https://github.com/pamuaai/beadando/blob/master/DatabaseModel.JPG?raw=true)
        
##Implementáció
1. Fejlesztői környezet bemutatása
    Cloud 9 webes IDE, ahova Github accounttal való belépés után új workspacet hozhatunk létre (new workspace). Itt egy fájlt futtathatunk például a webes terminálablakból, a node fájlnév paranccsal. 
    
2. Könyvtárstruktúrában lévő mappák funkiójának bemutatása
    - models: Modellek definiálása, adatok és feldolgozási logika
    - views: A kimenetért felelős rész, vagyis az egyes oldalak szerkezetét, kinézetét adja meg

##Felhasználói dokumentáció
1. Környezet
    - A weboldal futtatásához ajánlott telepített Internet Explorer, Mozilla Firefox, Google Chrome böngésző, ha van rá mód a legfrisebb verzióban.
    - Fontos, hogy NoScript vagy hasonló plugint mely blokkolná az oldalon megjelenő scripteket, kapcsoljuk ki vagy az oldalt adjuk hozzá a kivételek listájához. Enélkül nem használható az oldal(mivel nagyrésze javascriptből épül fel).
2. Minimális gépigény
    - CPU: Intel Core 2 Duo 2,16 GHz , AMD Athlon2 340 X2 
    - Memória: 2 GB DDR3
    - HDD: 1 GB
