package com.moya.inventory.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.moya.inventory.domain.SteelPipe;
import com.moya.inventory.service.SteelPipeService;
import com.moya.inventory.web.rest.errors.BadRequestAlertException;
import com.moya.inventory.web.rest.util.HeaderUtil;
import com.moya.inventory.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing SteelPipe.
 */
@RestController
@RequestMapping("/api")
public class SteelPipeResource {

    private final Logger log = LoggerFactory.getLogger(SteelPipeResource.class);

    private static final String ENTITY_NAME = "steelPipe";

    private final SteelPipeService steelPipeService;

    public SteelPipeResource(SteelPipeService steelPipeService) {
        this.steelPipeService = steelPipeService;
    }

    /**
     * POST  /steel-pipes : Create a new steelPipe.
     *
     * @param steelPipe the steelPipe to create
     * @return the ResponseEntity with status 201 (Created) and with body the new steelPipe, or with status 400 (Bad Request) if the steelPipe has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/steel-pipes")
    @Timed
    public ResponseEntity<SteelPipe> createSteelPipe(@RequestBody SteelPipe steelPipe) throws URISyntaxException {
        log.debug("REST request to save SteelPipe : {}", steelPipe);
        if (steelPipe.getId() != null) {
            throw new BadRequestAlertException("A new steelPipe cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SteelPipe result = steelPipeService.save(steelPipe);
        return ResponseEntity.created(new URI("/api/steel-pipes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /steel-pipes : Updates an existing steelPipe.
     *
     * @param steelPipe the steelPipe to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated steelPipe,
     * or with status 400 (Bad Request) if the steelPipe is not valid,
     * or with status 500 (Internal Server Error) if the steelPipe couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/steel-pipes")
    @Timed
    public ResponseEntity<SteelPipe> updateSteelPipe(@RequestBody SteelPipe steelPipe) throws URISyntaxException {
        log.debug("REST request to update SteelPipe : {}", steelPipe);
        if (steelPipe.getId() == null) {
            return createSteelPipe(steelPipe);
        }
        SteelPipe result = steelPipeService.save(steelPipe);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, steelPipe.getId().toString()))
            .body(result);
    }

    /**
     * GET  /steel-pipes : get all the steelPipes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of steelPipes in body
     */
    @GetMapping("/steel-pipes")
    @Timed
    public ResponseEntity<List<SteelPipe>> getAllSteelPipes(Pageable pageable) {
        log.debug("REST request to get a page of SteelPipes");
        Page<SteelPipe> page = steelPipeService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/steel-pipes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /steel-pipes/:id : get the "id" steelPipe.
     *
     * @param id the id of the steelPipe to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the steelPipe, or with status 404 (Not Found)
     */
    @GetMapping("/steel-pipes/{id}")
    @Timed
    public ResponseEntity<SteelPipe> getSteelPipe(@PathVariable Long id) {
        log.debug("REST request to get SteelPipe : {}", id);
        SteelPipe steelPipe = steelPipeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(steelPipe));
    }

    /**
     * DELETE  /steel-pipes/:id : delete the "id" steelPipe.
     *
     * @param id the id of the steelPipe to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/steel-pipes/{id}")
    @Timed
    public ResponseEntity<Void> deleteSteelPipe(@PathVariable Long id) {
        log.debug("REST request to delete SteelPipe : {}", id);
        steelPipeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
