package com.monitoramento.API.dto.metrica;

public record MediaMetricasDto(
    Double cpuPercent,
    Double memoriaPercent,
    Double discoPercent
) {}