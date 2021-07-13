const manejoingresar = (db, bcrypt) => (req, res) => {

    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {

        return res.staturs(400).json('Datos Incorrectos');

    }

    db.select('correo', 'hash').from('ingreso')
        .where('correo', '=', correo)
        .then(data => {


            const esvalido = bcrypt.compareSync(contrasena, data[0].hash); // false


            if (esvalido) {
                return db.select('*').from('usuarios')
                    .where('correo', '=', correo)
                    .then(usuario => {

                        res.json(usuario[0]);
                    })
                    .catch(err => res.status(400).json('No se pudeo Ingresar Conpruebe login y contraseña'))

            } else {

                res.status(400).json('Credenciales Incorrectas');

            }




        })
        .catch(err => res.status(400).json('Credenciales Incorrectas'));


}

module.exports = {
    manejoingresar: manejoingresar
};