# liga-app

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
