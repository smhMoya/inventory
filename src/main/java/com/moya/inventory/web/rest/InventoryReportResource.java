package com.moya.inventory.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.moya.inventory.domain.InventoryReport;
import com.moya.inventory.service.InventoryReportService;
import com.moya.inventory.web.rest.errors.BadRequestAlertException;
import com.moya.inventory.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing InventoryReport.
 */
@RestController
@RequestMapping("/api")
public class InventoryReportResource {

    private final Logger log = LoggerFactory.getLogger(InventoryReportResource.class);

    private static final String ENTITY_NAME = "inventoryReport";

    private final InventoryReportService inventoryReportService;

    public InventoryReportResource(InventoryReportService inventoryReportService) {
        this.inventoryReportService = inventoryReportService;
    }

    /**
     * POST  /inventory-reports : Create a new inventoryReport.
     *
     * @param inventoryReport the inventoryReport to create
     * @return the ResponseEntity with status 201 (Created) and with body the new inventoryReport, or with status 400 (Bad Request) if the inventoryReport has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/inventory-reports")
    @Timed
    public ResponseEntity<InventoryReport> createInventoryReport(@RequestBody InventoryReport inventoryReport) throws URISyntaxException {
        log.debug("REST request to save InventoryReport : {}", inventoryReport);
        if (inventoryReport.getId() != null) {
            throw new BadRequestAlertException("A new inventoryReport cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InventoryReport result = inventoryReportService.save(inventoryReport);
        return ResponseEntity.created(new URI("/api/inventory-reports/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /inventory-reports : Updates an existing inventoryReport.
     *
     * @param inventoryReport the inventoryReport to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated inventoryReport,
     * or with status 400 (Bad Request) if the inventoryReport is not valid,
     * or with status 500 (Internal Server Error) if the inventoryReport couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/inventory-reports")
    @Timed
    public ResponseEntity<InventoryReport> updateInventoryReport(@RequestBody InventoryReport inventoryReport) throws URISyntaxException {
        log.debug("REST request to update InventoryReport : {}", inventoryReport);
        if (inventoryReport.getId() == null) {
            return createInventoryReport(inventoryReport);
        }
        InventoryReport result = inventoryReportService.save(inventoryReport);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, inventoryReport.getId().toString()))
            .body(result);
    }

    /**
     * GET  /inventory-reports : get all the inventoryReports.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of inventoryReports in body
     */
    @GetMapping("/inventory-reports")
    @Timed
    public List<InventoryReport> getAllInventoryReports() {
        log.debug("REST request to get all InventoryReports");
        return inventoryReportService.findAll();
        }

    /**
     * GET  /inventory-reports/:id : get the "id" inventoryReport.
     *
     * @param id the id of the inventoryReport to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the inventoryReport, or with status 404 (Not Found)
     */
    @GetMapping("/inventory-reports/{id}")
    @Timed
    public ResponseEntity<InventoryReport> getInventoryReport(@PathVariable Long id) {
        log.debug("REST request to get InventoryReport : {}", id);
        InventoryReport inventoryReport = inventoryReportService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(inventoryReport));
    }

    /**
     * DELETE  /inventory-reports/:id : delete the "id" inventoryReport.
     *
     * @param id the id of the inventoryReport to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/inventory-reports/{id}")
    @Timed
    public ResponseEntity<Void> deleteInventoryReport(@PathVariable Long id) {
        log.debug("REST request to delete InventoryReport : {}", id);
        inventoryReportService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
