package com.monitoramento.API.dto.maquina;

import jakarta.validation.constraints.NotBlank;

public record MaquinaCadastroDto(
    Long id,
    @NotBlank String nome,
    @NotBlank String ip
) {

}
