# liga-app
##TODO
6) Значки капитанов
7) Страница с призами
## Authorization
```
http://mirexda2.beget.tech/get/login/
```
### Parameter

| Field         | Type            | Description   |
| ------------- | :-------------: | -----: |
| login    | string   | User's login  | 
| password      | login        |   User's password   |


## Add match

```
* only for authorized
http://mirexda2.beget.tech/post/match/
```
### Parameter

| Field         | Type            | Description   | Value   |
| ------------- | :-------------: | -----: | -----: |
| action    | string   |   |    add |
| player_1      | number   | first player's id      |     |
| player_2      | number   | second player's id     |     |
| score_1      | number   | first player's score    |     |
| score_2      | number   | second player's score   |     |

## Delete match
```
* only for authorized
http://mirexda2.beget.tech/post/delete/
```
### Parameter
| Field         | Type            | Description   | Value   |
| ------------- | :-------------: | -----: | -----: |
| action    | string   |   |    delete |
| id      | number   | match's id      |     |

## Edit match
```
* only for authorized
http://mirexda2.beget.tech/post/edit/
```
### Parameter
| Field         | Type            | Description   | Value   |
| ------------- | :-------------: | -----: | -----: |
| action    | string   |   |    edit |
| id      | number   | match's id    |     |
| date      | string   | new date ('d-m-Y')    |     |
| score_1      | number   | new first player's score    |     |
| score_2      | number   | new second player's score   |     |
