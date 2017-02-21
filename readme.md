## Contribute

```
$ git clone https://github.com/wcrichter/persons-api.git
$ cd persons-api
$ npm install
$ npm start
```

## Endpoints

### `GET /persons/:id`

Returns a JSON object representing a person for a given person id.

#### Parameters

- `id` - The primary key of the person to retrieve.

#### Example Call

```
GET /persons/person_david_puddy_david@greasemonkey.com
```

Example Response:

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

Example Response:

```
{
  "error": "not_found",
  "reason": "missing",
  "name": "not_found",
  "status": 404,
  "message": "missing"
}
```
