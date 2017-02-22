## Contribute

```
$ git clone https://github.com/wcrichter/persons-api.git
$ cd persons-api
$ npm install
$ npm start
```

---

## Supported HTTP Requests

* ```GET```
* ```POST```
* ```DELETE```
* ```PUT```

---

## Endpoints


### `GET /persons/:id`

Returns a JSON object representing a person for a given person id.

#### Parameters

- `id` - The primary key of the person to retrieve.

#### Example Call

```
GET /persons/person_david_puddy_david@greasemonkey.com
```

Example Response (Success):
```
{
  "_id": "person_david_puddy_david@greasemonkey.com",
  "_rev": "3-3a94a40198e67b8d67909e6aa156ec70",
  "firstName": "David",
  "lastName": "Puddy",
  "email": "david@greasemonkey.com",
  "type": "person"
}
```

Example Response (Error):
```
{
  "error": "not_found",
  "reason": "missing",
  "name": "not_found",
  "status": 404,
  "message": "missing"
}
```



### `POST /persons`

Adds a JSON object representing a person with specified keys and values.

#### Parameters

- `doc` - The document of the person to add to the data.

#### Example Call

```
POST /persons
```

Body:
```
{
  "_id": "person_frank_costanza_frank@serenitynow.com",
  "firstName": "Frank",
  "lastName": "Costanza",
  "email": "frank@serenitynow.com",
  "type": "person"
}
```

Example Response (Success):
```
{
  "ok": true,
  "id": "person_frank_costanza_frank@serenitynow.com",
  "rev": "1-b052be6014e8625f93649d10c5d090e4"
}
```

Example Response (Error):
```
{
  "error": "conflict",
  "reason": "Document update conflict.",
  "name": "conflict",
  "status": 409,
  "message": "Document update conflict."
}
```



### `DELETE /persons/:id`

Delete a JSON object representing a person with a given id.

#### Parameters

- `id` - The id of the person to delete from the database.

#### Example Call

```
DELETE /persons/person_frank_costanza_frank@serenitynow.com
```

Body:
```
{
  "_id": "person_frank_costanza_frank@serenitynow.com",
  "firstName": "Frank",
  "lastName": "Costanza",
  "email": "frank@serenitynow.com",
  "type": "person"
}
```

Example Response (Success):
```
{
  "ok": true,
  "id": "person_frank_costanza_frank@serenitynow.com",
  "rev": "2-34783470fb39a24b6581849403caa7b5"
}
```

Example Response (Error):
```
{
  "name": "not_found",
  "status": 404,
  "message": "deleted",
  "reason": "deleted",
  "error": "not_found"
}
```



### `POST /persons`

Adds a JSON object representing a person with specified keys and values.

#### Parameters

- `doc` - The document of the person to add to the data.

#### Example Call

```
POST /persons
```

Body:
```
{
  "_id": "person_frank_costanza_frank@serenitynow.com",
  "firstName": "Frank",
  "lastName": "Costanza",
  "email": "frank@serenitynow.com",
  "type": "person"
}
```

Example Response (Success):
```
{
  "ok": true,
  "id": "person_frank_costanza_frank@serenitynow.com",
  "rev": "1-b052be6014e8625f93649d10c5d090e4"
}
```

Example Response (Error):
```
{
  "error": "conflict",
  "reason": "Document update conflict.",
  "name": "conflict",
  "status": 409,
  "message": "Document update conflict."
}
```



### `POST /persons/:id`

Update a JSON object (representing a person) with a new JSON object with a given id.

#### Parameters

- `id` - The id of the person to update from the database.

#### Example Call

```
DELETE /persons/person_elaine_bennis_elaine@petermancatalog.com
```

Body:
```
{
	"_id": "person_elaine_bennis_elaine@petermancatalog.com",
	"_rev": "3-ab7eef2f9976fd1a6c37743f6ac3fa59",
	"firstName": "Elaine",
	"lastName": "Bennis",
	"email": "elaine@gmail.com",
	"type": "person"
}
```
*This new object body updates the email value from elaine@petermancatalog.com to elaine@gmail.com*

Example Response (Success):
```
{
  "ok": true,
  "id": "person_elaine_bennis_elaine@petermancatalog.com",
  "rev": "4-918291f0b62f9941a55c1178ddb44d09"
}
```

Example Response (Error):
```
{
  "name": "conflict",
  "status": 409,
  "message": "Document update conflict.",
  "reason": "Document update conflict.",
  "error": "conflict"
}
```


    
### `GET /persons`

Returns a JSON object containing all 'person' documents from the database.

#### Parameters

- `id` - The id of the person to update from the database.

#### Example Call

```
GET /persons
```

Example Response (Success):
```
[
  {
    "_id": "person_bob_saccamano_bob@kramerssketchyfriend.com",
    "_rev": "1-3b4b0fa77d27c252f20fb36dc9ecae5c",
    "firstName": "Bob",
    "lastName": "Saccamano",
    "email": "bob@kramerssketchyfriend.com",
    "type": "person"
  },
  {
    "_id": "person_chris_richter_wcrichter@gmail.com",
    "_rev": "5-56a069d8a3d0a6f36ebe09641a377b0a",
    "firstName": "Chris",
    "lastName": "Richter",
    "email": "wcrichter@gmail.com",
    "type": "person"
  },
  {
    "_id": "person_david_puddy_david@greasemonkey.com",
    "_rev": "3-3a94a40198e67b8d67909e6aa156ec70",
    "firstName": "David",
    "lastName": "Puddy",
    "email": "david@greasemonkey.com",
    "type": "person"
  },
  {
    "_id": "person_elaine_bennis_elaine@petermancatalog.com",
    "_rev": "4-918291f0b62f9941a55c1178ddb44d09",
    "firstName": "Elaine",
    "lastName": "Bennis",
    "email": "elaine@gmail.com",
    "type": "person"
  },

]
```

Example Response (Error):
```
Cannot GET /people
```
