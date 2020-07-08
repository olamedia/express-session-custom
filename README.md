# connect-session-custom

Works as Express/Connect middleware

Provides the following  contracts to make own implementation for each part. 
* `CookieEncoder` Encoding, decoding cookie value, can be used for signing. 
<br />Default implementation passes value untouched in both sides. 
* `CookieHandler` Gets, sets cookie with given options
* `IdGenerator` Generates unique session ID
<br/>Default implementation uses `uid-safe` package
* `SessionStore` Store for session data

###Minimal setup
Only use for debug since default `SessionStore` keeps data in memory and will lose them at each script reload  
```js
app.use(session());
```

###Basic syntax
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

###Customization
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

###License
MIT
