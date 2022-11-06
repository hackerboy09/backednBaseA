const { request, response } = require("express");
const bcryptjs = require("bcryptjs")
const pool = require("../db/connection");
const modeloUsuarios = require("../models/usuarios");

const getUsers = async (req = request, res = response) =>{
    
    
    let conn;
    
    try {
        conn = await pool.getConnection()
        
        const users = await conn.query(modeloUsuarios.queryGetUsers, (error) => {throw new Error(error) })
        
        if (!users) {
            res.status(404).json({msg:"no se encontraron registros"})
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

const getUserByID = async (req = request, res = response) =>{
    
    const {id} = req.params
    let conn;
    
    try {
        conn = await pool.getConnection()
        
        const [user] = await conn.query(modeloUsuarios.querygetUserByID, [id], (error) => {throw new Error(error) })
        
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

const deleteUserByID = async (req = request, res = response) =>{
    
    const {id} = req.query
    let conn;
    
    try {
        conn = await pool.getConnection()
       
        const {affectedRows} = await conn.query(modeloUsuarios.querydeleteUserByID, [id], (error) => {throw new Error(error) })
       
        if (!affectedRows === 0) {
            res.status(404).json({msg: `No se pudo eliminar el registro con el ID ${id}`})
            return
        }
 
        res.json({msg: `El usuario con ID ${id} se eliminó sastifactoriamente. `})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

const addUser = async (req = request, res = response) =>{
    
    const {
        Nombre,
        Apellidos,
        Edad,
        Genero,
        Usuario,
        Contrasena,
        Fecha_Nacimiento = '1900-01-01',
        Activo
    } = req.body

    if (
        !Usuario ||
        !Nombre ||
        !Apellidos ||
        !Edad ||
        !Contrasena ||
        !Activo
    ){
        res.status(400).json({msg: "Falta información del usuario"})
        return
    }

    let conn;
    
    try {
        conn = await pool.getConnection()
        

        const [user] = await conn.query(modeloUsuarios.queryUserExists, [Usuario])

        if (user) {
            res.status(403).json({msg: `El usuario ${Usuario} ya se encuentra registrado.`})
            return
        }

        const salt = bcryptjs.genSaltSync()
        const ContrasenaCifrada = bcryptjs.hashSync(Contrasena, salt)

        const {affectedRows} = await conn.query(modeloUsuarios.queryaddUser, 
        [Usuario,
        Nombre,
        Apellidos,
        Edad,
        Genero || '',
        ContrasenaCifrada,
        Fecha_Nacimiento,
        Activo
    ], (error) => {throw new Error(error) })
        
        if (!affectedRows === 0) {
            res.status(404).json({msg: `No se pudo agregar el registro del Usuario ${Usuario}`})
            return
        }
 
        res.json({msg: `El usuario ${Usuario} se agrego sastifactoriamente. `})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

const updateUserByUsuario = async (req = request, res = response) =>{
    
    const {
        Nombre,
        Apellidos,
        Edad,
        Genero,
        Usuario,
        Contrasena,
        Fecha_Nacimiento = '1900-01-01'
        
    } = req.body

    if (
        !Nombre ||
        !Apellidos ||
        !Edad ||
        !Usuario ||
        !Contrasena 

    ) {
        res.status(400).json({msg: "Falta información del usuario"})
        return
    }

    let conn;
    
    try {
        conn = await pool.getConnection()
        

        const [user] = await conn.query(modeloUsuarios.queryGetUserInfo, [Usuario])
        
        if (!user) {
            res.status(403).json({msg: `El usuario ${Usuario} no se encuentra registrado.`})
            return
        }
         
        const {affectedRows} = await conn.query(modeloUsuarios.queryUpdateByUsuario,
            [
            Nombre || user.Nombre,
            Apellidos || user.Apellidos,
            Edad  || user.Edad,
            Genero  || user.Genero,
            Fecha_Nacimiento,
            Usuario
            ], (error) => {throw new Error(error) })
        
        if (!affectedRows === 0) {
            res.status(404).json({msg: `No se pudo agregar el registro del Usuario ${Usuario}`})
            return
        }
 
        res.json({msg: `El usuario ${Usuario} se actualizó sastifactoriamente. `})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

const signIn = async (req = request, res = response) =>{
    
    const {
        Usuario,
        Contrasena
    } = req.body

    if (
        !Usuario ||
        !Contrasena 
    ){
        res.status(400).json({msg: "Falta información del usuario"})
        return
    }

    let conn;
    
    try {
        conn = await pool.getConnection()
        

        const [user] = await conn.query(modeloUsuarios.querySignIn, [Usuario])

        if (!user || user.Activo === 'N') {
            let code = !user ? 1 : 2;
            res.status(403).json({msg: `El usuario o la contraseña son incorrectos.`, errorCode: code})
            return
        }

        const accesoValido = bcryptjs.compareSync(Contrasena, user.Contrasena)

        if(!accesoValido) {
            res.status(403).json({msg: `El usuario o la contraseña son incorrectos.`, errorCode: 3})
            return  
        }
 
        res.json({msg: `El usuario ${Usuario} a iniciado sesión sastifactoriamente. `})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

module.exports = {getUsers, getUserByID, deleteUserByID ,addUser, updateUserByUsuario, signIn}