package com.moya.inventory.service.impl;

import com.moya.inventory.service.SteelPipeService;
import com.moya.inventory.domain.SteelPipe;
import com.moya.inventory.repository.SteelPipeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing SteelPipe.
 */
@Service
@Transactional
public class SteelPipeServiceImpl implements SteelPipeService {

    private final Logger log = LoggerFactory.getLogger(SteelPipeServiceImpl.class);

    private final SteelPipeRepository steelPipeRepository;

    public SteelPipeServiceImpl(SteelPipeRepository steelPipeRepository) {
        this.steelPipeRepository = steelPipeRepository;
    }

    /**
     * Save a steelPipe.
     *
     * @param steelPipe the entity to save
     * @return the persisted entity
     */
    @Override
    public SteelPipe save(SteelPipe steelPipe) {
        log.debug("Request to save SteelPipe : {}", steelPipe);
        return steelPipeRepository.save(steelPipe);
    }

    /**
     * Get all the steelPipes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<SteelPipe> findAll(Pageable pageable) {
        log.debug("Request to get all SteelPipes");
        return steelPipeRepository.findAll(pageable);
    }

    /**
     * Get one steelPipe by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public SteelPipe findOne(Long id) {
        log.debug("Request to get SteelPipe : {}", id);
        return steelPipeRepository.findOne(id);
    }

    /**
     * Delete the steelPipe by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete SteelPipe : {}", id);
        steelPipeRepository.delete(id);
    }
}
