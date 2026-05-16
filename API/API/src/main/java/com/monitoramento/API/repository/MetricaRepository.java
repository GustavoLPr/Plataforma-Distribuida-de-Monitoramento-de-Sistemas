package com.monitoramento.API.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.monitoramento.API.model.Metrica;

public interface MetricaRepository extends JpaRepository<Metrica, Long>{

}
