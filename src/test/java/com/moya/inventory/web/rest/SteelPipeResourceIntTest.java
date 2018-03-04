package com.moya.inventory.web.rest;

import com.moya.inventory.InventoryApp;

import com.moya.inventory.domain.SteelPipe;
import com.moya.inventory.repository.SteelPipeRepository;
import com.moya.inventory.service.SteelPipeService;
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
 * Test class for the SteelPipeResource REST controller.
 *
 * @see SteelPipeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = InventoryApp.class)
public class SteelPipeResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    private static final Double DEFAULT_THICKNESS = 1D;
    private static final Double UPDATED_THICKNESS = 2D;

    @Autowired
    private SteelPipeRepository steelPipeRepository;

    @Autowired
    private SteelPipeService steelPipeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSteelPipeMockMvc;

    private SteelPipe steelPipe;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SteelPipeResource steelPipeResource = new SteelPipeResource(steelPipeService);
        this.restSteelPipeMockMvc = MockMvcBuilders.standaloneSetup(steelPipeResource)
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
    public static SteelPipe createEntity(EntityManager em) {
        SteelPipe steelPipe = new SteelPipe()
            .name(DEFAULT_NAME)
            .type(DEFAULT_TYPE)
            .thickness(DEFAULT_THICKNESS);
        return steelPipe;
    }

    @Before
    public void initTest() {
        steelPipe = createEntity(em);
    }

    @Test
    @Transactional
    public void createSteelPipe() throws Exception {
        int databaseSizeBeforeCreate = steelPipeRepository.findAll().size();

        // Create the SteelPipe
        restSteelPipeMockMvc.perform(post("/api/steel-pipes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(steelPipe)))
            .andExpect(status().isCreated());

        // Validate the SteelPipe in the database
        List<SteelPipe> steelPipeList = steelPipeRepository.findAll();
        assertThat(steelPipeList).hasSize(databaseSizeBeforeCreate + 1);
        SteelPipe testSteelPipe = steelPipeList.get(steelPipeList.size() - 1);
        assertThat(testSteelPipe.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSteelPipe.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testSteelPipe.getThickness()).isEqualTo(DEFAULT_THICKNESS);
    }

    @Test
    @Transactional
    public void createSteelPipeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = steelPipeRepository.findAll().size();

        // Create the SteelPipe with an existing ID
        steelPipe.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSteelPipeMockMvc.perform(post("/api/steel-pipes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(steelPipe)))
            .andExpect(status().isBadRequest());

        // Validate the SteelPipe in the database
        List<SteelPipe> steelPipeList = steelPipeRepository.findAll();
        assertThat(steelPipeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSteelPipes() throws Exception {
        // Initialize the database
        steelPipeRepository.saveAndFlush(steelPipe);

        // Get all the steelPipeList
        restSteelPipeMockMvc.perform(get("/api/steel-pipes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(steelPipe.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].thickness").value(hasItem(DEFAULT_THICKNESS.doubleValue())));
    }

    @Test
    @Transactional
    public void getSteelPipe() throws Exception {
        // Initialize the database
        steelPipeRepository.saveAndFlush(steelPipe);

        // Get the steelPipe
        restSteelPipeMockMvc.perform(get("/api/steel-pipes/{id}", steelPipe.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(steelPipe.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.thickness").value(DEFAULT_THICKNESS.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingSteelPipe() throws Exception {
        // Get the steelPipe
        restSteelPipeMockMvc.perform(get("/api/steel-pipes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSteelPipe() throws Exception {
        // Initialize the database
        steelPipeService.save(steelPipe);

        int databaseSizeBeforeUpdate = steelPipeRepository.findAll().size();

        // Update the steelPipe
        SteelPipe updatedSteelPipe = steelPipeRepository.findOne(steelPipe.getId());
        // Disconnect from session so that the updates on updatedSteelPipe are not directly saved in db
        em.detach(updatedSteelPipe);
        updatedSteelPipe
            .name(UPDATED_NAME)
            .type(UPDATED_TYPE)
            .thickness(UPDATED_THICKNESS);

        restSteelPipeMockMvc.perform(put("/api/steel-pipes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSteelPipe)))
            .andExpect(status().isOk());

        // Validate the SteelPipe in the database
        List<SteelPipe> steelPipeList = steelPipeRepository.findAll();
        assertThat(steelPipeList).hasSize(databaseSizeBeforeUpdate);
        SteelPipe testSteelPipe = steelPipeList.get(steelPipeList.size() - 1);
        assertThat(testSteelPipe.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSteelPipe.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testSteelPipe.getThickness()).isEqualTo(UPDATED_THICKNESS);
    }

    @Test
    @Transactional
    public void updateNonExistingSteelPipe() throws Exception {
        int databaseSizeBeforeUpdate = steelPipeRepository.findAll().size();

        // Create the SteelPipe

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSteelPipeMockMvc.perform(put("/api/steel-pipes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(steelPipe)))
            .andExpect(status().isCreated());

        // Validate the SteelPipe in the database
        List<SteelPipe> steelPipeList = steelPipeRepository.findAll();
        assertThat(steelPipeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSteelPipe() throws Exception {
        // Initialize the database
        steelPipeService.save(steelPipe);

        int databaseSizeBeforeDelete = steelPipeRepository.findAll().size();

        // Get the steelPipe
        restSteelPipeMockMvc.perform(delete("/api/steel-pipes/{id}", steelPipe.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SteelPipe> steelPipeList = steelPipeRepository.findAll();
        assertThat(steelPipeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SteelPipe.class);
        SteelPipe steelPipe1 = new SteelPipe();
        steelPipe1.setId(1L);
        SteelPipe steelPipe2 = new SteelPipe();
        steelPipe2.setId(steelPipe1.getId());
        assertThat(steelPipe1).isEqualTo(steelPipe2);
        steelPipe2.setId(2L);
        assertThat(steelPipe1).isNotEqualTo(steelPipe2);
        steelPipe1.setId(null);
        assertThat(steelPipe1).isNotEqualTo(steelPipe2);
    }
}
