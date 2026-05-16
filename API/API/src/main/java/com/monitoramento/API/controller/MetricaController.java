package com.monitoramento.API.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.monitoramento.API.dto.metrica.MetricaListagemDto;
import com.monitoramento.API.dto.metrica.MetricasDto;
import com.monitoramento.API.model.Maquina;
import com.monitoramento.API.model.Metrica;
import com.monitoramento.API.repository.MaquinaRepository;
import com.monitoramento.API.repository.MetricaRepository;

@RestController
@RequestMapping ("/api/metricas")
public class MetricaController {
    @Autowired
    private MetricaRepository rep;

    @Autowired
    private MaquinaRepository repM;

    @PostMapping
    public ResponseEntity<?> cadastarMetricas(@RequestBody MetricasDto dados, UriComponentsBuilder uriBuilder){
        Maquina maq = repM.findById(dados.maquinaId()).orElseThrow(() -> new RuntimeException("Máquina não encontrada"));
        var metricas = new Metrica(dados, maq);
        rep.save(metricas);

        var uri = uriBuilder.path("/api/metricas/{id}").buildAndExpand(metricas.getId()).toUri();
        return ResponseEntity.created(uri).body(new MetricaListagemDto(metricas));
    }
}
