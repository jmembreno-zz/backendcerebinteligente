

const manejaregistro = (req, res, db, bcrypt) => {

    const { correo, nombre, contrasena } = req.body


    //if (correo === "" || nombre === "" || contrasena === "") { --| Este tambien funciona
    if (!correo || !nombre || !contrasena) {

       return res.status(400).json('Datos Incomomplets');


    }

    const hash = bcrypt.hashSync(contrasena);

    db.transaction(trx => {

        trx.insert({
            hash: hash,
            correo: correo,
        }).into('ingreso')
            .returning('correo')
            .then(login_correo => {

                return db('usuarios')
                    .returning('*') //Aunque retorna * ose aun arreglo ,  esto no quiere decir que retorna todos los datos de la tabla 
                    .insert({
                        correo: login_correo[0],
                        nombre: nombre,
                        se_unio: new Date()
                    })
                    .then(usuarios => {
                        res.json(usuarios[0]); //Aunque genera un arreglo este siempre retorna solo el registro recien ingresado en la tabla usuarios
                    })



            })

            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch(err => res.status(400).json('No se Pudo Registrar problemas con bd de postgres'));



}

module.exports = {
    manejaregistro: manejaregistro
};