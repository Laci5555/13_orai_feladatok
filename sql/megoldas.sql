2. select nev, cim, oldal from konyvek inner join irok on iro = az order by oldal desc limit 1;
3. delete from konyvek where kaz = 8;
4. update irok set nev="József Attila" where az=1;
5. insert into irok set nev="Gárdonyi Géza", szuletett=1863, meghalt=1922;
   insert into konyvek set iro=(select az from irok where nev="Gárdonyi Géza"), cim="Egri csillagok", ev=1899, oldal=632;
6. select nev, count(cim) as db from irok inner join konyvek on iro=az group by nev order by db;
7. delete from irok where nev="Petőfi Sándor"
   delete from konyvek where iro = (select az from irok where nev="Petőfi Sándor");
   delete from irok where nev="Petőfi Sándor";
8. update irok set meghalt=1942 where az=2;
9. delete from konyvek where oldal < 100;
   select nev, count(cim) as db from irok inner join konyvek on iro=az group by nev order by db;
