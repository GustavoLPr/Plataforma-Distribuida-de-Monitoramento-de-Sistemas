package com.monitoramento.API.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.monitoramento.API.model.Metrica;

public interface MetricaRepository extends JpaRepository<Metrica, Long> {

    List<Metrica> findByMaquinaId(Long maquinaId);

}