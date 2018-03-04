package com.moya.inventory.service;

import com.moya.inventory.domain.Warehouse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Warehouse.
 */
public interface WarehouseService {

    /**
     * Save a warehouse.
     *
     * @param warehouse the entity to save
     * @return the persisted entity
     */
    Warehouse save(Warehouse warehouse);

    /**
     * Get all the warehouses.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Warehouse> findAll(Pageable pageable);

    /**
     * Get the "id" warehouse.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Warehouse findOne(Long id);

    /**
     * Delete the "id" warehouse.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
