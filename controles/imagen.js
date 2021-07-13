const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '189704a3d65247078423ecd7808dff0e'
});


const manejollamadaap = (req, res) => {

    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data =>{
            res.json(data);
        })
        .catch(err => res.status(400).json('Problemas al trabajar con el Api Clarifai'))

}


const imagenmanejo = (req, res, db) => {

    const { id } = req.body;

    db('usuarios').where('id', '=', id)
        .increment('entradas', 1)
        .returning('entradas').
        then(entradas => {

            res.json(entradas[0]);
        })
        .catch(err => res.status(400).json('Incapaz De Contar'));

}

module.exports = {
    imagenmanejo: imagenmanejo,
    manejollamadaap : manejollamadaap
}