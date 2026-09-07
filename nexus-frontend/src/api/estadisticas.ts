import api from "./axios";


/*
|--------------------------------------------------------------------------
| TIPOS
|--------------------------------------------------------------------------
*/

export interface RegistrarVisitaData {
    materia_id: number;
    grupo_id: number;
}


/*
|--------------------------------------------------------------------------
| REGISTRAR VISITA DEL ALUMNO
|--------------------------------------------------------------------------
*/

export async function registrarVisitaRequest(
    datos: RegistrarVisitaData
) {

    const response =
        await api.post(
            "/estadisticas/registrar",
            datos
        );


    console.log(
        "📊 Visita registrada:",
        response.data
    );


    return response.data;

}