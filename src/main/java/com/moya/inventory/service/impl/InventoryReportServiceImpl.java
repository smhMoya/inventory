package com.moya.inventory.service.impl;

import com.moya.inventory.service.InventoryReportService;
import com.moya.inventory.domain.InventoryReport;
import com.moya.inventory.repository.InventoryReportRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing InventoryReport.
 */
@Service
@Transactional
public class InventoryReportServiceImpl implements InventoryReportService {

    private final Logger log = LoggerFactory.getLogger(InventoryReportServiceImpl.class);

    private final InventoryReportRepository inventoryReportRepository;

    public InventoryReportServiceImpl(InventoryReportRepository inventoryReportRepository) {
        this.inventoryReportRepository = inventoryReportRepository;
    }

    /**
     * Save a inventoryReport.
     *
     * @param inventoryReport the entity to save
     * @return the persisted entity
     */
    @Override
    public InventoryReport save(InventoryReport inventoryReport) {
        log.debug("Request to save InventoryReport : {}", inventoryReport);
        return inventoryReportRepository.save(inventoryReport);
    }

    /**
     * Get all the inventoryReports.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<InventoryReport> findAll() {
        log.debug("Request to get all InventoryReports");
        return inventoryReportRepository.findAll();
    }

    /**
     * Get one inventoryReport by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public InventoryReport findOne(Long id) {
        log.debug("Request to get InventoryReport : {}", id);
        return inventoryReportRepository.findOne(id);
    }

    /**
     * Delete the inventoryReport by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete InventoryReport : {}", id);
        inventoryReportRepository.delete(id);
    }
}
