package com.monitoramento.API.dto.metrica;

import com.monitoramento.API.model.Metrica;

public record MetricaListagemDto(
        Long maquinaId,
        Double cpuPercent,
        Double memoriaPercent,
        Double discoPercent) {

    public MetricaListagemDto(Metrica metrica) {
        this(
                metrica.getMaquina().getId(),
                metrica.getCpuPercent(),
                metrica.getMemoriaPercent(),
                metrica.getDiscoPercent());
    }

}
