package com.monitoramento.API.dto.metrica;

import jakarta.validation.constraints.NotNull;

public record MetricasDto(
    @NotNull Long maquinaId,
    @NotNull Double cpuPercent,
    @NotNull Double memoriaPercent,
    @NotNull Double discoPercent
) {
}
