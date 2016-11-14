# UintiSaeae

PROJEKTISUUNNITELMA

1. Johdanto	

UitiSaeae-palvelu toteutetaan kurssin TIE-23600 palvelupohjaiset järjestelmät harjoitustyönä. Palvelu yhdistää pintavesien laatutietoja ja säätietoja tarjoten palvelun käyttäjälle tiedon siitä milloin ja minne kannattaa suunnata uimaan.

2. Projektin tavoitteet, rajaus ja tulokset

Projektin tavoitteena on luoda uusi rajapinta, joka yhdistelee olemassa olevien rajapintojen tietoja luoden lisäarvoa käyttäjille. Luodulle rajapinnalle on myös tarkoitus kehittää minimalistinen palvelu, jonka avulla käyttäjä voi hyödyntää rajapinnan tietoja ja suunnitella uimaretkensä tehokkaasti.

3. Rajapinnat

Yhdistettäviksi rajapinnoiksi valittiin: Suomen ympäristökeskuksen pintaveden laatutietojen rajapinta ja Ilmatieteen laitoksen perussääpalvelu-rajapinta. Uimarantojen sijaintitiedot haetaan mahdollisuuksien mukaan Suomen ympäristökeskukselta (Uimavesidirektiivin mukaiset uimavedet). Jos kyseinen INSPIRE-karttarajapinta ei inspiroi, tarjotaan kovakoodattuna vain Tampereen kaupungin uimarannat. Tieto siitä, mikä pintavesistö tarjoaa uimarannan voidaan myös jättää pois, jolloin kyseisessä vesistössä räpiköinnin mielekkyyden arviointi jää käyttäjän harteille.

Aikataulun salliessa luotavaan rajapintaan on myös tarkoitus lisätä tiedot Tampereen soutuvenerannoista.

4. Teknologiat ja työkalut

Palvelun alustana käytetään Google App Engineä tai mahdollisesti Amazon Web Servicejä, riippuen siitä kumpaan saadaan käyttöoikeus ensin. Sovellus kehitetään käyttäen MEAN-stackia, eli MongoDB:tä, Expressiä, Angularia ja Node.js:ää. Kehityksessä käytetään JetBrainsin IDEjä opiskelijalisenssillä.

5. Aikataulu

Projektisuunnitelman ensimmäinen versio on valmis 14.11.2016 ja projekti kokonaisuudessaan valmistuu 4.12. mennessä.


