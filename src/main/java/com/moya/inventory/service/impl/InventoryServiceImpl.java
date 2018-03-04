package com.moya.inventory.service.impl;

import com.moya.inventory.domain.InventoryReport;
import com.moya.inventory.repository.InventoryReportRepository;
import com.moya.inventory.service.InventoryService;
import com.moya.inventory.domain.Inventory;
import com.moya.inventory.repository.InventoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


/**
 * Service Implementation for managing Inventory.
 */
@Service
@Transactional
public class InventoryServiceImpl implements InventoryService {

    private final Logger log = LoggerFactory.getLogger(InventoryServiceImpl.class);

    private final InventoryRepository inventoryRepository;
    private final InventoryReportRepository inventoryReportRepository;

    public InventoryServiceImpl(InventoryRepository inventoryRepository, InventoryReportRepository inventoryReportRepository) {
        this.inventoryRepository = inventoryRepository;
        this.inventoryReportRepository = inventoryReportRepository;
    }

    /**
     * Save a inventory.
     *
     * @param inventory the entity to save
     * @return the persisted entity
     */
    @Override
    public Inventory save(Inventory inventory) {
        log.debug("Request to save Inventory : {}", inventory);
        Inventory inv = inventoryRepository.save(inventory);
        addInventoryToReport(inventory);
        return inv;
    }

    /**
     * Get all the inventories.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Inventory> findAll(Pageable pageable) {
        log.debug("Request to get all Inventories");
        return inventoryRepository.findAll(pageable);
    }

    /**
     * Get one inventory by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Inventory findOne(Long id) {
        log.debug("Request to get Inventory : {}", id);
        return inventoryRepository.findOne(id);
    }

    /**
     * Delete the inventory by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Inventory : {}", id);
        inventoryRepository.delete(id);
    }


    private void addInventoryToReport(Inventory inventory) {
        Optional<InventoryReport> inventoryReport = inventoryReportRepository.findBySteelPipeTypeEqualsAndThicknessEquals(inventory.getSteelPipe().getType(), String.valueOf(inventory.getSteelPipe().getThickness()));
        if (inventoryReport.isPresent()) {
            inventoryReport.get().addInventories(inventory);
            inventoryReport.get().setNum(inventoryReport.get().getNum()+ inventory.getNum());
            inventoryReportRepository.save(inventoryReport.get());
        } else {
            InventoryReport report = new InventoryReport();
            report.getInventories().add(inventory);
            report.setNum(inventory.getNum());
            report.setThickness(String.valueOf(inventory.getSteelPipe().getThickness()));
            report.setSteelPipeType(inventory.getSteelPipe().getType());
            inventoryReportRepository.save(report);
        }

    }
}
