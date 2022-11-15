const modeloGuerreros = {
    queryGetSpirits: "SELECT * FROM Guerreros",
    querygetSpiritsByID: `SELECT * FROM Guerreros WHERE ID = ?`,
    querydeleteSpiritsByID: `UPDATE Guerreros SET Activo = 'N' WHERE ID = ?`,
    querySpiritsExists: `SELECT Usuario_Elegido FROM Guerreros WHERE Usuario_Elegido = ?`,
    queryaddSpirits: `
    INSERT INTO Guerreros (
        Usuario_Elegido,
        Nombre_del_guerrero,
        Elemento_del_guerrero,
        Habilidad_del_guerrero,
        Espiritu_bestia_del_guerrero,
        Genero,
        Activo
    ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?)`,
    queryGetSpiritsInfo:
    `SELECT Usuario_Elegido, Nombre_del_guerrero, Elemento_del_guerrero, Habilidad_del_guerrero,
    Espiritu_bestia_del_guerrero, Genero 
            FROM Guerreros 
            WHERE Usuario_Elegido = ?`,
    queryUpdateBySpirits:
    `UPDATE Guerreros SET  
                Nombre_del_guerrero = ?,
                Elemento_del_guerrero = ?,
                Habilidad_del_guerrero = ?,
                Espiritu_bestia_del_guerrero = ?,
                Genero = ?
                WHERE Usuario_Elegido = ?`
    }
    
    module.exports = modeloGuerreros