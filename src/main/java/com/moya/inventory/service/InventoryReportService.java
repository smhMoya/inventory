package com.moya.inventory.service;

import com.moya.inventory.domain.InventoryReport;
import java.util.List;

/**
 * Service Interface for managing InventoryReport.
 */
public interface InventoryReportService {

    /**
     * Save a inventoryReport.
     *
     * @param inventoryReport the entity to save
     * @return the persisted entity
     */
    InventoryReport save(InventoryReport inventoryReport);

    /**
     * Get all the inventoryReports.
     *
     * @return the list of entities
     */
    List<InventoryReport> findAll();

    /**
     * Get the "id" inventoryReport.
     *
     * @param id the id of the entity
     * @return the entity
     */
    InventoryReport findOne(Long id);

    /**
     * Delete the "id" inventoryReport.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
