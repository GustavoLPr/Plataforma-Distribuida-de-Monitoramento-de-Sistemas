package com.agente;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class MachineIdStorage {

    private static final String ARQUIVO =
            "machine-id.txt";

    public static boolean existeId() {

        return Files.exists(Path.of(ARQUIVO));
    }

    public static long lerId() {

        try {

            String id =
                    Files.readString(
                        Path.of(ARQUIVO)
                    );

            return Long.parseLong(id);

        } catch (IOException e) {

            throw new RuntimeException(
                "Erro ao ler ID",
                e
            );
        }
    }

    public static void salvarId(long id) {

        try {

            Files.writeString(
                Path.of(ARQUIVO),
                String.valueOf(id)
            );

        } catch (IOException e) {

            throw new RuntimeException(
                "Erro ao salvar ID",
                e
            );
        }
    }
}