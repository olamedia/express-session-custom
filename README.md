# WIP
work in progress

# connect-session

Works as Express/Connect middleware

Provides the following  contracts to make own implementation for each part. 
* `CookieEncoder` Encoding, decoding cookie value, can be used for signing
* `CookieHandler` Gets, sets cookie with given options
* `IdGenerator` Generates unique session ID
* `SessionStore` Store for session data

> `SessionStore` interface will change later

Minimal setup, not good at the moment since default `SessionStore` keeps data in memory and will lose them at each script reload  
```js
app.use(session());
```

Basic syntax is similar to `express-session` package. 
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

Customization
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
