const { request, response } = require("express");
const pool = require("../db/connection");
const modeloGuerreros = require("../models/guerreros");

const getSpirits = async (req = request, res = response) =>{
    
    
    let conn;
    
    try {
        conn = await pool.getConnection()
        
        const users = await conn.query(modeloGuerreros.queryGetSpirits, (error) => {throw new Error(error) })
        
        if (!users) {
            res.status(404).json({msg:"No se encontraron registros"})
            return
        }
        res.json({users})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

const getSpiritsByID = async (req = request, res = response) =>{
    
    const {id} = req.params
    let conn;
    
    try {
        conn = await pool.getConnection()
        
        const [user] = await conn.query(modeloGuerreros.querygetSpiritsByID, [id], (error) => {throw new Error(error) })
        
        if (!user) {
            res.status(404).json({msg: `No se encontró registro con el ID ${id}`})
            return
        }
        res.json({user})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

const deleteSpiritsByID = async (req = request, res = response) =>{
    
    const {id} = req.query
    let conn;
    
    try {
        conn = await pool.getConnection()
       
        const {affectedRows} = await conn.query(modeloGuerreros.querydeleteSpiritsByID, [id], (error) => {throw new Error(error) })
       
        if (!affectedRows === 0) {
            res.status(404).json({msg: `No se pudo eliminar el registro con el ID ${id}`})
            return
        }
 
        res.json({msg: `El guerrero con ID ${id} se eliminó sastifactoriamente. `})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

const addSpirits = async (req = request, res = response) =>{
    
    const {
        Usuario_Elegido,
        Nombre_del_guerrero,
        Elemento_del_guerrero,
        Habilidad_del_guerrero,
        Espiritu_bestia_del_guerrero,
        Genero,
        Activo
    } = req.body

    if (
        !Usuario_Elegido ||
        !Nombre_del_guerrero ||
        !Elemento_del_guerrero ||
        !Habilidad_del_guerrero ||
        !Espiritu_bestia_del_guerrero ||
        !Genero ||
        !Activo
    ){
        res.status(400).json({msg: "Falta información del guerrero"})
        return
    }

    let conn;
    
    try {
        conn = await pool.getConnection()
        

        const [user] = await conn.query(modeloGuerreros.querySpiritsExists, [Usuario_Elegido])

        if (user) {
            res.status(403).json({msg: `El guerrero ${Usuario_Elegido} ya se encuentra registrado.`})
            return
        }

        const {affectedRows} = await conn.query(modeloGuerreros.queryaddSpirits, 
        [Usuario_Elegido,
        Nombre_del_guerrero,
        Elemento_del_guerrero,
        Habilidad_del_guerrero,
        Espiritu_bestia_del_guerrero,
        Genero,
        Activo
    ], (error) => {throw new Error(error) })
        
        if (!affectedRows === 0) {
            res.status(404).json({msg: `No se pudo agregar el registro del guerrero ${Usuario_Elegido}`})
            return
        }
 
        res.json({msg: `El guerrero ${Usuario_Elegido} se agrego sastifactoriamente. `})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

const updateSpiritsByUsuario = async (req = request, res = response) =>{
    
    const {
        Usuario_Elegido,
        Nombre_del_guerrero,
        Elemento_del_guerrero,
        Habilidad_del_guerrero,
        Espiritu_bestia_del_guerrero,
        Genero
        
    } = req.body

    if (
        !Usuario_Elegido ||
        !Nombre_del_guerrero ||
        !Elemento_del_guerrero ||
        !Habilidad_del_guerrero ||
        !Espiritu_bestia_del_guerrero 

    ) {
        res.status(400).json({msg: "Falta información del guerrero"})
        return
    }

    let conn;
    
    try {
        conn = await pool.getConnection()
        

        const [user] = await conn.query(modeloGuerreros.queryGetSpiritsInfo, [Usuario_Elegido])
        
        if (!user) {
            res.status(403).json({msg: `El guerrero ${Usuario_Elegido} no se encuentra registrado.`})
            return
        }
         
        const {affectedRows} = await conn.query(modeloGuerreros.queryUpdateBySpirits,
            [
            Nombre_del_guerrero || user.Nombre_del_guerrero,
            Elemento_del_guerrero || user.Elemento_del_guerrero,
            Habilidad_del_guerrero || user.Habilidad_del_guerrero,
            Espiritu_bestia_del_guerrero || user.Espiritu_bestia_del_guerrero,
            Genero || user.Genero,
            Usuario_Elegido
           
            ], (error) => {throw new Error(error) })
        
        if (!affectedRows === 0) {
            res.status(404).json({msg: `No se pudo agregar el registro del Guerrero ${Usuario_Elegido}`})
            return
        }
 
        res.json({msg: `El guerrero ${Usuario_Elegido} se actualizó sastifactoriamente. `})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}


module.exports = {getSpirits, getSpiritsByID, deleteSpiritsByID ,addSpirits, updateSpiritsByUsuario}