package fr.inti.printed.web.rest;

import fr.inti.printed.TestPrintedV5App;
import fr.inti.printed.domain.LigneDeCommande;
import fr.inti.printed.domain.Produit;
import fr.inti.printed.repository.LigneDeCommandeRepository;
import fr.inti.printed.service.LigneDeCommandeService;
import fr.inti.printed.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.validation.Validator;


import java.math.BigDecimal;
import java.util.List;

import static fr.inti.printed.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import fr.inti.printed.domain.enumeration.StatutArticleComd;
/**
 * Integration tests for the {@link LigneDeCommandeResource} REST controller.
 */
@SpringBootTest(classes = TestPrintedV5App.class)
public class LigneDeCommandeResourceIT {

    private static final Integer DEFAULT_QUANTITE = 0;
    private static final Integer UPDATED_QUANTITE = 1;

    private static final BigDecimal DEFAULT_PTIX_TOTAL = new BigDecimal(0);
    private static final BigDecimal UPDATED_PTIX_TOTAL = new BigDecimal(1);

    private static final StatutArticleComd DEFAULT_STATUT = StatutArticleComd.DISPONIBLE;
    private static final StatutArticleComd UPDATED_STATUT = StatutArticleComd.EN_RUPTURE_DE_STOCK;

    @Autowired
    private LigneDeCommandeRepository ligneDeCommandeRepository;

    @Autowired
    private LigneDeCommandeService ligneDeCommandeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restLigneDeCommandeMockMvc;

    private LigneDeCommande ligneDeCommande;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LigneDeCommandeResource ligneDeCommandeResource = new LigneDeCommandeResource(ligneDeCommandeService);
        this.restLigneDeCommandeMockMvc = MockMvcBuilders.standaloneSetup(ligneDeCommandeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LigneDeCommande createEntity() {
        LigneDeCommande ligneDeCommande = new LigneDeCommande()
            .quantite(DEFAULT_QUANTITE)
            .ptixTotal(DEFAULT_PTIX_TOTAL)
            .statut(DEFAULT_STATUT);
        // Add required entity
        Produit produit;
        produit = ProduitResourceIT.createEntity();
        produit.setId("fixed-id-for-tests");
        ligneDeCommande.setProduit(produit);
        return ligneDeCommande;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LigneDeCommande createUpdatedEntity() {
        LigneDeCommande ligneDeCommande = new LigneDeCommande()
            .quantite(UPDATED_QUANTITE)
            .ptixTotal(UPDATED_PTIX_TOTAL)
            .statut(UPDATED_STATUT);
        // Add required entity
        Produit produit;
        produit = ProduitResourceIT.createUpdatedEntity();
        produit.setId("fixed-id-for-tests");
        ligneDeCommande.setProduit(produit);
        return ligneDeCommande;
    }

    @BeforeEach
    public void initTest() {
        ligneDeCommandeRepository.deleteAll();
        ligneDeCommande = createEntity();
    }

    @Test
    public void createLigneDeCommande() throws Exception {
        int databaseSizeBeforeCreate = ligneDeCommandeRepository.findAll().size();

        // Create the LigneDeCommande
        restLigneDeCommandeMockMvc.perform(post("/api/ligne-de-commandes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ligneDeCommande)))
            .andExpect(status().isCreated());

        // Validate the LigneDeCommande in the database
        List<LigneDeCommande> ligneDeCommandeList = ligneDeCommandeRepository.findAll();
        assertThat(ligneDeCommandeList).hasSize(databaseSizeBeforeCreate + 1);
        LigneDeCommande testLigneDeCommande = ligneDeCommandeList.get(ligneDeCommandeList.size() - 1);
        assertThat(testLigneDeCommande.getQuantite()).isEqualTo(DEFAULT_QUANTITE);
        assertThat(testLigneDeCommande.getPtixTotal()).isEqualTo(DEFAULT_PTIX_TOTAL);
        assertThat(testLigneDeCommande.getStatut()).isEqualTo(DEFAULT_STATUT);
    }

    @Test
    public void createLigneDeCommandeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ligneDeCommandeRepository.findAll().size();

        // Create the LigneDeCommande with an existing ID
        ligneDeCommande.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restLigneDeCommandeMockMvc.perform(post("/api/ligne-de-commandes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ligneDeCommande)))
            .andExpect(status().isBadRequest());

        // Validate the LigneDeCommande in the database
        List<LigneDeCommande> ligneDeCommandeList = ligneDeCommandeRepository.findAll();
        assertThat(ligneDeCommandeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void checkQuantiteIsRequired() throws Exception {
        int databaseSizeBeforeTest = ligneDeCommandeRepository.findAll().size();
        // set the field null
        ligneDeCommande.setQuantite(null);

        // Create the LigneDeCommande, which fails.

        restLigneDeCommandeMockMvc.perform(post("/api/ligne-de-commandes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ligneDeCommande)))
            .andExpect(status().isBadRequest());

        List<LigneDeCommande> ligneDeCommandeList = ligneDeCommandeRepository.findAll();
        assertThat(ligneDeCommandeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkPtixTotalIsRequired() throws Exception {
        int databaseSizeBeforeTest = ligneDeCommandeRepository.findAll().size();
        // set the field null
        ligneDeCommande.setPtixTotal(null);

        // Create the LigneDeCommande, which fails.

        restLigneDeCommandeMockMvc.perform(post("/api/ligne-de-commandes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ligneDeCommande)))
            .andExpect(status().isBadRequest());

        List<LigneDeCommande> ligneDeCommandeList = ligneDeCommandeRepository.findAll();
        assertThat(ligneDeCommandeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkStatutIsRequired() throws Exception {
        int databaseSizeBeforeTest = ligneDeCommandeRepository.findAll().size();
        // set the field null
        ligneDeCommande.setStatut(null);

        // Create the LigneDeCommande, which fails.

        restLigneDeCommandeMockMvc.perform(post("/api/ligne-de-commandes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ligneDeCommande)))
            .andExpect(status().isBadRequest());

        List<LigneDeCommande> ligneDeCommandeList = ligneDeCommandeRepository.findAll();
        assertThat(ligneDeCommandeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllLigneDeCommandes() throws Exception {
        // Initialize the database
        ligneDeCommandeRepository.save(ligneDeCommande);

        // Get all the ligneDeCommandeList
        restLigneDeCommandeMockMvc.perform(get("/api/ligne-de-commandes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ligneDeCommande.getId())))
            .andExpect(jsonPath("$.[*].quantite").value(hasItem(DEFAULT_QUANTITE)))
            .andExpect(jsonPath("$.[*].ptixTotal").value(hasItem(DEFAULT_PTIX_TOTAL.intValue())))
            .andExpect(jsonPath("$.[*].statut").value(hasItem(DEFAULT_STATUT.toString())));
    }
    
    @Test
    public void getLigneDeCommande() throws Exception {
        // Initialize the database
        ligneDeCommandeRepository.save(ligneDeCommande);

        // Get the ligneDeCommande
        restLigneDeCommandeMockMvc.perform(get("/api/ligne-de-commandes/{id}", ligneDeCommande.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ligneDeCommande.getId()))
            .andExpect(jsonPath("$.quantite").value(DEFAULT_QUANTITE))
            .andExpect(jsonPath("$.ptixTotal").value(DEFAULT_PTIX_TOTAL.intValue()))
            .andExpect(jsonPath("$.statut").value(DEFAULT_STATUT.toString()));
    }

    @Test
    public void getNonExistingLigneDeCommande() throws Exception {
        // Get the ligneDeCommande
        restLigneDeCommandeMockMvc.perform(get("/api/ligne-de-commandes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateLigneDeCommande() throws Exception {
        // Initialize the database
        ligneDeCommandeService.save(ligneDeCommande);

        int databaseSizeBeforeUpdate = ligneDeCommandeRepository.findAll().size();

        // Update the ligneDeCommande
        LigneDeCommande updatedLigneDeCommande = ligneDeCommandeRepository.findById(ligneDeCommande.getId()).get();
        updatedLigneDeCommande
            .quantite(UPDATED_QUANTITE)
            .ptixTotal(UPDATED_PTIX_TOTAL)
            .statut(UPDATED_STATUT);

        restLigneDeCommandeMockMvc.perform(put("/api/ligne-de-commandes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedLigneDeCommande)))
            .andExpect(status().isOk());

        // Validate the LigneDeCommande in the database
        List<LigneDeCommande> ligneDeCommandeList = ligneDeCommandeRepository.findAll();
        assertThat(ligneDeCommandeList).hasSize(databaseSizeBeforeUpdate);
        LigneDeCommande testLigneDeCommande = ligneDeCommandeList.get(ligneDeCommandeList.size() - 1);
        assertThat(testLigneDeCommande.getQuantite()).isEqualTo(UPDATED_QUANTITE);
        assertThat(testLigneDeCommande.getPtixTotal()).isEqualTo(UPDATED_PTIX_TOTAL);
        assertThat(testLigneDeCommande.getStatut()).isEqualTo(UPDATED_STATUT);
    }

    @Test
    public void updateNonExistingLigneDeCommande() throws Exception {
        int databaseSizeBeforeUpdate = ligneDeCommandeRepository.findAll().size();

        // Create the LigneDeCommande

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLigneDeCommandeMockMvc.perform(put("/api/ligne-de-commandes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ligneDeCommande)))
            .andExpect(status().isBadRequest());

        // Validate the LigneDeCommande in the database
        List<LigneDeCommande> ligneDeCommandeList = ligneDeCommandeRepository.findAll();
        assertThat(ligneDeCommandeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteLigneDeCommande() throws Exception {
        // Initialize the database
        ligneDeCommandeService.save(ligneDeCommande);

        int databaseSizeBeforeDelete = ligneDeCommandeRepository.findAll().size();

        // Delete the ligneDeCommande
        restLigneDeCommandeMockMvc.perform(delete("/api/ligne-de-commandes/{id}", ligneDeCommande.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<LigneDeCommande> ligneDeCommandeList = ligneDeCommandeRepository.findAll();
        assertThat(ligneDeCommandeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LigneDeCommande.class);
        LigneDeCommande ligneDeCommande1 = new LigneDeCommande();
        ligneDeCommande1.setId("id1");
        LigneDeCommande ligneDeCommande2 = new LigneDeCommande();
        ligneDeCommande2.setId(ligneDeCommande1.getId());
        assertThat(ligneDeCommande1).isEqualTo(ligneDeCommande2);
        ligneDeCommande2.setId("id2");
        assertThat(ligneDeCommande1).isNotEqualTo(ligneDeCommande2);
        ligneDeCommande1.setId(null);
        assertThat(ligneDeCommande1).isNotEqualTo(ligneDeCommande2);
    }
}
