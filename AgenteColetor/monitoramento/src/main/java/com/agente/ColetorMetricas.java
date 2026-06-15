package com.agente;

import oshi.SystemInfo;
import oshi.hardware.CentralProcessor;
import oshi.hardware.GlobalMemory;
import oshi.software.os.FileSystem;
import oshi.software.os.OSFileStore;
import oshi.software.os.OperatingSystem;

public class ColetorMetricas {
    private final SystemInfo si;
    private final CentralProcessor cpu;
    private final GlobalMemory memoria;
    private final OperatingSystem os;
    private final FileSystem fs;

    private long[] ticksAnteriores;

    public ColetorMetricas() {
        this.si = new SystemInfo();
        this.cpu = si.getHardware().getProcessor();
        this.memoria = si.getHardware().getMemory();
        this.os = si.getOperatingSystem();
        this.fs = os.getFileSystem();
        this.ticksAnteriores = cpu.getSystemCpuLoadTicks();

    }

    // public double getCpuPercent() {
    // long[] ticksAtuais = cpu.getSystemCpuLoadTicks();
    // double load = cpu.getSystemCpuLoadBetweenTicks(ticksAnteriores);
    // this.ticksAnteriores = ticksAtuais;
    // return Math.round(load * 10000.0) / 100.0;
    // }

    public double getCpuPercent() {
        long[] ticksAtuais = cpu.getSystemCpuLoadTicks();
        double load = cpu.getSystemCpuLoadBetweenTicks(ticksAnteriores);
        this.ticksAnteriores = ticksAtuais;

        int cores = cpu.getLogicalProcessorCount();
        double percent = load * cores * 100.0;

        // Limita a 100% (pois pode passar em cargas altas)
        if (percent > 100.0) {
            percent = 100.0;
        }

        return Math.round(percent * 100.0) / 100.0;
    }

    public double getMemoriaPercent() {
        long total = memoria.getTotal();
        long disponivel = memoria.getAvailable();
        long usada = total - disponivel;
        return Math.round(usada * 10000.0 / total) / 100.0;
    }

    public double getDiscoPercent() {
        for (OSFileStore disco : fs.getFileStores()) {
            if (disco.getMount().equals("/") || disco.getMount().startsWith("C")) {
                long total = disco.getTotalSpace();
                long disponivel = disco.getUsableSpace();
                long usada = total - disponivel;
                return Math.round((usada * 10000.0 / total)) / 100.0;
            }
        }
        return 0.0;
    }

}
