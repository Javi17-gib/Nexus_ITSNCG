import api from "./axios";

export interface ChatbotRequest {
    mensaje: string;
    materia?: string;
}

export interface ChatbotResponse {
    respuesta: string;
}

export async function preguntarChatbotRequest(
    data: ChatbotRequest
): Promise<ChatbotResponse> {

    const response =
        await api.post<ChatbotResponse>(
            "/chatbot",
            data
        );

    return response.data;
}