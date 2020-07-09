# express-session-custom

Works as Express/Connect middleware<br />
The purpose of this library is the customization of every step.
> If you need everything ready, use express-session instead.

Provides the following  contracts to make own implementation for each part.
* `CookieEncoder` Encoding, decoding cookie value, can be used for signing. 
<br />Default implementation passes value untouched in both sides. 
* `CookieHandler` Gets, sets cookie with given options
* `IdGenerator` Generates unique session ID
<br/>Default implementation uses `uid-safe` package
* `SessionStore` Store for session data

### Possible use cases 
* to have the same session in different languages
* having a backend which generates session IDs itself
 
### Installation

```shell script
npm install --save express-session-custom
```
OR
```shell script
yarn add express-session-custom
```

### Minimal setup
Only use for debug since default `SessionStore` keeps data in memory and will lose them at each script reload  
```js
app.use(session());
```

### Basic syntax
Similar to `express-session` package. 
The notable difference is that `name` moved to `cookie` options

```js
app.use(
    session({
        cookie: {
            name: "id",
            path: "/",
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000,
        },
    }),
);
```

### Customization
Example code for each implementation can be found in `stubs/` folder.
```js
app.use(
    session({
        cookie: {
            name: "id",
        },
        cookieHandler: MyCookieHandler(),
        cookieEncoder: MyCookieEncoder(),
        idGenerator: MyIdGenerator(),
        store: MyStore() 
    }),
);
```

### License
MIT
