const manejoperfil = (req,res)=>{
   
        const { id } = req.params;
    
        //let encontrado = false;
        db.select('*').from('usuarios').where({ id })
            .then(usuario => {
    
                if (usuario.length) {
    
                    res.json(usuario[0]);
    
                } else {
                    res.status(400).json('No Encontrado desde app.get')
                }
    
            }).catch(error => res.status(400).json('Protagonista no Encontrado'));
    
   
}

module.exports ={
    manejoperfil : manejoperfil
};