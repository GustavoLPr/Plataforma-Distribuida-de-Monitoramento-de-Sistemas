package com.monitoramento.API.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.monitoramento.API.dto.metrica.MediaMetricasDto;
import com.monitoramento.API.dto.metrica.MetricaListagemDto;
import com.monitoramento.API.dto.metrica.MetricasDto;
import com.monitoramento.API.model.Maquina;
import com.monitoramento.API.model.Metrica;
import com.monitoramento.API.repository.MaquinaRepository;
import com.monitoramento.API.repository.MetricaRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/metricas")
public class MetricaController {

    @Autowired
    private MetricaRepository rep;

    @Autowired
    private MaquinaRepository repM;

    @PostMapping
    public ResponseEntity<?> cadastarMetricas(
            @RequestBody MetricasDto dados,
            UriComponentsBuilder uriBuilder) {

        Maquina maq = repM.findById(dados.maquinaId())
                .orElseThrow(() -> new RuntimeException("Máquina não encontrada"));

        Metrica metricas = new Metrica(dados, maq);

        rep.save(metricas);

        var uri = uriBuilder
                .path("/api/metricas/{id}")
                .buildAndExpand(metricas.getId())
                .toUri();

        return ResponseEntity
                .created(uri)
                .body(new MetricaListagemDto(metricas));
    }

    @GetMapping("/maquina/{maquinaId}")
    public ResponseEntity<?> listarMetricas(
            @PathVariable Long maquinaId) {

        return ResponseEntity.ok(
                rep.findByMaquinaId(maquinaId));
    }

    @GetMapping("/media")
    public ResponseEntity<?> obterMediaGeral() {

        Object[] medias = rep.obterMedias().get(0);

        MediaMetricasDto dto = new MediaMetricasDto(
                ((Number) medias[0]).doubleValue(),
                ((Number) medias[1]).doubleValue(),
                ((Number) medias[2]).doubleValue());

        return ResponseEntity.ok(dto);
    }
}