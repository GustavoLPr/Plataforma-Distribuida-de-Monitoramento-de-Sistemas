package com.agente;

import java.io.IOException;
import java.net.InetAddress;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;

public class RegistroMaquina {

    private final String urlApi;

    private final HttpClient client;

    private final ObjectMapper mapper;

    public RegistroMaquina(String urlApi) {

        this.urlApi = urlApi;

        this.client = HttpClient.newHttpClient();

        this.mapper = new ObjectMapper();
    }

    public long registrar() {

        try {

            InetAddress ip = InetAddress.getLocalHost();

            String nome = ip.getHostName();

            String enderecoIp = ip.getHostAddress();

            Map<String, Object> corpo = new HashMap<>();

            corpo.put("nome", nome);

            corpo.put("ip", enderecoIp);

            String json = mapper.writeValueAsString(corpo);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(
                            urlApi + "/api/maquinas"))
                    .header(
                            "Content-Type",
                            "application/json")
                    .POST(
                            HttpRequest.BodyPublishers
                                    .ofString(json))
                    .build();

            HttpResponse<String> response = client.send(
                    request,
                    HttpResponse.BodyHandlers.ofString());

            MaquinaResponseDTO responseDto = mapper.readValue(
                    response.body(),
                    MaquinaResponseDTO.class);

            long maquinaId = responseDto.id();

            System.out.println(
                    "[OK] Máquina registrada. ID: "
                            + maquinaId);

            return maquinaId;

        } catch (
                IOException | InterruptedException e) {

            throw new RuntimeException(
                    "Erro ao registrar máquina",
                    e);
        }
    }
}