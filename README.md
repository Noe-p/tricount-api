# tricount-api 

J'ai décidé d'utiliser le framework Nest JS pour réaliser cette API. En effet ce framework est très complet et permet de créer une API rapidement. 

Je me suis aidé de l'outile typeorm pour créer les entités et les requêtes SQL.

Je pense être arrivé à un résultat satisfaisant et fonctionnel. Malheureusement, j'ai désactivé l'option de synchronisation de la base de donnée avec le code.
 Il faudra donc créer la base de donnée à la main (voir plus bas).
De plus je n'ai pas eu le temps de faire les tests unitaires.

## Installation 

Dans votre terminal taper les commandes : 
```bash
git clone git@github.com:Noe-p/tricount-api.git
cd tricount-api 
yarn 
```
x
Dans **src/app.module.ts** modifier les paramètre de votre base sql.
Votre trouver ci dessous le code sql pour créer la base tricount et toutes ses tables : 

```SQL
CREATE DATABASE IF NOT EXISTS tricount;

CREATE TABLE tricount.user
(
    id VARCHAR(50) PRIMARY KEY NOT NULL,
   	lastName VARCHAR(25) NOT NULL, 
    firstName VARCHAR(25) NOT NULL, 
    email VARCHAR(25) NOT NULL
);

CREATE TABLE tricount.category
(
    id VARCHAR(50) PRIMARY KEY NOT NULL,
   	label VARCHAR(50) NOT NULL
);

CREATE TABLE tricount.expense
(
    id VARCHAR(50) PRIMARY KEY NOT NULL,
   	label VARCHAR(40) NOT NULL, 
   	amount VARCHAR(40) NOT NULL, 
   	id_category VARCHAR(50) NOT NULL, 
    id_user VARCHAR(50) NOT NULL, 
    date DATE NOT NULL, 
    FOREIGN KEY (id_category) REFERENCES category (id),
    FOREIGN KEY (id_user) REFERENCES user (id)
);

CREATE TABLE tricount.participant
(
    id VARCHAR(50) PRIMARY KEY NOT NULL,
   	id_expense VARCHAR(50) NOT NULL, 
    id_user VARCHAR(50) NOT NULL, 
    FOREIGN KEY (id_expense) REFERENCES expense (id),
    FOREIGN KEY (id_user) REFERENCES user (id)
)
```

Ensuite dans le projet tricount-api, à la racine taper : 
```bash 
yarn start
```

## Architecture 

J'ai décidé d'utiliser le framework Nest JS. Nous retrouvons donc dans **src** l'achitecture propre à cet outil. 
 - chaque table possède un **entity.ts** qui permet de "typer" l'objet en question. 
 - Un controller qui permet de renvoyer le call sur les bonne routes. 
 - D'un module
 - D'un service qui regroupe toutes les requêtes faites à la base.

## Fonctionnalité 

Chaque entité à donc son CRUD de créer, vous pouvez le retrouver dans chaque **service.ts**. 
Le service **src/expenses/expenses.service.ts** est le plus conséquant de l'application, en effet c'est cet entité qui comporte le plus de fonctionnnalités. 