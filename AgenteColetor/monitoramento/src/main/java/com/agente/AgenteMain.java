package com.agente;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class AgenteMain {

    private static final String URL_API = "http://localhost:8080";

    private static final int INTERVALO = 30;

    public static void main(String[] args) {

        long maquinaId;

        if (MachineIdStorage.existeId()) {

            maquinaId = MachineIdStorage.lerId();

            System.out.println(
                    "[OK] ID encontrado: "
                            + maquinaId);

        } else {

            RegistroMaquina registro = new RegistroMaquina(URL_API);

            maquinaId = registro.registrar();

            MachineIdStorage.salvarId(
                    maquinaId);

            System.out.println(
                    "[OK] Novo ID salvo: "
                            + maquinaId);
        }

        ColetorMetricas coletor = new ColetorMetricas();

        EnviadorMetricas enviador = new EnviadorMetricas(
                URL_API,
                maquinaId);

        try {

            Thread.sleep(2000);

        } catch (InterruptedException e) {
        }

        ScheduledExecutorService scheduler = Executors
                .newSingleThreadScheduledExecutor();

        scheduler.scheduleAtFixedRate(() -> {

            double cpu = coletor.getCpuPercent();

            double memoria = coletor.getMemoriaPercent();

            double disco = coletor.getDiscoPercent();

            enviador.enviar(
                    cpu,
                    memoria,
                    disco);

        }, 0, INTERVALO, TimeUnit.SECONDS);
    }
}