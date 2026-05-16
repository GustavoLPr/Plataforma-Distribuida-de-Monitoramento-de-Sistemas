package com.monitoramento.API.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.monitoramento.API.dto.metrica.MetricasDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "metricas")
@EqualsAndHashCode(of = "id")
@NoArgsConstructor
@AllArgsConstructor
public class Metrica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "maquina_id")
    private Maquina maquina;

    @NotNull
    @Column(name = "cpu_percent")
    private Double cpuPercent;

    @NotNull
    @Column(name="memoria_percent")
    private Double memoriaPercent;

    @NotNull
    @Column(name="disco_percent")
    private Double discoPercent;

    @CreationTimestamp
    @Column (name = "coletado_em")
    private LocalDateTime coletadoEm;

    public Metrica (MetricasDto dados, Maquina maquina) {
        this.cpuPercent = dados.cpuPercent();
        this.discoPercent = dados.discoPercent();
        this.memoriaPercent = dados.memoriaPercent();
        this.maquina = maquina;
    }
     public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Maquina getMaquina() {
        return this.maquina;
    }

    public void setMaquina(Maquina maquina) {
        this.maquina = maquina;
    }

    public Double getCpuPercent() {
        return this.cpuPercent;
    }

    public void setCpuPercent(Double cpuPercent) {
        this.cpuPercent = cpuPercent;
    }

    public Double getMemoriaPercent() {
        return this.memoriaPercent;
    }

    public void setMemoriaPercent(Double memoriaPercent) {
        this.memoriaPercent = memoriaPercent;
    }

    public Double getDiscoPercent() {
        return this.discoPercent;
    }

    public void setDiscoPercent(Double discoPercent) {
        this.discoPercent = discoPercent;
    }

    public LocalDateTime getColetadoEm() {
        return this.coletadoEm;
    }

    public void setColetadoEm(LocalDateTime coletadoEm) {
        this.coletadoEm = coletadoEm;
    }


}

   