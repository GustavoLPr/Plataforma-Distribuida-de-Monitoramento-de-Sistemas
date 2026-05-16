package com.agente;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;

public class EnviadorMetricas {
    private final String urlApi;
    private final long maquinaId;
    private final HttpClient httpClient;
    private final ObjectMapper mapper;

    public EnviadorMetricas(String urlApi, long maquinaId) {
        this.urlApi = urlApi;
        this.maquinaId = maquinaId;
        this.httpClient = HttpClient.newHttpClient();
        this.mapper = new ObjectMapper();
    }

    public void enviar(double cpu, double memoria, double disco) {
        try {
            // Monta o corpo do JSON
            Map<String, Object> corpo = new HashMap<>();
            corpo.put("maquinaId", maquinaId);
            corpo.put("cpuPercent", cpu);
            corpo.put("memoriaPercent", memoria);
            corpo.put("discoPercent", disco);
            String json = mapper.writeValueAsString(corpo);
            // Constrói e executa o POST
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(urlApi + "/api/metricas"))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(json))
                    .build();
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println("[OK] Enviado | Status: " + response.statusCode()
                    + " | CPU: " + cpu + "% | MEM: " + memoria + "% | DISCO: " + disco
                    + "%");
        } catch (IOException | InterruptedException e) {
            System.err.println("[ERRO] Falha ao enviar métricas: " +
                    e.getMessage());
        }
    }
}