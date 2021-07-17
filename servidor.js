/*Estoy en la carpeta trabajador nuevo*/
const express = require('express');

const bodyparse = require('body-parser');

const bcrypt = require('bcrypt-nodejs');

const cors = require('cors');

const knex = require('knex');

const registro = require('./controles/registro');
const ingresar = require('./controles/ingresar');
const perfil = require('./controles/perfil');
const imagen = require('./controles/imagen');


/*const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1', //es lo mismo que localhost
        user: 'postgres',
        password: 'admin',
        database: 'cerebro_inteligente'
    }
});*/

const db = knex({
    client: 'pg',
    connectionString: {
        host: process.env.DATABASE_URL, // La varibale de enterno DATABASE_URL se configura automaticamente en heroku
        ssl:true,

    }
});


const app = express();

app.use(bodyparse.json());

app.use(cors());


app.get('/', (req, res) => {

    res.send('La Raiz Esta Trabajano');

});

//app.post('/ingresar', (req,resp)=>{ingresar.manejoingresar(req,resp,db,bcrypt,)});

app.post('/ingresar', ingresar.manejoingresar(db,bcrypt)); //Otra manera de hacerlo

app.post('/registrarse',(req,res) => {registro.manejaregistro(req,res,db,bcrypt)});


app.get('/perfil/:id',(req,res)=>{perfil.manejoperfil(req,res,db)});

app.put('/imagen', (req,res)=>{imagen.imagenmanejo(req,res,db)});
app.post('/imagenurl', (req,res)=>{imagen.manejollamadaap(req,res)});


app.listen(process.env.PORT || 3000, () => {
    console.log(`La app se esta ejucutando en el puerto ${process.env.PORT}`);
});

