package com.agente;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class AgenteMain {
    // Configurações — altere conforme seu ambiente
    private static final String URL_API = "http://localhost:8080";
    private static final long MAQUINA_ID = 1L;
    private static final int INTERVALO = 30; // segundos

    public static void main(String[] args) {
        System.out.println("Agente iniciado. Coletando a cada " + INTERVALO +
                "s...");
        ColetorMetricas coletor = new ColetorMetricas();
        EnviadorMetricas enviador = new EnviadorMetricas(URL_API, MAQUINA_ID);
        // Aguarda 2s antes da primeira coleta (CPU precisa de dois ticks)
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
        }
        ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();
        scheduler.scheduleAtFixedRate(() -> {
            double cpu = coletor.getCpuPercent();
            double memoria = coletor.getMemoriaPercent();
            double disco = coletor.getDiscoPercent();
            enviador.enviar(cpu, memoria, disco);
        }, 0, INTERVALO, TimeUnit.SECONDS);
    }
}