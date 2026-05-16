package com.monitoramento.API.dto.maquina;

import jakarta.validation.constraints.NotBlank;

public record MaquinaCadastroDto(
    @NotBlank String nome,
    @NotBlank String ip
) {

}
