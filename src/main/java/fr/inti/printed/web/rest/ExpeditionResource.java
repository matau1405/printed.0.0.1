package fr.inti.printed.web.rest;

import fr.inti.printed.domain.Expedition;
import fr.inti.printed.service.ExpeditionService;
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
 * REST controller for managing {@link fr.inti.printed.domain.Expedition}.
 */
@RestController
@RequestMapping("/api")
public class ExpeditionResource {

    private final Logger log = LoggerFactory.getLogger(ExpeditionResource.class);

    private static final String ENTITY_NAME = "expedition";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ExpeditionService expeditionService;

    public ExpeditionResource(ExpeditionService expeditionService) {
        this.expeditionService = expeditionService;
    }

    /**
     * {@code POST  /expeditions} : Create a new expedition.
     *
     * @param expedition the expedition to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new expedition, or with status {@code 400 (Bad Request)} if the expedition has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/expeditions")
    public ResponseEntity<Expedition> createExpedition(@Valid @RequestBody Expedition expedition) throws URISyntaxException {
        log.debug("REST request to save Expedition : {}", expedition);
        if (expedition.getId() != null) {
            throw new BadRequestAlertException("A new expedition cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Expedition result = expeditionService.save(expedition);
        return ResponseEntity.created(new URI("/api/expeditions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /expeditions} : Updates an existing expedition.
     *
     * @param expedition the expedition to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated expedition,
     * or with status {@code 400 (Bad Request)} if the expedition is not valid,
     * or with status {@code 500 (Internal Server Error)} if the expedition couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/expeditions")
    public ResponseEntity<Expedition> updateExpedition(@Valid @RequestBody Expedition expedition) throws URISyntaxException {
        log.debug("REST request to update Expedition : {}", expedition);
        if (expedition.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Expedition result = expeditionService.save(expedition);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, expedition.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /expeditions} : get all the expeditions.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of expeditions in body.
     */
    @GetMapping("/expeditions")
    public ResponseEntity<List<Expedition>> getAllExpeditions(Pageable pageable) {
        log.debug("REST request to get a page of Expeditions");
        Page<Expedition> page = expeditionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /expeditions/:id} : get the "id" expedition.
     *
     * @param id the id of the expedition to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the expedition, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/expeditions/{id}")
    public ResponseEntity<Expedition> getExpedition(@PathVariable String id) {
        log.debug("REST request to get Expedition : {}", id);
        Optional<Expedition> expedition = expeditionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(expedition);
    }

    /**
     * {@code DELETE  /expeditions/:id} : delete the "id" expedition.
     *
     * @param id the id of the expedition to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/expeditions/{id}")
    public ResponseEntity<Void> deleteExpedition(@PathVariable String id) {
        log.debug("REST request to delete Expedition : {}", id);
        expeditionService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }
}
