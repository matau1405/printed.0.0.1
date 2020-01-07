package fr.inti.printed.service;

import fr.inti.printed.domain.Facture;
import fr.inti.printed.repository.FactureRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Facture}.
 */
@Service
public class FactureService {

    private final Logger log = LoggerFactory.getLogger(FactureService.class);

    private final FactureRepository factureRepository;

    public FactureService(FactureRepository factureRepository) {
        this.factureRepository = factureRepository;
    }

    /**
     * Save a facture.
     *
     * @param facture the entity to save.
     * @return the persisted entity.
     */
    public Facture save(Facture facture) {
        log.debug("Request to save Facture : {}", facture);
        return factureRepository.save(facture);
    }

    /**
     * Get all the factures.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    public Page<Facture> findAll(Pageable pageable) {
        log.debug("Request to get all Factures");
        return factureRepository.findAll(pageable);
    }


    /**
     * Get one facture by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    public Optional<Facture> findOne(String id) {
        log.debug("Request to get Facture : {}", id);
        return factureRepository.findById(id);
    }

    /**
     * Delete the facture by id.
     *
     * @param id the id of the entity.
     */
    public void delete(String id) {
        log.debug("Request to delete Facture : {}", id);
        factureRepository.deleteById(id);
    }
}
