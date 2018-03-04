package com.moya.inventory.web.rest;

import com.moya.inventory.InventoryApp;
import com.moya.inventory.domain.InventoryReport;
import com.moya.inventory.repository.InventoryReportRepository;
import com.moya.inventory.service.InventoryReportService;
import com.moya.inventory.web.rest.errors.ExceptionTranslator;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.moya.inventory.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the InventoryReportResource REST controller.
 *
 * @see InventoryReportResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = InventoryApp.class)
public class InventoryReportResourceIntTest {

    private static final String DEFAULT_STEEL_PIPE_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_STEEL_PIPE_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_THICKNESS = "AAAAAAAAAA";
    private static final String UPDATED_THICKNESS = "BBBBBBBBBB";

    private static final Integer DEFAULT_NUM = 1;
    private static final Integer UPDATED_NUM = 2;

    @Autowired
    private InventoryReportRepository inventoryReportRepository;

    @Autowired
    private InventoryReportService inventoryReportService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restInventoryReportMockMvc;

    private InventoryReport inventoryReport;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final InventoryReportResource inventoryReportResource = new InventoryReportResource(inventoryReportService);
        this.restInventoryReportMockMvc = MockMvcBuilders.standaloneSetup(inventoryReportResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static InventoryReport createEntity(EntityManager em) {
        InventoryReport inventoryReport = new InventoryReport()
            .steelPipeType(DEFAULT_STEEL_PIPE_TYPE)
            .thickness(DEFAULT_THICKNESS)
            .num(DEFAULT_NUM);
        return inventoryReport;
    }

    @Before
    public void initTest() {
        inventoryReport = createEntity(em);
    }

    @Test
    @Transactional
    public void createInventoryReport() throws Exception {
        int databaseSizeBeforeCreate = inventoryReportRepository.findAll().size();

        // Create the InventoryReport
        restInventoryReportMockMvc.perform(post("/api/inventory-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(inventoryReport)))
            .andExpect(status().isCreated());

        // Validate the InventoryReport in the database
        List<InventoryReport> inventoryReportList = inventoryReportRepository.findAll();
        assertThat(inventoryReportList).hasSize(databaseSizeBeforeCreate + 1);
        InventoryReport testInventoryReport = inventoryReportList.get(inventoryReportList.size() - 1);
        assertThat(testInventoryReport.getSteelPipeType()).isEqualTo(DEFAULT_STEEL_PIPE_TYPE);
        assertThat(testInventoryReport.getThickness()).isEqualTo(DEFAULT_THICKNESS);
        assertThat(testInventoryReport.getNum()).isEqualTo(DEFAULT_NUM);
    }

    @Test
    @Transactional
    public void createInventoryReportWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = inventoryReportRepository.findAll().size();

        // Create the InventoryReport with an existing ID
        inventoryReport.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInventoryReportMockMvc.perform(post("/api/inventory-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(inventoryReport)))
            .andExpect(status().isBadRequest());

        // Validate the InventoryReport in the database
        List<InventoryReport> inventoryReportList = inventoryReportRepository.findAll();
        assertThat(inventoryReportList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllInventoryReports() throws Exception {
        // Initialize the database
        inventoryReportRepository.saveAndFlush(inventoryReport);

        // Get all the inventoryReportList
        restInventoryReportMockMvc.perform(get("/api/inventory-reports?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(inventoryReport.getId().intValue())))
            .andExpect(jsonPath("$.[*].steelPipeType").value(hasItem(DEFAULT_STEEL_PIPE_TYPE.toString())))
            .andExpect(jsonPath("$.[*].thickness").value(hasItem(DEFAULT_THICKNESS.toString())))
            .andExpect(jsonPath("$.[*].num").value(hasItem(DEFAULT_NUM)));
    }

    @Test
    @Transactional
    public void getInventoryReport() throws Exception {
        // Initialize the database
        inventoryReportRepository.saveAndFlush(inventoryReport);

        // Get the inventoryReport
        restInventoryReportMockMvc.perform(get("/api/inventory-reports/{id}", inventoryReport.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(inventoryReport.getId().intValue()))
            .andExpect(jsonPath("$.steelPipeType").value(DEFAULT_STEEL_PIPE_TYPE.toString()))
            .andExpect(jsonPath("$.thickness").value(DEFAULT_THICKNESS.toString()))
            .andExpect(jsonPath("$.num").value(DEFAULT_NUM));
    }

    @Test
    @Transactional
    public void getNonExistingInventoryReport() throws Exception {
        // Get the inventoryReport
        restInventoryReportMockMvc.perform(get("/api/inventory-reports/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInventoryReport() throws Exception {
        // Initialize the database
        inventoryReportService.save(inventoryReport);

        int databaseSizeBeforeUpdate = inventoryReportRepository.findAll().size();

        // Update the inventoryReport
        InventoryReport updatedInventoryReport = inventoryReportRepository.findOne(inventoryReport.getId());
        // Disconnect from session so that the updates on updatedInventoryReport are not directly saved in db
        em.detach(updatedInventoryReport);
        updatedInventoryReport
            .steelPipeType(UPDATED_STEEL_PIPE_TYPE)
            .thickness(UPDATED_THICKNESS)
            .num(UPDATED_NUM);

        restInventoryReportMockMvc.perform(put("/api/inventory-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedInventoryReport)))
            .andExpect(status().isOk());

        // Validate the InventoryReport in the database
        List<InventoryReport> inventoryReportList = inventoryReportRepository.findAll();
        assertThat(inventoryReportList).hasSize(databaseSizeBeforeUpdate);
        InventoryReport testInventoryReport = inventoryReportList.get(inventoryReportList.size() - 1);
        assertThat(testInventoryReport.getSteelPipeType()).isEqualTo(UPDATED_STEEL_PIPE_TYPE);
        assertThat(testInventoryReport.getThickness()).isEqualTo(UPDATED_THICKNESS);
        assertThat(testInventoryReport.getNum()).isEqualTo(UPDATED_NUM);
    }

    @Test
    @Transactional
    public void updateNonExistingInventoryReport() throws Exception {
        int databaseSizeBeforeUpdate = inventoryReportRepository.findAll().size();

        // Create the InventoryReport

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restInventoryReportMockMvc.perform(put("/api/inventory-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(inventoryReport)))
            .andExpect(status().isCreated());

        // Validate the InventoryReport in the database
        List<InventoryReport> inventoryReportList = inventoryReportRepository.findAll();
        assertThat(inventoryReportList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteInventoryReport() throws Exception {
        // Initialize the database
        inventoryReportService.save(inventoryReport);

        int databaseSizeBeforeDelete = inventoryReportRepository.findAll().size();

        // Get the inventoryReport
        restInventoryReportMockMvc.perform(delete("/api/inventory-reports/{id}", inventoryReport.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<InventoryReport> inventoryReportList = inventoryReportRepository.findAll();
        assertThat(inventoryReportList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(InventoryReport.class);
        InventoryReport inventoryReport1 = new InventoryReport();
        inventoryReport1.setId(1L);
        InventoryReport inventoryReport2 = new InventoryReport();
        inventoryReport2.setId(inventoryReport1.getId());
        assertThat(inventoryReport1).isEqualTo(inventoryReport2);
        inventoryReport2.setId(2L);
        assertThat(inventoryReport1).isNotEqualTo(inventoryReport2);
        inventoryReport1.setId(null);
        assertThat(inventoryReport1).isNotEqualTo(inventoryReport2);
    }
}
