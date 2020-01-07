package fr.inti.printed.web.rest;

import fr.inti.printed.domain.LigneDeCommande;
import fr.inti.printed.service.LigneDeCommandeService;
import fr.inti.printed.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link fr.inti.printed.domain.LigneDeCommande}.
 */
@RestController
@RequestMapping("/api")
public class LigneDeCommandeResource {

    private final Logger log = LoggerFactory.getLogger(LigneDeCommandeResource.class);

    private static final String ENTITY_NAME = "ligneDeCommande";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LigneDeCommandeService ligneDeCommandeService;

    public LigneDeCommandeResource(LigneDeCommandeService ligneDeCommandeService) {
        this.ligneDeCommandeService = ligneDeCommandeService;
    }

    /**
     * {@code POST  /ligne-de-commandes} : Create a new ligneDeCommande.
     *
     * @param ligneDeCommande the ligneDeCommande to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ligneDeCommande, or with status {@code 400 (Bad Request)} if the ligneDeCommande has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ligne-de-commandes")
    public ResponseEntity<LigneDeCommande> createLigneDeCommande(@Valid @RequestBody LigneDeCommande ligneDeCommande) throws URISyntaxException {
        log.debug("REST request to save LigneDeCommande : {}", ligneDeCommande);
        if (ligneDeCommande.getId() != null) {
            throw new BadRequestAlertException("A new ligneDeCommande cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LigneDeCommande result = ligneDeCommandeService.save(ligneDeCommande);
        return ResponseEntity.created(new URI("/api/ligne-de-commandes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ligne-de-commandes} : Updates an existing ligneDeCommande.
     *
     * @param ligneDeCommande the ligneDeCommande to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ligneDeCommande,
     * or with status {@code 400 (Bad Request)} if the ligneDeCommande is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ligneDeCommande couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ligne-de-commandes")
    public ResponseEntity<LigneDeCommande> updateLigneDeCommande(@Valid @RequestBody LigneDeCommande ligneDeCommande) throws URISyntaxException {
        log.debug("REST request to update LigneDeCommande : {}", ligneDeCommande);
        if (ligneDeCommande.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LigneDeCommande result = ligneDeCommandeService.save(ligneDeCommande);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, ligneDeCommande.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ligne-de-commandes} : get all the ligneDeCommandes.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ligneDeCommandes in body.
     */
    @GetMapping("/ligne-de-commandes")
    public ResponseEntity<List<LigneDeCommande>> getAllLigneDeCommandes(Pageable pageable) {
        log.debug("REST request to get a page of LigneDeCommandes");
        Page<LigneDeCommande> page = ligneDeCommandeService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /ligne-de-commandes/:id} : get the "id" ligneDeCommande.
     *
     * @param id the id of the ligneDeCommande to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ligneDeCommande, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ligne-de-commandes/{id}")
    public ResponseEntity<LigneDeCommande> getLigneDeCommande(@PathVariable String id) {
        log.debug("REST request to get LigneDeCommande : {}", id);
        Optional<LigneDeCommande> ligneDeCommande = ligneDeCommandeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(ligneDeCommande);
    }

    /**
     * {@code DELETE  /ligne-de-commandes/:id} : delete the "id" ligneDeCommande.
     *
     * @param id the id of the ligneDeCommande to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ligne-de-commandes/{id}")
    public ResponseEntity<Void> deleteLigneDeCommande(@PathVariable String id) {
        log.debug("REST request to delete LigneDeCommande : {}", id);
        ligneDeCommandeService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }
}
