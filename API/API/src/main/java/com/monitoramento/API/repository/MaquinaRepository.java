package com.monitoramento.API.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.monitoramento.API.model.Maquina;


public interface MaquinaRepository extends JpaRepository<Maquina, Long>{

}
