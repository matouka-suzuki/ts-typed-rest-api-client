# Typed REST API Client

This is an Axios wrapper.

## Motivation

Wanted to have good code completions for queries, headers and responses for calling REST APIs in TypeScript.

## Usage

Extend `Request` class and override paths, method and queries.
Then you can call APIs like below.

```
let r = new GetUser({identifier: xxx}, {"x-some-header": aaa})
r.call().then(resp => {
  // resp is typed with GetUser definition.
}).catch(e => {
 // error 
})
```

## Lisence
MIT