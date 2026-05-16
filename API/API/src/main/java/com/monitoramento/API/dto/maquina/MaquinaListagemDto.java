package com.monitoramento.API.dto.maquina;

import com.monitoramento.API.model.Maquina;

public record MaquinaListagemDto(
        Long id,
        String nome,
        String ip) {

            public MaquinaListagemDto(Maquina maquina){
                this(
                    maquina.getId(),
                    maquina.getNome(), 
                    maquina.getIp()
                );
            }
}
