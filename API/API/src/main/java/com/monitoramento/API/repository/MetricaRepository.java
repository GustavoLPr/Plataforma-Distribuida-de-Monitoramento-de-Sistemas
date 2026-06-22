package com.monitoramento.API.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.monitoramento.API.model.Metrica;

public interface MetricaRepository extends JpaRepository<Metrica, Long> {

    List<Metrica> findByMaquinaId(Long maquinaId);

    @Query("""
                SELECT
                    AVG(m.cpuPercent),
                    AVG(m.memoriaPercent),
                    AVG(m.discoPercent)
                FROM Metrica m
            """)
    List<Object[]> obterMedias();
}