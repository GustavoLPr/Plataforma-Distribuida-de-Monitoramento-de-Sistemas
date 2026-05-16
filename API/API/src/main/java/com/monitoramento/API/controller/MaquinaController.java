package com.monitoramento.API.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.monitoramento.API.dto.maquina.MaquinaCadastroDto;
import com.monitoramento.API.dto.maquina.MaquinaListagemDto;
import com.monitoramento.API.model.Maquina;
import com.monitoramento.API.repository.MaquinaRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/maquinas")
public class MaquinaController {

    @Autowired
    private MaquinaRepository rep;

    @PostMapping
    public ResponseEntity<?> cadastroMaquina(@RequestBody @Valid MaquinaCadastroDto dados, UriComponentsBuilder uriBuilder){
        var maquina = new Maquina(dados);
        rep.save(maquina);
        var uri = uriBuilder.path("/maquinas/{id}").buildAndExpand(maquina.getId()).toUri();
        return ResponseEntity.created(uri).body(new MaquinaListagemDto(maquina ));

    }
}
