package com.moya.inventory.service;

import com.moya.inventory.domain.SteelPipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing SteelPipe.
 */
public interface SteelPipeService {

    /**
     * Save a steelPipe.
     *
     * @param steelPipe the entity to save
     * @return the persisted entity
     */
    SteelPipe save(SteelPipe steelPipe);

    /**
     * Get all the steelPipes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<SteelPipe> findAll(Pageable pageable);

    /**
     * Get the "id" steelPipe.
     *
     * @param id the id of the entity
     * @return the entity
     */
    SteelPipe findOne(Long id);

    /**
     * Delete the "id" steelPipe.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
