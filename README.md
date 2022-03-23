# Basic server with authentication

- apollo-server-express
- typescript
- typeorm
- express-session
- bcryptjs

---

1. set up database settings in `ormconfig.json`
2. yarn
3. yarn start
4. configure apollo studio
    - update connection settings to include cookies
    - add default header `x-forwarded-proto: https`
