package com.monitoramento.API.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.monitoramento.API.dto.maquina.MaquinaCadastroDto;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table (name = "maquinas")
@EqualsAndHashCode(of = "id")
@NoArgsConstructor
@AllArgsConstructor
public class Maquina {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String nome;

    private String ip;

    @Column(name = "criado_em", updatable=false)
    @CreationTimestamp
    private LocalDateTime criadoEm;

    @JsonIgnore 
    @OneToMany(mappedBy="maquina", cascade=CascadeType.ALL)
    private List<Metrica> metricas = new ArrayList<>();

        public Maquina(MaquinaCadastroDto dados) {
        this.nome = dados.nome();
        this.ip = dados.ip();
    }


    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return this.nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getIp() {
        return this.ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public LocalDateTime getCriadoEm() {
        return this.criadoEm;
    }

    public void setCriadoEm(LocalDateTime criadoEm) {
        this.criadoEm = criadoEm;
    }

    public List<Metrica> getMetricas() {
        return this.metricas;
    }

    public void setMetricas(List<Metrica> metricas) {
        this.metricas = metricas;
    }


}
