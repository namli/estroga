
## Usage

Change the *.env.example* to *.env* and add your database info

For MySQL, add
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=estroga
DB_USERNAME=root
DB_PASSWORD=
```

## To run backend

```
composer i  
php artisan migrate
php artisan serve

```

## To run frontend
```
npm i  
npm run dev  

```

## API Routes

```
# Public

GET   /api/delivery/search/{code}

POST   /api/login
@body: email, password

POST   /api/register
@body: name, email, password, password_confirmation


# Protected

GET   /api/delivery/all

POST   /api/delivery/add
@body: code, await_delivery_at, delivery_status

POST    /api/logout
```